<template>
  <div class="repair_order_backlog">
    <el-card class="space">
      <!-- 步骤条 -->
      <el-steps :active="list.length" align-center>
        <el-step
          v-for="item in list"
          v-bind:key="item.title"
          :title="item.title"
          :description="item.description"
        />
      </el-steps>

      <!-- 工单列表 -->
      <div class="repair_order_list">
        <div v-for="item in list" v-bind:key="item.title">
          <el-card shadow="always">
            总是显示cdccdsacacsasascacs
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "repairOrderBacklog",
  data() {
    return {
      list: [
        {
          title: "步骤1",
          description: "这是一段很长很长很长的描述性文字",
        },
        {
          title: "步骤2",
          description: "这是一段很长很长很长的描述性文字",
        },
        {
          title: "步骤3",
          description: "这是一段很长很长很长的描述性文字",
        },
      ],
    };
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.repair_order_backlog {
  background: #f0f2f5;
  padding: 20px;
  min-height: calc(100vh - 84px);

  .space {
    min-height: calc(100vh - 124px);

    .repair_order_list {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }
}
</style>
