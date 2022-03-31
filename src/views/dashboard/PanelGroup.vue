<!--  -->
<template>
  <el-row :gutter="12" style="margin-bottom: 10px">
    <el-col :span="6">
      <el-card shadow="always">
        <div class="ds-flex">
          <i-circle :percent="state.noRiskProjectRate" stroke-color="#19be6b">
            <span class="demo-Circle-inner"
              >{{ state.noRiskProjectRate }}%</span
            >
          </i-circle>
          <div class="circel-desc">
            <p class="circel-desc-title">无风险项目</p>
            <div class="circel-desc-content">
              <countTo
                :startVal="0"
                :endVal="state.noRiskProjectNum"
                :duration="1000"
              ></countTo
              >/{{ state.totalProjectNum }}
            </div>
            <p class="tooltip-icon-wrap">
              <Tooltip
                class="tooltip-icon"
                :content="`项目数：${state.noRiskProjectNum}，总项目数：${state.totalProjectNum}`"
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
          <i-circle
            :percent="state.mediumRiskProjectRate"
            stroke-color="#ff9900"
          >
            <span class="demo-Circle-inner"
              >{{ state.mediumRiskProjectRate }}%</span
            >
          </i-circle>
          <div class="circel-desc">
            <p class="circel-desc-title">中风险项目</p>
            <div class="circel-desc-content">
              <countTo
                :startVal="0"
                :endVal="state.mediumRiskProjectNum"
                :duration="1000"
              ></countTo
              >/{{ state.totalProjectNum }}
            </div>
            <p class="tooltip-icon-wrap">
              <Tooltip
                class="tooltip-icon"
                :content="`项目数：${state.mediumRiskProjectNum}，总项目数：${state.totalProjectNum}`"
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
          <i-circle :percent="state.highRiskProjectRate" stroke-color="#ed4014">
            <span class="demo-Circle-inner"
              >{{ state.highRiskProjectRate }}%</span
            >
          </i-circle>
          <div class="circel-desc">
            <p class="circel-desc-title">高风险项目</p>
            <div class="circel-desc-content">
              <countTo
                :startVal="0"
                :endVal="state.highRiskProjectNum"
                :duration="1000"
              ></countTo
              >/{{ state.totalProjectNum }}
            </div>
            <p class="tooltip-icon-wrap">
              <Tooltip
                class="tooltip-icon"
                :content="`项目数：${state.highRiskProjectNum}，总项目数：${state.totalProjectNum}`"
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
          <i-circle :percent="0" stroke-color="#808695">
            <span class="demo-Circle-inner">0%</span>
          </i-circle>
          <div class="circel-desc">
            <p class="circel-desc-title">法务接管项目</p>
            <div class="circel-desc-content">
              <countTo :startVal="0" :endVal="0" :duration="1000"></countTo>/{{
                state.totalProjectNum
              }}
            </div>
            <p class="tooltip-icon-wrap">
              <Tooltip
                class="tooltip-icon"
                :content="`项目数：0，总项目数：${state.totalProjectNum}`"
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
  }
};
</script>
<script setup>
import { defineProps } from "@vue/composition-api";

defineProps({
  state: Object,
  default: () => {}
});
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
