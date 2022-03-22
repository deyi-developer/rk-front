<!--  -->
<template>
  <div class="filter-form">
    <el-form :model="queryParams" ref="queryForm" label-width="100px">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="项目名称" prop="projectId">
            <el-select
              class="block"
              v-model="queryParams.projectId"
              filterable
              placeholder="请选择项目"
              size="small"
            >
              <el-option
                v-for="item in projectList"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId"
              >
              </el-option>
            </el-select>
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
          <el-form-item label="岗位类型" prop="demandType">
            <el-select
              class="block"
              v-model="queryParams.demandType"
              clearable
              size="small"
              placeholder="请选择"
            >
              <el-option
                v-for="dict in dict.type.demand_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="状态" prop="demandStatus">
            <el-select
              class="block"
              v-model="queryParams.demandStatus"
              filterable
              size="small"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in demandStatusMap"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
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
      <el-row v-show="more" :gutter="24">
        <el-col :span="6">
          <el-form-item label="截止日期" prop="queryTime">
            <el-date-picker
              type="daterange"
              clearable
              v-model="queryParams.queryTime"
              value-format="yyyy-MM-dd"
              size="small"
              placeholder="选择截止日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  dicts: ["yes_no", "demand_type"],
  props: {
    projectList: Array,
  },
  data() {
    return {
      demandStatusMap: [
        {
          label: "正常",
          value: 1,
        },
        {
          label: "停用",
          value: 0,
        },
      ],
      more: false,
      // 查询参数
      queryParams: {},
    };
  },
  components: {},
  computed: {},
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
  mounted() {},
  created() {},
};
</script>
<style lang="scss"></style>
