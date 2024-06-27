import './assets/scss/main.scss'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import VueRouter from 'vue-router'
import {store} from './store';
import {router} from './routes/router.js';
import emitter from './plugins/emitter.js';
// import Emitter from 'tiny-emitter';
// import devtools from '@vue/devtools'

// window.emitter = new Emitter();

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(emitter);
Vue.use(Vuelidate);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
