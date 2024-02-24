<template>
  <a-layout style="height: 400px">
    <a-layout-header>
      <BasicHeader />
    </a-layout-header>
    <a-layout-content>
      <router-view />
    </a-layout-content>
    <a-layout-footer>
      <a href="https://lhk1008611.github.io/" target="_blank">
        作者: HankLay
      </a>
    </a-layout-footer>
  </a-layout>
</template>

<style></style>
<script>
import BasicHeader from "@/components/BasicHeader";

export default {
  components: { BasicHeader },
};
</script>
