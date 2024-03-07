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
</script>
