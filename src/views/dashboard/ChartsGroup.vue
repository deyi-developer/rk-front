<!--  -->
<template>
  <div>
    <el-row type="flex" :gutter="10">
      <el-col :span="8">
        <el-card>
          <el-row type="flex">
            <PieChart />
          </el-row>
          <el-row type="flex">
            <PieChart />
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card>
          <el-row type="flex">
            <el-col :span="24">
              <BarChart />
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="24">
              <BarChart2 />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="10">
      <el-col :span="12">
        <el-card>
          <GrossProfitChart />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <ReachChart />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import BarChart from "./BarChart";
import BarChart2 from "./BarChart2";
import GrossProfitChart from "./GrossProfitChart.vue";
import ReachChart from "./ReachChart.vue";
import PieChart from "./PieChart";
import PieChart2 from "./PieChart2";
</script>
<style lang="scss" scoped>
.echarts-panel {
  background: #fff;
  padding: 20px;
}
</style>
