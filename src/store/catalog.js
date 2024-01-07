import Api from '@/api/Axios'

const state = {
  products: [],
  productsCount: 0,
};
const mutations = {
  setProductsList(state, products) {
    state.products = products;
  },
  setMoreProductsList(state, moreProducts) {
    state.products = [...state.products, ...moreProducts];
  },
  setProductsCount(state, productsCount) {
    state.productsCount = productsCount;
  },
};
const actions = {
  fetchProducts({commit}, {url, page, offset, slug}) {
    return Api.post('archive/get_products', {
      url: url,
      page: page,
      offset: offset,
      slug: slug,
    })
    .then((result) => {
      if(result?.data?.status !== 'nomore') {
        commit('setProductsCount', result.data.products_count);
        commit('setProductsList', result.data.products);
      }
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  },
};
const getters = {
  products(state) {
    return state.products;
  },
  productsCount(state) {
    return state.productsCount;
  }
};

export default {namespaced: true, state, mutations, actions, getters};