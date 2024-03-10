<template>
  <div class="user-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-header>
        <a-space>
          <img class="logo" src="../assets/logo.png" />
          <div class="title">kkoj</div>
        </a-space>
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://lhk1008611.github.io/" target="_blank">
          作者: HankLay
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
.user-layout {
  text-align: center;
  background: #efefef;
}

.logo {
  height: 50px;
  cursor: pointer;
}
.title {
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
}

.user-layout :deep(.arco-layout-header) {
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid ghostwhite;
}

.user-layout :deep(.arco-layout-content) {
  padding: 0px 20px;
}

.user-layout :deep(.arco-layout-footer) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: medium;
  font-stretch: condensed;
  padding: 16px;
  text-align: center;
  position: sticky;
  border-top: 1px solid ghostwhite;
}
</style>
<script></script>
