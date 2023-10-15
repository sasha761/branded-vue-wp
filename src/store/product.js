import Api from '@/api/Axios'

const state = {
  productData: []
};

const mutations = {
  setSingleProduct(state, product) {
    state.productData = product;
  }
};

const actions = {
  fetchSingleProduct({commit}, url) {
    console.log(url);
    return Api.post('product/get_single_product', {
      url: url
    })
    .then((result) => {
      commit('setSingleProduct', result.data)
      console.log(result)
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  },
};

const getters = {
  getSingleProduct(state) {
    return state.productData;
  }
};

export default {namespaced: true, state, mutations, actions, getters};