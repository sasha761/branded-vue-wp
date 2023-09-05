import Vue from 'vue';
import Vuex from 'vuex';

import Commons from './commons';
import Catalog from './catalog';

Vue.use(Vuex)

export default new Vuex.Store({
  ...Commons,
  modules: {
    Catalog: Catalog,
  },
});