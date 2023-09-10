import './assets/main.css'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {store} from './store';

const routes = [
  { 
    path: '/product-category/:categorySlug/:subcategorySlug?', 
    name: 'product-category',
    component: () => import('./templates/pages/P-Shop.vue') 
  },
  { 
    path: '/product/:productName', 
    props: true, 
    name: 'product', 
    component: () => import('./templates/pages/P-Product.vue') 
  }
]
const router = new VueRouter({
  routes,
  mode: 'history' 
})

Vue.config.productionTip = false
Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
