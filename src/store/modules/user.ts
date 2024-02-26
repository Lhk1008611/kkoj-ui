import { Commit, StoreOptions } from "vuex";
import PERMISSION_ENUM from "@/access/permissionEnum";

export default {
  namespaced: true,
  state: () => ({
    loginUserInfo: {
      userName: "未登录",
      userRole: PERMISSION_ENUM.NOT_LOGIN,
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
