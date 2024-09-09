import VueRouter from 'vue-router'

const routes = [
  { 
    path: '/', 
    name: 'home-page',
    component: () => import('../templates/pages/P-Home.vue')  
  },
  { 
    path: '/product-category/:categorySlug/:subcategorySlug?', 
    name: 'product-category',
    component: () => import('../templates/pages/P-Shop.vue') 
  },
  { 
    path: '/brand/:brandName', 
    name: 'brand', 
    component: () => import('../templates/pages/P-Shop.vue') 
  },
  { 
    path: '/product/:productName', 
    props: true, 
    name: 'product', 
    component: () => import('../templates/pages/P-Product.vue') 
  },
  { 
    path: '/cart', 
    name: 'cart', 
    component: () => import('../templates/pages/P-Cart.vue') 
  },
  { 
    path: '/checkout-2', 
    name: 'checkout', 
    component: () => import('../templates/pages/P-Checkout.vue') 
  },
  { 
    path: '/checkout-2/order-received/:numbers/', 
    name: 'order-received', 
    component: () => import('../templates/pages/P-Order-received.vue') 
  },
  { 
    path: '/:catchAll(.*)', 
    name: 'page', 
    component: () => import('../templates/pages/P-Page.vue') 
  },
]

export const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})