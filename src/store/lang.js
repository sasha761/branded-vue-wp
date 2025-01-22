import Api from '@/api/Axios'

const state = {
  languages: [],
  currentLang: localStorage.getItem('currentLang') || 'ru', // By default
  apiUrl: '',
};

console.log('state: ', state.currentLang)
const mutations = {
  setLanguages(state, data) {
    const languagesArray = data.languages ? Object.values(data.languages) : [];
    state.languages = languagesArray;
    state.currentLang = data.current_lang || 'ru';
  },
  setCurrentLang(state, lang) {
    console.log('setCurrentLang: ', lang)
    localStorage.setItem('currentLang', lang);
    state.currentLang = lang;
  },
  setApiUrl(state, url) {
    
    state.apiUrl = url; // Сохраняем URL из API
  },
};
const actions = {
  updateCurrentLang({ commit }, lang) {
    console.log('updateCurrentLang: ', lang)
    commit('setCurrentLang', lang);
  },
  updateApiUrl({ commit }, lang) {
    commit('setApiUrl', lang);
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
  getLanguages(state) {
    return state.languages;
  },
  getCurrentLang(state) {
    console.log('getCurrentLang: ', state.currentLang)
    return state.currentLang;
  },
  getApiUrl(state) {
    return state.getApiUrl;
  },
};

export default {namespaced: true, state, mutations, actions, getters};