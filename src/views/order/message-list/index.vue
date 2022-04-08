<template>
  <div class="message-wrap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已读列表" name="1"></el-tab-pane>
      <el-tab-pane label="未读列表" name="0"></el-tab-pane>
    </el-tabs>
    <el-table border :data="activeName == 1 ? messages : noReadList">
      <el-table-column
        v-for="(item, index) in column"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: '1',
      column: [
        {
          label: '消息内容',
          prop: 'messageContent'
        },
        {
          label: '创建时间',
          prop: 'createTime'
        },
        {
          label: '更新时间',
          prop: 'updateTime'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(["messages", "unread"]),
    noReadList() {
      return this.messages.filter(item => !item.readFlag)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions(["Messages"]),
    getList() {
      this.Messages()
    },
    handleClick(value) {
      console.log(value)
    }
  }
}
</script>
<style scoped>
.message-wrap {
  padding: 20px;
}
</style>