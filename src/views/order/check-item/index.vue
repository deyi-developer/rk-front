<template>
  <div class="page-bg">
    <div class="table-bg">
      <!-- 表格 -->
      <CheckItemTable
        :tableData="tableData"
        @tableEditor="editor"
        @tableDelete="Delete"
        tableType="string"
        finishSlot
      >
        <slot slot="tableBtn">
          <div class="addBtn">
            <el-button type="primary" @click="addBtn">新增</el-button>
          </div>
        </slot>
      </CheckItemTable>

      <!-- 新增or编辑弹框 -->
      <AddDialog
        v-if="Visible"
        :Visible="Visible"
        @dialogClose="Visible = false"
        @dialogConfirm="tableElitorORadd"
        :title="Dialogtitle"
        :DialogData="DialogData"
      />
    </div>
  </div>
</template>
<script>
import CheckItemTable from "../components/checkItemTable.vue";
import AddDialog from "../components/addDialog.vue";
import {
  getCheckitemlist,
  addCheckitem,
  editorCheckitem,
  deleteCheckitem,
} from "./api.js";
export default {
  name: "check-item",
  components: { CheckItemTable, AddDialog },
  data() {
    return {
      tableData: [],
      Visible: false,
      Dialogtitle: "新建",
      DialogData: {},
      tableLoading: true,
    };
  },
  created() {
    this.getCheckitemdata();
  },
  watch: {},
  methods: {
    async getCheckitemdata() {
      this.tableLoading = true;
      const res = await getCheckitemlist();
      this.tableLoading = false;
      this.tableData = res.rows;
    },
    addBtn() {
      this.Dialogtitle = "新增";
      this.Visible = true;
      this.DialogData = {};
    },
    editor(row) {
      this.Dialogtitle = "编辑";
      this.Visible = true;
      // 解除数据关联 实现弹窗内修改 不动态更新到页面上 确认后才更新
      this.DialogData = {
        ...row,
        checkItemRoleCode: row?.checkItemRoleCode?.split(",") || [],
      };
    },
    async Delete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteCheckitem(row.checkItemId);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getCheckitemdata();
          } else {
            this.$message({
              message: "删除失败，请重试!",
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 表格新增OR编辑
    async tableElitorORadd(e) {
      const { form = {}, diaLogtype } = e;
      // 关闭弹窗
      this.Visible = false;
      form.checkItemRoleCode = form.checkItemRoleCode.join(",");
      if (diaLogtype === "新增") {
        const res = await addCheckitem(form);
        if (res.code === 200) {
          this.$message({
            message: "新增成功",
            type: "success",
          });
          this.getCheckitemdata();
        } else {
          this.$message({
            message: "新增失败，请重试!",
            type: "error",
          });
        }
      } else {
        const res = await editorCheckitem(form);
        if (res.code === 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          this.getCheckitemdata();
        } else {
          this.$message({
            message: "编辑失败，请重试!",
            type: "error",
          });
        }
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
  .addBtn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
  }
}
</style>
