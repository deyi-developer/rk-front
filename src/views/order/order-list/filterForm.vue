<!--  -->
<template>
  <div class="filter-form">
    <el-form :model="queryParams" ref="queryForm" label-width="100px">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="项目编码" prop="projectCode">
            <el-input v-model="queryParams.projectCode" clearable size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="工单标题" prop="eventTitle">
            <el-input v-model="queryParams.eventTitle" clearable size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="工单类型" prop="eventType">
            <el-select
              style="width: 80%;"
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
          <el-button type="primary" size="small" icon="el-icon-search" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="small" @click="resetQuery">重置</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="24" v-show="more">
        <!-- <el-col :span="6">
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
            <el-select class="block" v-model="queryParams.receiveRiskLevel" clearable size="small">
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
        </el-col>-->
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
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  dicts: ["event_type"],
  props: {
    projectCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      more: true,
      // 查询参数
      queryParams: {}
    };
  },
  mounted() {
    this.$set(this.queryParams, 'projectCode', this.projectCode)
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
