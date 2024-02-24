<template>
  <div class="basic-header">
    <a-menu
      mode="horizontal"
      :selected-keys="selectedKeys"
      @menu-item-click="clickMenuItem"
    >
      <a-menu-item
        key="0"
        :style="{ padding: 0, marginRight: '38px' }"
        disabled
      >
        <div class="title-bar">
          <img class="title-logo" src="../assets/logo.png" />
          <div class="title">kkoj</div>
        </div>
      </a-menu-item>
      <a-menu-item v-for="item in routes" :key="item.path"
        >{{ item.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";

//默认选中的菜单
const selectedKeys = ref(["/"]);

//点击菜单项进行路由跳转
const router = useRouter();
const clickMenuItem = (key: string) => {
  router.push({ path: key });
};

//路由跳转后更新菜单选中状态
router.afterEach((to) => {
  selectedKeys.value = [to.path];
});
</script>
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title-logo {
  height: 50px;
  cursor: pointer;
}

.title {
  margin-left: 2px;
  color: #42b983;
}
</style>
