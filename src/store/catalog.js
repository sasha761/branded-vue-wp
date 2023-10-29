import Api from '@/api/Axios'

const state = {
  products: [],
  // resultProducts: [],
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
  // setResultProducts(state, resultProducts) {
  //   state.resultProducts = [...state.resultProducts, ...resultProducts];
  // },
  // changeResultProducts(state, resultProducts) {
  //   state.resultProducts = resultProducts;
  // },
  // resetResultProducts(state) {
  //   state.resultProducts = state.products;
  // },

  // sortProductsByUpPrice(state) {
  //   state.resultProducts.sort((a, b) => a?.price - b?.price);
  // },
  // sortProductsByDownPrice(state) {
  //   state.resultProducts.sort((a, b) => b?.price - a?.price)
  // },

  // filterProductsByBrand(state, brandName) {
  //   state.resultProducts = state.resultProducts.filter((item) => {
  //     return item?.post_attr_brand?.toLowerCase().includes(brandName.toLowerCase())
  //   })
  // },
  // filterProductsBySize(state, productSize) {
  //   state.resultProducts = state.resultProducts.filter((item) => {
  //     return item?.post_attr_size?.toLowerCase().split(', ').includes(productSize.toLowerCase())
  //   })
  // },
};
const actions = {
  fetchProducts({commit}, {url, page, offset, slug}) {
    console.log(url, page, offset, slug);
    return Api.post('archive/get_products', {
      url: url,
      page: page,
      offset: offset,
      slug: slug,
    })
    .then((result) => {
      if(result?.data?.status !== 'nomore') {
        commit('setProductsCount', result.data.products_count);
        commit('setProductsList', result.data.products)
        // commit('changeResultProducts', result.data.products)
      }
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  },

  // fetchMoreProducts({commit}, {url, page, offset, slug}) {
  //   return Api.post('archive/load_more_products', {
  //     url: url,
  //     page: page,
  //     offset: offset,
  //     slug: slug,
  //   })
  //   .then((result) => {
  //     if(result?.data?.status !== 'nomore') {
  //       commit('setMoreProductsList', result?.data?.products)
  //       commit('setResultProducts', result?.data?.products)
  //     } 
  //     return result?.data;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // },
};
const getters = {
  products(state) {
    return state.products;
  },
  productsCount(state) {
    return state.productsCount;
  },
  resultProducts(state) {
    return state.resultProducts
  },
};

export default {namespaced: true, state, mutations, actions, getters};