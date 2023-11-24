import './assets/scss/main.scss'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {store} from './store';
import {router} from './routes/router.js';


Vue.config.productionTip = false
Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
