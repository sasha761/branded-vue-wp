import Api from '@/api/Axios'

const state = {
  products: []
};
const mutations = {
  setProductsList(state, products) {
    state.products = products;
  }
};
const actions = {
  fetchProducts({commit}, url) {
    return Api.post('archive/get_products', {
      url: url
    })
    .then((result) => {
      commit('setProductsList', result.data.products)
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  }
};
const getters = {
  products(state) {
    return state.products;
  }
};

export default {namespaced: true, state, mutations, actions, getters};