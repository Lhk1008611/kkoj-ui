<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import PERMISSION_ENUM from "@/access/permissionEnum";
import { onMounted } from "vue";

/**
 * 全局初始化函数
 */
const doInit = () => {
  console.log("kkoj 系统欢迎你！");
};

onMounted(() => {
  doInit();
});

const store = useStore();
const router = useRouter();
router.beforeEach((to, from, next) => {
  if (
    to.meta.access === PERMISSION_ENUM.ADMIN &&
    store.state.user?.loginUserInfo?.userRole !== PERMISSION_ENUM.ADMIN
  ) {
    next("/no-auth");
  }
  next();
});
</script>
