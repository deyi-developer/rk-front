<!--  -->
<template>
  <div class="filter-form">
    <el-form :model="queryParams" ref="queryForm" label-width="100px">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="项目编码" prop="projectCode">
            <el-input
              v-model="queryParams.projectCode"
              placeholder="请输入项目编码"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="工单名" prop="eventTitle">
            <el-input
              v-model="queryParams.eventTitle"
              placeholder="请输入工单名"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="工单类型" prop="eventType">
            <el-select
              style="width: 80%"
              placeholder="请选择工单类型"
              v-model="queryParams.eventType"
              clearable
            >
              <el-option
                v-for="dict in dict.type.event_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div style="float: right">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-download"
              @click="handleExport"
            >
              附件下载
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
              @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="small" @click="resetQuery"
              >重置</el-button
            >
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="一级部门" prop="oneDeptId">
            <el-select class="block" v-model="queryParams.oneDeptId" clearable size="small">
              <el-option
                v-for="dict in deptList"
                :key="dict.oneDeptId"
                :value="dict.oneDeptId"
                :label="dict.oneDeptName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
      </el-row>
      <el-row>
        <div style="float: right"></div>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getDeptList } from "@/api/common";
export default {
  dicts: ["event_type"],

  data() {
    return {
      more: true,
      // 查询参数
      queryParams: {},
      deptList: [],
    };
  },

  async mounted() {
    const res = await getDeptList();
    if (res.code == 200) {
      this.deptList = res.rows;
    }
  },
  methods: {
    /** 搜索按钮操作 */
    handleQuery() {
      this.$emit("search");
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$refs["queryForm"].resetFields();
      this.queryParams = {};
      this.$emit("search");
    },

    /** 导出表格 */
    handleExport() {
      this.download(
        '/workOrder/header/export',
        this.queryParams,
        `工单列表_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
<style lang="scss"></style>
