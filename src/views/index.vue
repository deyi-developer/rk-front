<template>
  <div class="app-container home">
    <PaneGroup />
    <el-card shadow="always" class="box-card">
      <el-descriptions title="基础指标">
        <el-descriptions-item label="PJTD含税总收入"
          >kooriookami</el-descriptions-item
        >
        <el-descriptions-item label="总开票">18100000000</el-descriptions-item>
        <el-descriptions-item label="相对PJTD开票率"
          >苏州市</el-descriptions-item
        >

        <el-descriptions-item label="总收款率">江苏省苏</el-descriptions-item>
        <el-descriptions-item label="相对PJTD收款率"
          >江苏省苏</el-descriptions-item
        >
        <el-descriptions-item label="相对总开票收款率"
          >江苏省苏</el-descriptions-item
        >
      </el-descriptions>
    </el-card>

    <el-card class="box-card">
      <el-row class="echarts-panel">
        <el-descriptions title="基础指标">
          <el-descriptions-item label="PJTD含税总收入"
            >kooriookami</el-descriptions-item
          >
          <el-descriptions-item label="总开票"
            >18100000000</el-descriptions-item
          >
          <el-descriptions-item label="相对PJTD开票率"
            >苏州市</el-descriptions-item
          >

          <el-descriptions-item label="总收款率">江苏省苏</el-descriptions-item>
          <el-descriptions-item label="相对PJTD收款率"
            >江苏省苏</el-descriptions-item
          >
          <el-descriptions-item label="相对总开票收款率"
            >江苏省苏</el-descriptions-item
          >
        </el-descriptions>
      </el-row>
    </el-card>

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
import PaneGroup from "./dashboard/PanelGroup.vue";
import BarChart from "./dashboard/BarChart";
import LineChart from "./dashboard/LineChart";
import PieChart from "./dashboard/PieChart";
import PieChart2 from "./dashboard/PieChart2";
export default {
  name: "Index",
  components: { BarChart, PaneGroup, LineChart, PieChart, PieChart2 },
  methods: {}
};
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
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>
