import api from "../../api/github";

const state = {
  token: null
};

const getters = {
  isLoggedIn: (state) => !!state.token
};

const actions = {
  login: () => {
    api.login();
  },
  finalizeLogin: (abc, params) => {
    console.log(abc, params);
  },
  logout: ({ commit }) => {
    commit("setToken", null);
  }
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
