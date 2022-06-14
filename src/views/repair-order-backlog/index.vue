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
          :icon="item.icon"
        />
      </el-steps>

      <!-- 工单列表 -->
      <div class="repair_order">
        <div
          v-for="item in list"
          v-bind:key="item.title"
          class="repair_order_list"
        >
          <el-card class="repair_order-Item" shadow="hover">
            总是显示cdccdsacacsasascacs
          </el-card>
          <el-card class="repair_order-Item" shadow="hover">
            总是显示cdccdsacacsasascacs
          </el-card>
          <el-card class="repair_order-Item" shadow="hover">
            总是显示cdccdsacacsasascacs
          </el-card>
          <el-card class="repair_order-Item" shadow="hover">
            总是显示cdccdsacacsasascacs
          </el-card>
          <el-card class="repair_order-Item" shadow="hover">
            总是显示cdccdsacacsasascacs
          </el-card>
          <el-card class="repair_order-Item" shadow="hover">
            总是显示cdccdsacacsasascacs
          </el-card>
          <el-card class="repair_order-Item" shadow="hover">
            总是显示cdccdsacacsasascacs
          </el-card>
          <el-card class="repair_order-Item" shadow="always">
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
          title: "过期",
          icon: "el-icon-circle-close"
        },
        {
          title: "本周",
          icon: "el-icon-edit-outline"
        },
        {
          title: "未来一周",
          icon: "el-icon-c-scale-to-original"
        },
        {
          title: "未来两周",
          icon: "el-icon-date"
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

    .repair_order {
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      .repair_order_list {
        max-height: 72vh;
        overflow: scroll;
        .repair_order-Item {
          margin-top: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
