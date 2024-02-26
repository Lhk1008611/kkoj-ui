import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ManagerView from "@/views/ManagerView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "题目列表",
    component: HomeView,
  },
  {
    path: "/about",
    name: "在线做题",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/manager",
    name: "后台管理",
    component: ManagerView,
    meta: {
      access: "adminAccess",
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
];
