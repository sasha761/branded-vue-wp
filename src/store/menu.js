import Api from '@/api/Axios'

const state = {
  headerMenu: [],
  footerMenu: [],
  mobileMenu: [],
  languages: []
};
const mutations = {
  setItemsToHeaderMenu(state, data) {
    state.headerMenu = data
  },
  setItemsToFooterMenu(state, data) {
    state.footerMenu = data
  },
  setItemsToMobileMenu(state, data) {
    state.mobileMenu = data
  },
  setLanguages(state, languages) {
    state.languages = languages
  }
};
const actions = {
  fetchHeaderMenu({commit}) {
    return Api.get('menu/get_menu_header')
    .then((result) => {
      commit('setItemsToHeaderMenu', result.data);
      console.log('HeaderMenu: ', result.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },
  fetchFooterMenu({commit}) {
    return Api.get('menu/get_menu_footer')
    .then((result) => {
      commit('setItemsToFooterMenu', result.data);
      console.log('FooterMenu: ', result.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },
  fetchMobileMenu({commit}) {
    return Api.get('menu/get_menu_mobile')
    .then((result) => {
      commit('setItemsToMobileMenu', result.data);
      console.log('MobileMenu: ', result.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },
  fetchLanguages({commit}, {url}) {
    return Api.get('menu/languages', {
      params: {
        url: url
      }
    })
    .then((result) => {
      commit('setLanguages', result.data);
      console.log('lang: ', result.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
};
const getters = {
  getHeaderMenu(state) {
    return state.headerMenu;
  },
  getFooterMenu(state) {
    return state.footerMenu;
  },
  getMobileMenu(state) {
    return state.mobileMenu;
  },
  getLanguages(state) {
    return state.languages;
  },
};

export default {namespaced: true, state, mutations, actions, getters};