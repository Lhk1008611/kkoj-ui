<template>
  <div class="question-submit-view">
    <h2 :style="{ textAlign: 'center' }">题目提交记录列表</h2>

    <a-form :model="searchParams" layout="inline">
      <a-form-item field="id" label="题目 ID" style="min-width: 240px">
        <a-input
          v-model="searchParams.questionId"
          placeholder="根据题目 ID 查询..."
        />
      </a-form-item>
      <a-form-item field="language" label="编程语言" style="min-width: 240px">
        <a-select
          v-model="searchParams.language"
          :style="{ width: '220px' }"
          placeholder="根据语言查询..."
        >
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="queryData">查询</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :columns="columns"
      :data="questionSubmits"
      data-index="id"
      :pagination="{
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total: total,
        showTotal: (total) => `共 ${total} 条数据`,
      }"
      @page-change="pageChange"
    >
      <template #createTime="{ record }">
        <a-space>
          {{ moment(record.createTime).format("YYYY-MM-DD") }}
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import moment from "moment";

const questionSubmits = ref([]);
const total = ref(0);
const searchParams = ref({
  questionId: undefined,
  language: undefined,
  current: 1,
  pageSize: 10,
});
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    {
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    }
  );
  if (res.code === 200) {
    questionSubmits.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("题目获取失败", res.message);
  }
};

/**
 * @description: 页面加载完成时获取题目列表
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "提交记录 ID",
    dataIndex: "id",
  },
  {
    title: "题目 ID",
    dataIndex: "questionId",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    dataIndex: "judgeInfo",
  },
  {
    title: "判题状态",
    dataIndex: "status",
  },
  {
    title: "提交用户",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
];

const pageChange = async (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * @description: 监听搜索参数的变化，重新加载数据
 */
watchEffect(() => {
  loadData();
});

const queryData = async () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
.question-submit-view {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
