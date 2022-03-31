<!--  -->
<template>
  <div>
    <el-row type="flex" :gutter="10" class="mb-10">
      <el-col :span="8">
        <el-card>
          <el-row type="flex">
            <PieChart :projectCode="projectCode" />
          </el-row>
          <el-row type="flex">
            <PieChart :projectCode="projectCode" />
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card>
          <el-row type="flex">
            <el-col :span="24">
              <BarChart :projectCode="projectCode" />
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="24">
              <BarChart2 :projectCode="projectCode" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="mb-10">
      <el-row type="flex" :gutter="10">
        <AmountChart :projectCode="projectCode" />
      </el-row>
    </el-card>
    <el-card class="mb-10">
      <el-row type="flex" :gutter="10">
        <el-col :span="12">
          <CostChart />
        </el-col>
        <el-col :span="12">
          <CashOccupyChart :projectCode="projectCode" />
        </el-col>
      </el-row>
    </el-card>

    <el-row type="flex" :gutter="10">
      <el-col :span="12">
        <el-card>
          <GrossProfitChart :projectCode="projectCode" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <ReachChart :projectCode="projectCode" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ["projectCode"]
};
</script>
<script setup>
import BarChart from "./BarChart";
import BarChart2 from "./BarChart2";

import CostChart from "./CostChart.vue";
import AmountChart from "./AmountChart.vue";
import CashOccupyChart from "./CashOccupyChart.vue";
import GrossProfitChart from "./GrossProfitChart.vue";
import ReachChart from "./ReachChart.vue";
import PieChart from "./PieChart";
// import PieChart2 from "./PieChart2";
</script>
<style lang="scss" scoped>
.mb-10 {
  margin-bottom: 10px;
}
</style>
