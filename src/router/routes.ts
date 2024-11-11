import { RouteRecordRaw } from "vue-router";
import NoAuthView from "@/views/NoAuthView.vue";
import ManagerQuestionView from "@/views/question/ManagerQuestionView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import QuestionView from "@/views/question/QuestionsView.vue";
import PracticeQuestionView from "@/views/question/PracticeQuestionView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";

import PERMISSION_ENUM from "@/access/permissionEnum";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import UserLayout from "@/layouts/UserLayout.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "题目提交记录",
    component: QuestionSubmitView,
  },
  {
    path: "/questions",
    name: "题目列表",
    component: QuestionView,
  },
  {
    path: "/practice/question/:id",
    name: "在线做题",
    component: PracticeQuestionView,
    props: true,
    meta: {
      access: PERMISSION_ENUM.USER,
      hiddenInMenu: true,
    },
  },
  {
    path: "/add/question/",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: PERMISSION_ENUM.USER,
    },
  },
  {
    path: "/manager/question/",
    name: "题目管理",
    component: ManagerQuestionView,
    meta: {
      access: PERMISSION_ENUM.USER,
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
