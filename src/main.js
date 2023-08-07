import './assets/main.css'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'


const routes = [
  { path: '/product-category/:id', component: () => import('./templates/pages/P-Shop.vue') },
  { path: '/product/:id', component: () => import('./templates/pages/P-Product.vue') }
]
const router = new VueRouter({
  routes,
  mode: 'history' 
})

Vue.config.productionTip = false
Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
