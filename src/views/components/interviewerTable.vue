<!-- 面试官选择 -->
<template>
  <el-dialog title="批量分配面试官" :visible.sync="open" width="800px">
    <el-form :model="queryParams" ref="queryForm" label-width="68px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="姓名" prop="nickName">
            <el-input
              v-model="queryParams.nickName"
              placeholder="请输入用户名称"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div style="line-height: 36px">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
              @click="getList"
              >搜索</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-form>

    <el-table
      height="300"
      v-loading="loading"
      :data="demandList"
      row-key="userId"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="姓名"
        width="100"
        align="center"
        prop="nickName"
      />
      <el-table-column
        label="所属部门"
        width="250"
        align="center"
        prop="deptName"
      />

      <el-table-column label="联系方式" align="center" prop="phonenumber" />
      <el-table-column label="邮箱" align="center" prop="email" />
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :disabled="single" @click="submitForm"
        >确 定</el-button
      >
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { listInterviewer } from "@/api/project/interviewer";

export default {
  props: {
    open: Boolean,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 风控需求表格数据
      demandList: [],
      // 查询参数
      queryParams: {
        nickName: "",
        pageNum: 1,
        pageSize: 9999,
        isInterviewer: 1,
      },
    };
  },
  components: {},
  computed: {},
  methods: {
    submitForm() {
      if (!this.ids.length) {
        return this.$modal.msgError("请先选择面试官！");
      }
      this.$emit("submit", this.ids);
      this.$emit("update:open", false);
    },
    cancel() {
      this.$emit("update:open", false);
    },
    /** 查询列表 */
    getList() {
      this.loading = true;
      listInterviewer(this.queryParams).then((response) => {
        this.demandList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
  },
  mounted() {},
  created() {
    this.getList();
  },
};
</script>
<style lang="scss"></style>
