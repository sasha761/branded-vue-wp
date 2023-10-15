const state = {
  products: []
};

const mutations = {
  setProductToCart(state, product) {
    state.products = [...state.products, product];
  }
};

const actions = {};

const getters = {
  getCartProducts(state) {
    return state.products;
  }
};

export default {namespaced: true, state, mutations, actions, getters};