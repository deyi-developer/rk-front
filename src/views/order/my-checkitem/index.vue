<template>
  <div class="page-bg">
    <div class="table-bg">
      <!-- 表格 -->
      <CheckItemTable
        :tableData="tableData"
        @switchChange="switchChange"
        :tableLoading="tableLoading"
        operateSlot
      />
    </div>
  </div>
</template>
<script>
import CheckItemTable from "../components/checkItemTable.vue";
import { getUserCheckitemlist, UserCheckitemlistEdit } from "./api.js";
export default {
  name: "my-checkItem",
  components: { CheckItemTable },
  data() {
    return {
      tableData: [],
      tableLoading: false,
    };
  },
  created() {
    this.appInit();
  },
  watch: {},
  methods: {
    async appInit() {
      this.tableLoading = true;
      const res = await getUserCheckitemlist();
      this.tableData = res.rows;
      this.tableLoading = false;
    },
    async switchChange(row) {
      const data = {
        ...row,
        finish: +row.finish,
      };
      console.log(data, +row.finish, row.finish);
      const res = await UserCheckitemlistEdit(data);
      if (res.code === 200) {
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.appInit();
      } else {
        this.$message({
          message: "操作失败,请重试",
          type: "error",
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.page-bg{
  padding: 20px;
}
.table-bg {
  padding: 20px;
  min-height: calc(100vh - 84px);
  background-color: #fff;
}
</style>
