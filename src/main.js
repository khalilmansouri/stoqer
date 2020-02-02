import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store'
Vue.config.productionTip = false;
import { ipcRenderer } from "electron";
// //window.addEventListener('keypress', (e) => (console.log(e)))
// ipcRenderer.on("asynchronous-reply", (event, arg) => {
//   console.log(arg);
// });
// ipcRenderer.send("asynchronous-message", "ping");

// ipcRenderer.on("ADD_PRODUCT_REPLY", (event, arg) => {
//     console.log(arg); // prints "pong"
// });

//ipcRenderer.send("ADD_PRODUCT", { name, barCode, bayingPrice, sellingPrice, quantity });

Vue.prototype.$ipcRenderer = ipcRenderer;


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
