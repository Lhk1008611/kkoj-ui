<template>
  <div
    id="code-editor"
    ref="codeEditor"
    style="min-height: 500px; height: 70vh"
  ></div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { defineProps, onMounted, ref, toRaw, watch, withDefaults } from "vue";

/**
 * 提供属性接口，交给父组件
 */
interface Props {
  value: string;
  language?: string;
  handleChange: (v: string) => void;
}

/**
 * 定义属性默认值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const value = ref(`function hello() {
	alert('Hello world!');
}`);
const codeEditor = ref();
const myEditor = ref();

/**
 * 监听语言变化
 */
watch(
  () => props.language,
  () => {
    if (myEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(myEditor.value).getModel(),
        props.language
      );
    }
  }
);

onMounted(() => {
  if (!codeEditor.value) {
    return;
  }
  myEditor.value = monaco.editor.create(codeEditor.value, {
    value: props.value,
    language: "java",
    automaticLayout: true,
    readOnly: false,
    minimap: {
      enabled: true,
    },
    theme: "vs-dark",
  });
  //监听编辑器内容变化
  myEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(myEditor.value).getValue());
  });
});
</script>
