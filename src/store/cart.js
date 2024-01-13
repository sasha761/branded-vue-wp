import Api from '@/api/Axios'

const state = {
  products: [],
  totalAmount: 0,
  cartUrl: '',
  checkoutUrl: ''
};

const mutations = {
  setProductToCart(state, product) {
    state.products = product;
    localStorage.setItem('cartProducts', JSON.stringify(product));
  },
  setTotalAmounth(state) {
    const productsArray = (state.products.length) ? state.products : JSON.parse(localStorage.getItem('cartProducts'));

    state.totalAmount = productsArray.reduce((accumulator, currentValue) => {
      return accumulator + (parseInt(currentValue.price) * currentValue.quantity);
    }, 0);

    console.log(state.totalAmount);
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
    return ((state.products.length) ? state.products : JSON.parse(localStorage.getItem('cartProducts'))) || [];
  },

  getTotalAmount(state) {
    return ((state.totalAmount) ? state.totalAmount : JSON.parse(localStorage.getItem('cartTotalAmount'))) || 0;
  },

  getCartUrl(state) {
    return state.cartUrl;
  },

  getCheckoutUrl(state) {
    return state.checkoutUrl;
  },
};

export default {namespaced: true, state, mutations, actions, getters};