import './assets/scss/main.scss'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import VueRouter from 'vue-router'
import {store} from './store';
import {router} from './routes/router.js';
import emitter from './plugins/emitter.js';
import LanguageRedirectPlugin from './plugins/language-redirect.js';

// window.emitter = new Emitter();


Vue.config.productionTip = false
Vue.use(emitter);
Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(LanguageRedirectPlugin, { app: { router }, store });



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

router.afterEach(() => {
  Vue.prototype.$popup.close(1, () => {})
});
