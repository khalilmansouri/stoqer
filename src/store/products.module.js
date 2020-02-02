import { ADD_PRODUCT, FETCH_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from './actions.type';
import { COMMIT_FETCH_PRODUCT } from './mutation.type';
import promiseIpc from 'electron-promise-ipc';


const state = {
    products: [],
};

const getters = {
    getProducts: (state) => {
        return state.products;
    }
};

const actions = {

    // ADD PRODUCT
    async [ADD_PRODUCT](context, { name, barCode, bayingPrice, sellingPrice, quantity }) {
        await promiseIpc.send("ADD_PRODUCT", { name, barCode, bayingPrice, sellingPrice, quantity });
    },

    // UPDATE PRODUCT
    async [UPDATE_PRODUCT](context, { name, barCode, bayingPrice, sellingPrice, quantity }) {
        await promiseIpc.send("UPDATE_PRODUCT", { name, barCode, bayingPrice, sellingPrice, quantity });
    },

    // DELETE PRODUCT
    async [DELETE_PRODUCT](context, barCode) {
        await promiseIpc.send("DELETE_PRODUCT", barCode);
    },

    // FETCH PRODUCTS
    async [FETCH_PRODUCT](context) {
        let products = await promiseIpc.send('FETCH_PRODUCT');
        context.commit(COMMIT_FETCH_PRODUCT, products);
    },
};

const mutations = {
    [COMMIT_FETCH_PRODUCT](state, products) {
        state.products = products
    }
};


export default {
    state,
    getters,
    actions,
    mutations,
};
