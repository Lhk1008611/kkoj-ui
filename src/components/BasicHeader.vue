<template>
  <a-row class="basic-header" align="center" :wrap="false">
    <a-col flex="auto">
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
        <a-menu-item v-for="item in visibleRoutes" :key="item.path"
          >{{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        {{ store.state.user?.loginUserInfo?.userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

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

const visibleRoutes = routes.filter((item) => {
  return !item.meta?.hiddenInMenu; //根据路由的meta属性判断是否隐藏该菜单
  // todo 根据用户的权限判断是否隐藏菜单
});

//用于获取store中的全局状态数据
const store = useStore();
</script>
<style scoped>
.basic-header {
  border-bottom: 1px solid #e8e8e8;
}

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
