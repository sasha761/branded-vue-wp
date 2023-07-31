import './assets/main.css'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

const routes = [
  { path: '/foo', component: null },
  { path: '/bar', component: null }
]
const router = new VueRouter({
  routes
})

Vue.config.productionTip = false
Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
