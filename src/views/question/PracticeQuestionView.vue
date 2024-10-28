<template>
  <div class="practice-question-view">
    <!--    <h2 v-if="question" :style="{ textAlign: 'center' }">-->
    <!--      {{ question.title }}-->
    <!--    </h2>-->
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="content">
          <a-tab-pane key="content" title="题目描述">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  <a-tag>{{ question.judgeConfig.timeLimit }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  <a-tag>{{ question.judgeConfig.memoryLimit }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  <a-tag>{{ question.judgeConfig.stackLimit }}</a-tag>
                </a-descriptions-item>
              </a-descriptions>
              <MyByteMdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                  >
                    {{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="题目探讨" disabled>
            题目探讨
          </a-tab-pane>
          <a-tab-pane key="answer" title="题目答案" disabled>
            题目答案
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '220px' }"
              placeholder="请选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <MyMonacoEditor :language="form.language" :handle-change="codeChange" />
        <a-divider />
        <a-button type="primary" style="min-width: 200px" @click="codeSubmit">
          提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, onMounted } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import MyMonacoEditor from "@/components/MyMonacoEditor.vue";
import MyByteMdViewer from "@/components/MyByteMdViewer.vue";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: "",
});

const question = ref<QuestionVO>();
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 200) {
    question.value = res.data;
    console.log(question.value);
  } else {
    message.error("题目获取失败" + res.message);
  }
};

onMounted(() => {
  loadData();
});

const form = ref<QuestionSubmitAddRequest>({
  code: "",
  language: "java",
});

const codeChange = (code: string) => {
  form.value.code = code;
};

const codeSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 200) {
    message.success("提交成功");
  } else {
    message.error("提交失败" + res.message);
  }
};
</script>

<style>
.practice-question-view {
  max-width: 1400px;
  margin: 0 auto;
}
.practice-question-view .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
