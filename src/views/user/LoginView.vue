<template>
  <div id="user-login-view">
    <h3>用户登录</h3>
    <a-form
      :model="form"
      label-align="left"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import store from "@/store";

/**
 * 登录表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();

/**
 * 提交登录表单
 */
const handleSubmit = async () => {
  const response = await UserControllerService.userLoginUsingPost(form);
  if (response.code == 200) {
    message.success("登录成功");

    //更新全局的用户信息
    store.dispatch("user/getUserInfo");

    //跳转至首页
    router.push({
      path: "/",
      replace: true, //不可通过点击浏览器回退按钮返回至该页面
    });
  } else {
    message.error("登录失败");
  }
};
</script>

<style scoped>
#user-login-view {
  padding-top: 133px;
}

#user-login-view :deep(.arco-form) {
  max-width: 444px;
  margin: 0 auto;
}

#user-login-view :deep(.arco-form-item-content) {
  justify-content: flex-end;
}

#user-login-view :deep(.arco-btn) {
  width: 122px;
}
</style>
