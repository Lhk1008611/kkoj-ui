<template>
  <Viewer :value="value" :plugins="plugins" style="height: 90vh" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Viewer } from "@bytemd/vue-next";
import { withDefaults, defineProps } from "vue";

/**
 * 提供属性接口，交给父组件
 */
interface Props {
  value: string;
}

/**
 * 定义属性默认值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});

const plugins = [gfm(), highlight()];
</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
