import Vue from 'vue';
import Vuex from 'vuex';

import commons from './commons';
import Catalog from './catalog';

Vue.use(Vuex)

export const store = new Vuex.Store({
  ...commons,
  modules: {
    Catalog,
  },
});