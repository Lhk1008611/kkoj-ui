<template>
  <div class="home">
    <MyMonacoEditor :value="value" :handle-change="handleChange" />

    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <MyByteMd :value="value" :handle-change="handleChange" />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import MyByteMd from "@/components/MyByteMd.vue";
import MyMonacoEditor from "@/components/MyMonacoEditor.vue";
import { ref } from "vue";

const value = ref("");
const handleChange = (v: string) => {
  value.value = v;
};
</script>
