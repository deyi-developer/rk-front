<!--  -->
<template>
  <div class="filter-form">
    <el-form :model="queryParams" ref="queryForm" label-width="100px">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="项目编码" prop="projectCode">
            <el-input
              v-model="queryParams.projectCode"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目名称" prop="projectName">
            <el-input
              v-model="queryParams.projectName"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目经理" prop="pmName">
            <el-input v-model="queryParams.pmName" clearable size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="一级部门" prop="oneDeptId">
            <el-select
              class="block"
              v-model="queryParams.oneDeptId"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in deptList"
                :key="dict.oneDeptId"
                :value="dict.oneDeptId"
                :label="dict.oneDeptName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" v-show="more">
        <el-col :span="6">
          <el-form-item label="开票风险等级" prop="invoicingRiskLevel">
            <el-select
              v-model="queryParams.invoicingRiskLevel"
              clearable
              class="block"
              size="small"
            >
              <el-option
                v-for="dict in dict.type.risk_level"
                :key="dict.value"
                :value="dict.value"
                :label="dict.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收款风险等级" prop="receiveRiskLevel">
            <el-select
              class="block"
              v-model="queryParams.receiveRiskLevel"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in dict.type.risk_level"
                :key="dict.value"
                :value="dict.value"
                :label="dict.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="毛利风险等级" prop="grossProfitRiskLevel">
            <el-select
              class="block"
              v-model="queryParams.grossProfitRiskLevel"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in dict.type.risk_level"
                :key="dict.value"
                :value="dict.value"
                :label="dict.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div style="line-height: 36px">
            <!-- <el-button
              v-show="!more"
              @click="more = !more"
              size="small"
              icon="el-icon-arrow-down"
              >更多</el-button
            >-->
            <!-- <el-button
              v-show="more"
              @click="more = !more"
              icon="el-icon-arrow-up"
              size="small"
              >收起</el-button
            >-->
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
import { getDeptList } from "@/api/common";

export default {
  dicts: ["risk_level"],
  props: {
    projectCode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      more: true,
      // 查询参数
      queryParams: {},
      deptList: []
    };
  },
  async created() {
    const res = await getDeptList();
    if (res.code == 200) {
      this.deptList = res.rows;
    }
  },
  mounted() {
    this.$set(this.queryParams, "projectCode", this.projectCode);
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
    }
  }
};
</script>
<style lang="scss"></style>
