import { Commit, StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUserInfo: {
      userName: "未登录",
    },
  }),
  getters: {},
  actions: {
    getUserInfo({ commit }, playload) {
      commit("updateUserInfo", playload);
    },
  },
  mutations: {
    updateUserInfo(state, payload) {
      state.loginUserInfo = payload;
    },
  },
} as StoreOptions<any>;
