
import { SET_SCANNED_CODE, CHECK_OUT } from './actions.type';
import { COMMIT_SET_SCANNED_CODE } from './mutation.type';
import promiseIpc from 'electron-promise-ipc';

const state = {
    scannedCode: '',
    scannedProduct: null,
    bag: [],
};

const getters = {
    getScannedCode: (state) => {
        return state.scannedCode;
    },
    getBag: (state) => {
        return state.bag;
    },
    getTotal: (state) => {
        let total
        total = state.bag.reduce((memo, val) => memo += val.sellingPrice, 0)
        return total.toFixed(2)
    }
};

const addProduct = (bag, product) => {
    for (let i = 0; i < bag.length; i++) {
        if (bag[i].barCode === product.barCode) {
            bag[i].quantity++;
            bag[i].sellingPrice += product.sellingPrice;
            return;
        }
    }
    bag.push(product);
};

const actions = {
    async [SET_SCANNED_CODE](context, { barCode }) {
        context.commit(COMMIT_SET_SCANNED_CODE, { barCode })
        let product = await promiseIpc.send('FETCH_PRODUCT_BY_BAR_CODE', barCode);
        if (product) {
            product.quantity = 1;
            addProduct(context.state.bag, product)
        }
    },

    // checkout the products 
    async [CHECK_OUT](context) {
        return 0;
    }

};



const mutations = {
    [COMMIT_SET_SCANNED_CODE](state, { barCode }) {
        state.scannedCode = barCode;
    }
};


export default {
    state,
    getters,
    actions,
    mutations,
};
