import { StoreOptions } from "vuex";
import PERMISSION_ENUM from "@/access/permissionEnum";
import { UserControllerService } from "../../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUserInfo: {
      userName: "未登录",
    },
  }),
  getters: {},
  actions: {
    //从远程获取登录用户的信息并更新到vuex
    async getUserInfo({ commit, state }) {
      const response = await UserControllerService.getLoginUserUsingGet();
      //已登录，则更新用户信息
      if (response.code === 200) {
        commit("updateUserInfo", response.data);
      } else {
        //未登录，则给用户信息添加上未登录的权限
        commit("updateUserInfo", {
          ...state.loginUserInfo,
          userRole: PERMISSION_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUserInfo(state, payload) {
      state.loginUserInfo = payload;
    },
  },
} as StoreOptions<any>;
