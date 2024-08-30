<template>
  <div>
    <h2 :style="{ textAlign: 'center' }">创建题目</h2>
    <div class="add-question-view">
      <a-form :model="form" @submit="handleSubmit" label-align="right">
        <a-form-item field="title" label="题目标题">
          <a-input
            v-model="form.title"
            placeholder="请输入题目标题..."
            :style="{ width: '480px' }"
          />
        </a-form-item>
        <a-form-item field="tags" label="题目标签">
          <a-input-tag
            v-model="form.tags"
            :style="{ width: '480px' }"
            placeholder="请输入题目标签..."
            allow-clear
          />
        </a-form-item>
        <a-form-item field="content" label="题目内容">
          <MyByteMd
            :value="form.content"
            :handle-change="handleContentChange"
          />
        </a-form-item>

        <a-form-item field="answer" label="题目答案">
          <MyByteMd :value="form.answer" :handle-change="handleAnswerChange" />
        </a-form-item>

        <a-form-item
          label="判题配置"
          :content-flex="false"
          :merge-props="false"
        >
          <a-space direction="vertical" style="min-width: 500px">
            <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
              <a-input-number
                v-model="form.judgeConfig.memoryLimit"
                placeholder="请输入内存限制..."
                min="0"
              />
            </a-form-item>
            <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
              <a-input-number
                v-model="form.judgeConfig.stackLimit"
                placeholder="请输入堆栈限制..."
                min="0"
              />
            </a-form-item>
            <a-form-item field="judgeConfig.timeLimit" label="时间限制">
              <a-input-number
                v-model="form.judgeConfig.timeLimit"
                placeholder="请输入时间限制..."
                min="0"
              />
            </a-form-item>
          </a-space>
        </a-form-item>

        <a-form-item
          label="判题用例"
          :content-flex="false"
          :merge-props="false"
        >
          <a-form-item
            v-for="(judgeCaseItem, index) of form.judgeCase"
            :key="index"
            no-style
          >
            <a-space direction="vertical" style="min-width: 500px">
              <a-form-item
                :field="`judgeCase[${index}].input`"
                :label="`输入用例-${index}`"
                :key="index"
              >
                <a-input
                  v-model="judgeCaseItem.input"
                  placeholder="请填写输入用例..."
                />
              </a-form-item>

              <a-form-item
                :field="`judgeCase[${index}].output`"
                :label="`输出用例-${index}`"
                :key="index"
              >
                <a-input
                  v-model="judgeCaseItem.output"
                  placeholder="请填写输出用例..."
                />
              </a-form-item>
            </a-space>
          </a-form-item>
        </a-form-item>
        <a-form-item>
          <a-button type="dashed" status="success" @click="handleAdd"
            >添加用例</a-button
          >
          <a-button
            status="danger"
            @click="handleDelete(index)"
            :style="{ marginLeft: '10px' }"
            >删除用例</a-button
          >
        </a-form-item>
      </a-form>
      <div :style="{ textAlign: 'center' }">
        <a-button
          v-if="!isUpdateQuestion"
          size="large"
          type="primary"
          @click="handleSubmit(form)"
          style="min-width: 220px"
          >创建题目</a-button
        >
        <a-button
          v-if="isUpdateQuestion"
          size="large"
          type="primary"
          @click="handleSubmit(form)"
          style="min-width: 220px"
          >更新题目</a-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyByteMd from "@/components/MyByteMd.vue";
import { onMounted, reactive, ref } from "vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";

const form = ref({
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  tags: [],
  title: "",
});

const route = useRoute();
const isUpdateQuestion = route.path.includes("/update");

const loadUpdateQuestion = async () => {
  const id = route.query.id as any;
  if (!id) return;
  const res = await QuestionControllerService.getQuestionByIdUsingGet(id);
  if (res.code === 200) {
    form.value = res.data as any;
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
  } else {
    message.error("题目加载失败" + res.message);
  }
};

onMounted(() => {
  if (isUpdateQuestion) {
    loadUpdateQuestion();
  }
});

const handleContentChange = (v: string) => {
  form.value.content = v;
};

const handleAnswerChange = (v: string) => {
  form.value.answer = v;
};

const handleSubmit = async (data: any) => {
  if (isUpdateQuestion) {
    const res = await QuestionControllerService.updateQuestionUsingPost(data);
    if (res.code === 200) {
      message.success("更新题目成功");
    } else {
      message.error("题目更新失败", res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(data);
    if (res.code === 200) {
      message.success("创建题目成功");
    } else {
      message.error("题目创建失败", res.message);
    }
  }
};

const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};
</script>

<style>
.bytemd.bytemd-split {
  min-width: 900px;
}
</style>
