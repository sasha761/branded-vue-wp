import Api from '@/api/Axios'

const state = {
  homeData: [],
};
const mutations = {
  setHomeData(state, data) {
    state.homeData = data
  },
};
const actions = {
  fetchHomeData({commit}) {
    const lang = localStorage.getItem('currentLang') || 'ru';

    return Api.get('home/get_home_info', {
      params: { lang },
    })
    .then((result) => {
      commit('setHomeData', result.data);
      console.log('setHomeData: ', result.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },
};
const getters = {
  getHomeData(state) {
    return state.homeData;
  }
};

export default {namespaced: true, state, mutations, actions, getters};