import VueRouter from 'vue-router'

const routes = [
  // Основная версия без префикса
  { 
    path: '/', 
    name: 'home-page',
    component: () => import('../templates/pages/P-Home.vue')
  },
  { 
    path: '/product/:productName', 
    props: true, 
    name: 'product', 
    component: () => import('../templates/pages/P-Product.vue')
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
  
  // Украинская версия с префиксом /uk
  { 
    path: '/uk', 
    name: 'home-page-uk',
    component: () => import('../templates/pages/P-Home.vue')
  },
  { 
    path: '/:lang/product/:productName', 
    props: true, 
    name: 'product-uk', 
    component: () => import('../templates/pages/P-Product.vue')
  },
  { 
    path: '/uk/product-category/:categorySlug/:subcategorySlug?', 
    name: 'product-category-uk',
    component: () => import('../templates/pages/P-Shop.vue')
  },
  { 
    path: '/uk/brand/:brandName', 
    name: 'brand-uk', 
    component: () => import('../templates/pages/P-Shop.vue')
  },

  // Общие страницы (например, корзина, оформление заказа)
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

  // Маршрут для 404 страниц
  { 
    path: '/:catchAll(.*)', 
    name: 'page', 
    component: () => import('../templates/pages/P-Page.vue')
  },
];

export const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
});
