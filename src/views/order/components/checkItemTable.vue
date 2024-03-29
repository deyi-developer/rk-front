<template>
  <div>
    <div class="addBtn" v-if="tableType === 'operate'">
      <span class="title">维护checkItem</span>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addBtn">新增</el-button>
    </div>
    <el-table :data="tableDataList" border style="width: 100%">
      <el-table-column
        v-for="(tableEl, index) in curColumn"
        header-align="center"
        :key="tableEl.id || index"
        :align="tableEl.align"
        :type="tableEl.type"
        :label="tableEl.label"
        :prop="tableEl.prop"
      />
      <el-table-column
        align="center"
        label="是否已完成"
        v-if="tableType === 'finish'"
      >
        <template slot-scope="scope">
          <el-switch
            v-if="tableType === 'finish'"
            v-model="scope.row.finish"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchChange(scope.row)"
          >
          </el-switch>
          <div v-else>
            {{ scope.row.finish ? "已完成" : "未完成" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        v-if="tableType === 'operate'"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="Editor(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="Delete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增or编辑弹框 -->
    <AddDialog
      v-if="Visible"
      :dialogType="dialogType(DialogData)"
      :Visible="Visible"
      @dialogClose="Visible = false"
      :DialogData="DialogData"
      @confirm="onQuery()"
    />
  </div>
</template>
<script>
import { CustomRequest, deleteCheckitem } from "../check-item/api";
import {
  configData,
  dialogType,
  column,
  columnFilter,
  queryHandle,
} from "./constants";
import AddDialog from "./addDialog.vue";
export default {
  name: "CheckItemTable",
  components: { AddDialog },
  data() {
    return {
      configData: configData, // 表格配置数据
      tableDataList: [], // 表格列表数据
      DialogData: {}, // 弹框数据
      dialogType, // 弹框类型
      Visible: false, // 编辑/新增弹框
      curColumn:[],
    };
  },
  props: {
    queryData: {
      type: Object,
      default: () => {},
    },
    tableType: {
      type: String,
      default: "operate",
    },
    column: {
      type: Array,
      default: column,
    },
  },
  created: function() {
    this.curColumn = columnFilter(this.tableType);
  },
  computed: {
    // 根据状态，获取请求方法
    queryHandles: function () {
      return queryHandle(this.tableType);
    },
    // 请求参数过滤处理
    requestData: function () {
      const { configData, queryData = {} } = this;
      let queryObj = { ...queryData };
      Object.keys(queryData).forEach((v) => {
        if (configData[v]) {
          queryObj = {
            ...queryObj,
            data: { ...queryObj.data, ...configData[v] },
          };
          if (configData[v]) {
            delete queryObj[v];
          }
        }
      });
      return queryObj;
    },
  },
  methods: {
    // 请求获取表格数据
    async onQuery() {
      const res = await this.queryHandles(this.requestData);
      this.tableDataList = res;
    },
    // 新增
    addBtn() {
      this.Visible = true;
      this.DialogData = {};
    },
    // 编辑
    Editor(row) {
      this.Visible = true;
      this.DialogData = {
        ...row,
        checkItemRoleCode: row?.checkItemRoleCode?.split(",") || [],
      };
    },

    // 删除数据
    async Delete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { code } = await deleteCheckitem(row.checkItemId);
        this.messageConfig(
          code,
          { success: "删除成功", error: "删除失败，请重试!" },
          () => this.onQuery()
        );
      });
    },

    // 切换状态
    async switchChange(row) {
      const { code } = await CustomRequest({
        url: "/checkitem/item-user/edit",
        method: "put",
        data: { ...row },
      });
      this.messageConfig(code, { success: "修改成功", error: "修改失败" }, () =>
        this.onQuery()
      );
    },
    messageConfig(code, { success, error }, callback) {
      this.$message(
        code === 200
          ? { message: success, type: "success" }
          : { message: error }
      );
      callback();
    },
  },
  watch: {
    // 如果请求参数改变，重新触发请求
    requestData: {
      handler: function () {
        this.onQuery();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style scoped lang="scss">
.addBtn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.title {
  line-height: 36px;
  font-size: 16px;
  font-weight: 600;
}
</style>
