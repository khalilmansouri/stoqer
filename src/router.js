import Vue from 'vue';
import Router from 'vue-router';
import Transaction from './views/Transaction.vue';
import Historic from './views/Historic.vue';
import Inventory from './views/Inventory.vue';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'transactionHome',
            component: Transaction,
        },
        {
            path: '/transaction',
            name: 'transaction',
            component: Transaction
        },
        {
            path: '/inventory',
            name: 'inventory',
            component: Inventory
        },
        {
            path: '/historic',
            name: 'historic',
            component: Historic
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            //component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
    ],
});
