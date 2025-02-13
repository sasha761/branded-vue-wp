import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // Главная страница (универсальная)
  {
    path: '/:lang?',
    name: 'home-page',
    component: () => import('../templates/pages/P-Home.vue'),
    props: (route) => ({
      lang: route.params.lang, // Язык по умолчанию
    }),
  },

  // Страница продукта
  {
    path: '/:lang?/product/:productName',
    name: 'product',
    component: () => import('../templates/pages/P-Product.vue'),
    props: (route) => ({
      lang: route.params.lang,
      productName: route.params.productName,
      productData: route.params.productData,
    }),
  },

  // Категория продукта
  {
    path: '/:lang?/product-category/:categorySlug/:subcategorySlug?',
    name: 'product-category',
    component: () => import('../templates/pages/P-Shop.vue'),
    props: true,
  },

  // Бренд
  {
    path: '/:lang?/brand/:brandName',
    name: 'brand',
    component: () => import('../templates/pages/P-Shop.vue'),
  },

  // Общие страницы
  {
    path: '/:lang?/cart',
    name: 'cart',
    component: () => import('../templates/pages/P-Cart.vue'),
  },
  {
    path: '/:lang?/checkout-2',
    name: 'checkout',
    component: () => import('../templates/pages/P-Checkout.vue'),
  },
  {
    path: '/:lang?/checkout-2/order-received/:numbers',
    name: 'order-received',
    component: () => import('../templates/pages/P-Order-received.vue'),
    props: true,
  },

  {
    path: '/:lang?/search',
    name: 'SearchResults',
    component: () => import('../templates/pages/P-Shop.vue'),
    props: route => ({ lang: route.params.lang })
  },

  // Маршрут для 404 страниц
  {
    path: '/:catchAll(.*)',
    name: 'page',
    component: () => import('../templates/pages/P-Page.vue'),
  },
];

// Создание маршрутизатора для Vue 3
export const router = createRouter({
  history: createWebHistory(), // Заменяет mode: 'history'
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }; // В Vue 3 используем left вместо x
  },
});
