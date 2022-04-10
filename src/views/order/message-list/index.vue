<template>
  <div class="message-wrap page-bg">
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未读列表" name="0"></el-tab-pane>
        <el-tab-pane label="已读列表" name="1"></el-tab-pane>
      </el-tabs>
      <el-table
        size="small"
        height="500"
        border
        :data="activeName == 1 ? readList : noReadList"
      >
        <el-table-column
          v-for="(item, index) in column"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <a
              style="color: #57a3f3"
              v-if="item.prop === 'messageContent'"
              href="javascript:;"
              @click="
                $router.push({
                  path: `/work/details/${row.busiKey}`,
                  query: { id: row.busiKey }
                })
              "
              >{{ row[item.prop] }}</a
            >
            <span v-else>{{ row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <pagination
      v-show="totals > 0"
      :total="totals"
      :page.sync="params.pageNum"
      :limit.sync="params.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Message-list",
  data() {
    return {
      activeName: "0",
      column: [
        {
          label: "消息内容",
          prop: "messageContent",
          width: "700px"
        },
        {
          label: "创建时间",
          prop: "createTime"
        },
        {
          label: "更新时间",
          prop: "updateTime"
        }
      ],
      params: {
        pageNum: 1,
        pageSize: 10
      },
      totals: 0
    };
  },
  computed: {
    ...mapGetters(["messages", "unread"]),
    noReadList() {
      return this.messages.filter((item) => !item.readFlag);
    },
    readList() {
      return this.messages.filter((item) => item.readFlag);
    }
  },
  created() {
    this.getList();
  },
  methods: {
    ...mapActions(["Messages"]),
    async getList(query) {
      this.params = {
        ...this.params,
        ...query
      };
      this.Messages(this.params);
    },
    handleClick(value) {
      this.getList();
    }
  }
};
</script>
<style scoped lang="scss">
.message-wrap {
  padding: 20px;
  min-height: calc(100vh - 84px);
}
</style>
