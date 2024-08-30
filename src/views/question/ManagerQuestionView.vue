<template>
  <div class="manager-question-view">
    <h2 :style="{ textAlign: 'center' }">题目管理</h2>
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
    >
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>

          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const questions = ref([]);
const total = ref(0);
const searchParams = ref({
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
    title: "id",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "题目内容",
    dataIndex: "content",
  },
  {
    title: "题目标签",
    dataIndex: "tags",
  },
  {
    title: "题目解析",
    dataIndex: "answer",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "Optional",
    slotName: "optional",
  },
];

const router = useRouter();
const doUpdate = async (record: any) => {
  router.push({
    path: "/update/question",
    query: {
      id: record.id,
    },
  });
};

const doDelete = async (record: any) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: record.id,
  });
  if (res.code === 200) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败", res.message);
  }
};
</script>

<style scoped>
.manager-question-view {
}
</style>
