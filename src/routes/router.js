import VueRouter from 'vue-router'

const routes = [
  { 
    path: '/product-category/:categorySlug/:subcategorySlug?', 
    name: 'product-category',
    component: () => import('../templates/pages/P-Shop.vue') 
  },
  { 
    path: '/product/:productName', 
    props: true, 
    name: 'product', 
    component: () => import('../templates/pages/P-Product.vue') 
  }
]

export const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})