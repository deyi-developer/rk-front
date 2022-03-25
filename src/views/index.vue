<template>
  <div class="app-container home">
    <PaneGroup />
    <TableDesc />

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
import PaneGroup from "./dashboard/PanelGroup.vue";
import TableDesc from "./dashboard/TableDesc.vue";
import BarChart from "./dashboard/BarChart";
import LineChart from "./dashboard/LineChart";
import PieChart from "./dashboard/PieChart";
import PieChart2 from "./dashboard/PieChart2";
import { ref, onMounted } from "@vue/composition-api";
onMounted(() => {
  console.log("mounted");
});
</script>

<style scoped lang="scss">
.home {
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .box-card {
    margin-bottom: 10px;
  }
  .echarts-panel {
    background: #fff;
    padding: 20px;
  }
}
</style>
