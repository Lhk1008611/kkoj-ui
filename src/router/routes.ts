import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ManagerView from "@/views/ManagerView.vue";
import ManagerQuestionView from "@/views/question/ManagerQuestionView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";

import PERMISSION_ENUM from "@/access/permissionEnum";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import UserLayout from "@/layouts/UserLayout.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "题目列表",
    component: HomeView,
  },
  {
    path: "/about",
    name: "在线做题",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/manager/question/",
    name: "题目管理",
    component: ManagerQuestionView,
    meta: {
      access: PERMISSION_ENUM.ADMIN,
    },
  },
  {
    path: "/add/question/",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: PERMISSION_ENUM.ADMIN,
    },
  },
  {
    path: "/update/question/",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: PERMISSION_ENUM.ADMIN,
      hiddenInMenu: true,
    },
  },
  {
    path: "/no-auth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hiddenInMenu: true,
    },
  },
  {
    path: "/user",
    name: "用户管理",
    component: UserLayout,
    meta: {
      hiddenInMenu: true,
    },
    children: [
      {
        path: "/user/login",
        name: "登录",
        component: LoginView,
      },
      {
        path: "/user/register",
        name: "注册",
        component: RegisterView,
      },
    ],
  },
];
