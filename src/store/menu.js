import Api from '@/api/Axios'

const state = {
  headerMenu: [],
  footerMenu: [],
  mobileMenu: [],
  languages: [],
  currentLang: localStorage.getItem('currentLang') || 'ru', // By default
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
  setCurrentLang(state, lang) {
    localStorage.setItem('currentLang', lang);
    state.currentLang = lang;
  },
  setLanguages(state, data) {
    const languagesArray = data.languages ? Object.values(data.languages) : [];
    state.languages = languagesArray;
    state.currentLang = data.current_lang || 'ru';
  },
};
const actions = {
  fetchHeaderMenu({commit}) {
    const lang = localStorage.getItem('currentLang') || 'ru';
    return Api.get('menu/get_menu_header', {
      params: { lang },
    })
    .then((result) => {
      commit('setItemsToHeaderMenu', result.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },
  fetchFooterMenu({commit}) {
    const lang = localStorage.getItem('currentLang') || 'ru';
    return Api.get('menu/get_menu_footer', {
      params: { lang },
    })
    .then((result) => {
      commit('setItemsToFooterMenu', result.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },
  fetchMobileMenu({commit}) {
    const lang = localStorage.getItem('currentLang') || 'ru';
    return Api.get('menu/get_menu_mobile', {
      params: { lang },
    })
    .then((result) => {
      commit('setItemsToMobileMenu', result.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },
  updateCurrentLang({ commit }, lang) {
    commit('setCurrentLang', lang);
  },
  fetchLanguages({ commit }) {
    const lang = localStorage.getItem('currentLang') || 'ru';
    return Api.get('menu/languages', {
      params: { lang },
    })
    .then((result) => {
      console.log('API response:', result.data); // Проверьте, что возвращается
      commit('setLanguages', result.data); // Передаем весь объект
    })
    .catch((error) => {
      console.error('Failed to fetch languages:', error);
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
  getCurrentLang(state) {
    return state.currentLang;
  },
};

export default {namespaced: true, state, mutations, actions, getters};