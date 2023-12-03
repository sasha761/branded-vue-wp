import Vue from 'vue';
import Vuex from 'vuex';

import commons from './commons';
import catalog from './catalog';
import cart from './cart';

Vue.use(Vuex)

export const store = new Vuex.Store({
  ...commons,
  modules: {
    catalog,
    cart,
  },
});