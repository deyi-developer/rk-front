<!--  -->
<template>
  <div>
    <el-row type="flex" :gutter="10" class="mb-10">
      <el-col :span="8">
        <el-card>
          <el-row type="flex">
            <PieChart :projectCode="projectCode" :summary="summary" />
          </el-row>
          <el-row type="flex">
            <PieChart2 :projectCode="projectCode" :summary="summary" />
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
          <CostChart :projectCode="projectCode" />
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
import { getSummary, projectDetails } from "./api.js";
import BarChart from "./BarChart";
import BarChart2 from "./BarChart2";
import CostChart from "./CostChart.vue";
import AmountChart from "./AmountChart.vue";
import CashOccupyChart from "./CashOccupyChart.vue";
import GrossProfitChart from "./GrossProfitChart.vue";
import ReachChart from "./ReachChart.vue";
import PieChart from "./PieChart";
import PieChart2 from "./PieChart2";
export default {
  components: {
    BarChart,
    BarChart2,
    CostChart,
    AmountChart,
    CashOccupyChart,
    GrossProfitChart,
    ReachChart,
    PieChart,
    PieChart2
  },
  data() {
    return {
      summary: {}
    };
  },
  props: {
    projectCode: {
      type: String
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      if (this.projectCode) {
        projectDetails(props.projectCode).then((res) => {
          if (res) {
            this.summary = res.data;
          }
        });
      } else {
        getSummary().then((res) => {
          if (res) {
            this.summary = res;
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.mb-10 {
  margin-bottom: 10px;
}
</style>
