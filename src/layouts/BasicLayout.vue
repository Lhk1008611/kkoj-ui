<template>
  <div class="basic-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-header>
        <BasicHeader />
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
.basic-layout :deep(.arco-layout-content) {
  padding: 0px 20px;
}

.basic-layout :deep(.arco-layout-footer) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: medium;
  font-stretch: condensed;
  padding: 16px;
  text-align: center;
  position: sticky;
  background: #efefef;
}
</style>
<script>
import BasicHeader from "@/components/BasicHeader";

export default {
  components: { BasicHeader },
};
</script>
