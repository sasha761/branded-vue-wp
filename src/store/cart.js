import Api from '@/api/Axios'

const state = {
  products: [],
  cartUrl: '',
  checkoutUrl: ''
};

const mutations = {
  setProductToCart(state, product) {
    state.products = [...state.products, product];
  },
  setCartUrl(state, cartUrl) {
    let path = new URL(cartUrl).pathname;
    path = path.replace(/\//g, '');
    state.cartUrl = path;
  },
  setCheckoutUrl(state, checkoutUrl) {
    let path = new URL(checkoutUrl).pathname;
    path = path.replace(/\//g, '');
    state.checkoutUrl = path;
  }
};

const actions = {
  fetchCartUrl({commit}) {
    return Api.get('cart/get_cart_url')
      .then((result) => {
        commit('setCartUrl', result.data?.cart);
        commit('setCheckoutUrl', result.data?.checkout);
      })
      .catch((error) => {
        console.log(error);
      })
  }
};

const getters = {
  getCartProducts(state) {
    return state.products;
  },

  getCartUrl(state) {
    return state.cartUrl;
  },

  getCheckoutUrl(state) {
    return state.checkoutUrl;
  }
};

export default {namespaced: true, state, mutations, actions, getters};