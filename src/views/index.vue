<template>
  <div class="app-container home">
    <PanelGroup :data="state.risk" />
    <TableDesc :data="state.risk" />

    <el-row type="flex" :gutter="20">
      <el-col :span="8">
        <div class="echarts-panel">
          <el-row type="flex">
            <BarChart />
          </el-row>
          <el-row type="flex">
            <PieChart2 />
          </el-row>
        </div>
      </el-col>

      <el-col :span="16" class="echarts-panel">
        <el-row type="flex">
          <el-col :span="12">
            <PieChart />
          </el-col>
          <el-col :span="12">
            <PieChart />
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <PieChart />
          </el-col>
          <el-col :span="12">
            <PieChart />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Index"
};
</script>
<script setup>
import { getSummary, getRiskNum } from "./dashboard/api";
import PanelGroup from "./dashboard/PanelGroup.vue";
import TableDesc from "./dashboard/TableDesc.vue";
import BarChart from "./dashboard/BarChart";
import LineChart from "./dashboard/LineChart";
import PieChart from "./dashboard/PieChart";
import PieChart2 from "./dashboard/PieChart2";
import { reactive, onMounted } from "@vue/composition-api";
onMounted(() => {
  fetchData();
});

const state = reactive({
  risk: {
    highRiskProjectNum: 0,
    highRiskProjectRate: 0,
    mediumRiskProjectNum: 0,
    mediumRiskProjectRate: 0,
    noRiskProjectNum: 0,
    noRiskProjectRate: 0,
    totalProjectNum: 0
  }
});
function fetchData() {
  getRiskNum().then((res) => {
    if (res) {
      state.risk = res;
    }
  });
  getSummary().then((res) => {});
}
</script>

<style scoped lang="scss">
.home {
  .box-card {
    margin-bottom: 10px;
  }
  .echarts-panel {
    background: #fff;
    padding: 20px;
  }
}
</style>
