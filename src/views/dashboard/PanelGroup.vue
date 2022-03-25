<!--  -->
<template>
  <el-row :gutter="12" style="margin-bottom: 10px">
    <el-col :span="6">
      <el-card shadow="always">
        <div class="ds-flex">
          <i-circle :percent="80" stroke-color="#19be6b">
            <span class="demo-Circle-inner">80%</span>
          </i-circle>
          <div class="circel-desc">
            <p class="circel-desc-title">无风险项目</p>
            <div class="circel-desc-content">
              <countTo :startVal="0" :endVal="3000" :duration="1000"></countTo
              >/4999
            </div>
            <p class="tooltip-icon-wrap">
              <Tooltip
                class="tooltip-icon"
                content="项目数：30000，总项目数：4000"
              >
                <i style="font-size: 16px" class="el-icon-warning-outline"></i>
              </Tooltip>
            </p>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="always">
        <div class="ds-flex">
          <i-circle :percent="12" stroke-color="#ff9900">
            <span class="demo-Circle-inner">12%</span>
          </i-circle>
          <div class="circel-desc">
            <p class="circel-desc-title">中风险项目</p>
            <div class="circel-desc-content">
              <countTo :startVal="0" :endVal="12" :duration="1000"></countTo
              >/4999
            </div>
            <p class="tooltip-icon-wrap">
              <Tooltip
                class="tooltip-icon"
                content="项目数：30000，总项目数：4000"
              >
                <i style="font-size: 16px" class="el-icon-warning-outline"></i>
              </Tooltip>
            </p>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="always">
        <div class="ds-flex">
          <i-circle :percent="5" stroke-color="#ed4014">
            <span class="demo-Circle-inner">5%</span>
          </i-circle>
          <div class="circel-desc">
            <p class="circel-desc-title">高风险项目</p>
            <div class="circel-desc-content">
              <countTo :startVal="0" :endVal="5" :duration="1000"></countTo
              >/4999
            </div>
            <p class="tooltip-icon-wrap">
              <Tooltip
                class="tooltip-icon"
                content="项目数：30000，总项目数：4000"
              >
                <i style="font-size: 16px" class="el-icon-warning-outline"></i>
              </Tooltip>
            </p>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="always">
        <div class="ds-flex">
          <i-circle :percent="3" stroke-color="#808695">
            <span class="demo-Circle-inner">2%</span>
          </i-circle>
          <div class="circel-desc">
            <p class="circel-desc-title">法务接管项目</p>
            <div class="circel-desc-content">
              <countTo :startVal="0" :endVal="2" :duration="1000"></countTo
              >/4999
            </div>
            <p class="tooltip-icon-wrap">
              <Tooltip
                class="tooltip-icon"
                content="项目数：30000，总项目数：4000"
              >
                <i style="font-size: 16px" class="el-icon-warning-outline"></i>
              </Tooltip>
            </p>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { Circle, Tooltip } from "view-design";
import CountTo from "vue-count-to";

export default {
  components: {
    CountTo,
    iCircle: Circle,
    Tooltip
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  }
};
</script>

<style lang="scss" scoped>
.circel-desc {
  display: inline-block;
  vertical-align: top;
  height: 125px;
  flex: 1;
  .circel-desc-title {
    text-align: right;
    color: #808695;
    font-size: 14px;
  }
  .circel-desc-content {
    text-align: right;
    margin-top: 15px;
    color: #17233d;
    font-size: 30px;
    height: 80px;
  }
  .tooltip-icon-wrap {
    text-align: right;
  }
}
.demo-Circle-inner {
  font-size: 24px;
}
</style>
