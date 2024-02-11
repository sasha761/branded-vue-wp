import './assets/scss/main.scss'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {store} from './store';
import {router} from './routes/router.js';

import Emitter from 'tiny-emitter';
window.emitter = new Emitter();


Vue.config.productionTip = false
Vue.use(VueRouter);
// Vue.use(Emitter);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
