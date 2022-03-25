<!--  -->
<template>
  <div class="filter-form">
    <el-form :model="queryParams" ref="queryForm" label-width="100px">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="项目名称" prop="projectId">
            <el-input
              v-model="queryParams.demandName"
              placeholder="请输入项目名称"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="需求名称" prop="demandName">
            <el-input
              v-model="queryParams.demandName"
              placeholder="请输入需求名称"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="简历来源" prop="source">
            <el-input v-model="queryParams.source" clearable size="small" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <div style="line-height: 36px">
            <el-button
              v-show="!more"
              @click="more = !more"
              size="small"
              icon="el-icon-arrow-down"
              >更多</el-button
            >
            <el-button
              v-show="more"
              @click="more = !more"
              icon="el-icon-arrow-up"
              size="small"
              >收起</el-button
            >
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
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      more: false,
      // 查询参数
      queryParams: {},
    };
  },
  methods: {
    /** 搜索按钮操作 */
    handleQuery() {
      this.$emit("search", this.queryParams);
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$refs["queryForm"].resetFields();
      this.$emit("search", this.queryParams);
    },
  },
};
</script>
<style lang="scss"></style>
