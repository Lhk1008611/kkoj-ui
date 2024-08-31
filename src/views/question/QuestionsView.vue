<template>
  <div class="questions-view">
    <h2 :style="{ textAlign: 'center' }">题目列表</h2>

    <a-form :model="searchParams" layout="inline">
      <a-form-item field="name" label="题目" style="min-width: 240px">
        <a-input
          v-model="searchParams.title"
          placeholder="输入题目名称查询..."
        />
      </a-form-item>
      <a-form-item field="post" label="标签" style="min-width: 240px">
        <a-input-tag
          v-model="searchParams.tags"
          placeholder="输入题目标签查询..."
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="queryData">查询</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :columns="columns"
      :data="questions"
      data-index="id"
      :pagination="{
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total: total,
        showTotal: (total) => `共 ${total} 条数据`,
      }"
      @page-change="pageChange"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green">
            {{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #passRate="{ record }">
        <a-space
          >{{
            `${
              record.submitNum
                ? (record.acceptedNum / record.submitNum) * 100
                : 0
            }% (${record.acceptedNum}/${record.submitNum})`
          }}
        </a-space>
      </template>
      <template #createTime="{ record }">
        <a-space>
          {{ moment(record.createTime).format("YYYY-MM-DD") }}
        </a-space>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toPractice(record)">练习</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const questions = ref([]);
const total = ref(0);
const searchParams = ref({
  title: "",
  tags: [],
  current: 1,
  pageSize: 10,
});
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 200) {
    questions.value = res.data.records;
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
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "题目标签",
    slotName: "tags",
  },
  {
    title: "通过率 (通过数/提交数)",
    slotName: "passRate",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    slotName: "optional",
  },
];

const router = useRouter();
/**
 * @description: 跳转到练习页面
 * @param question
 */
const toPractice = (question: any) => {
  router.push({
    path: `/practice/question/${question.id}`,
  });
};

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
.questions-view {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
