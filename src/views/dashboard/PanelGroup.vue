<!--  -->
<template>
  <el-row :gutter="12" style="margin-bottom: 10px">
    <el-col :span="6">
      <el-card shadow="always" class="click-handle">
        <div class="ds-flex">
          <i-circle :percent="risk.noRiskProjectRate" stroke-color="#19be6b">
            <span class="demo-Circle-inner">{{ risk.noRiskProjectRate }}%</span>
          </i-circle>
          <div class="circel-desc">
            <p class="circel-desc-title">无风险项目</p>
            <div class="circel-desc-content">
              <countTo
                :startVal="0"
                :endVal="risk.noRiskProjectNum"
                :duration="1000"
              ></countTo
              >/{{ risk.totalProjectNum }}
            </div>
            <p class="tooltip-icon-wrap">
              <Tooltip
                class="tooltip-icon"
                :content="`项目数：${risk.noRiskProjectNum}，总项目数：${risk.totalProjectNum}`"
              >
                <i style="font-size: 16px" class="el-icon-warning-outline"></i>
              </Tooltip>
            </p>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="always" class="click-handle">
        <div class="ds-flex">
          <i-circle
            :percent="risk.mediumRiskProjectRate"
            stroke-color="#ff9900"
          >
            <span class="demo-Circle-inner"
              >{{ risk.mediumRiskProjectRate }}%</span
            >
          </i-circle>
          <div class="circel-desc">
            <p class="circel-desc-title">中风险项目</p>
            <div class="circel-desc-content">
              <countTo
                :startVal="0"
                :endVal="risk.mediumRiskProjectNum"
                :duration="1000"
              ></countTo
              >/{{ risk.totalProjectNum }}
            </div>
            <p class="tooltip-icon-wrap">
              <Tooltip
                class="tooltip-icon"
                :content="`项目数：${risk.mediumRiskProjectNum}，总项目数：${risk.totalProjectNum}`"
              >
                <i style="font-size: 16px" class="el-icon-warning-outline"></i>
              </Tooltip>
            </p>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="always" class="click-handle">
        <div class="ds-flex">
          <i-circle :percent="risk.highRiskProjectRate" stroke-color="#ed4014">
            <span class="demo-Circle-inner"
              >{{ risk.highRiskProjectRate }}%</span
            >
          </i-circle>
          <div class="circel-desc">
            <p class="circel-desc-title">高风险项目</p>
            <div class="circel-desc-content">
              <countTo
                :startVal="0"
                :endVal="risk.highRiskProjectNum"
                :duration="1000"
              ></countTo
              >/{{ risk.totalProjectNum }}
            </div>
            <p class="tooltip-icon-wrap">
              <Tooltip
                class="tooltip-icon"
                :content="`项目数：${risk.highRiskProjectNum}，总项目数：${risk.totalProjectNum}`"
              >
                <i style="font-size: 16px" class="el-icon-warning-outline"></i>
              </Tooltip>
            </p>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="always" class="click-handle">
        <div class="ds-flex">
          <i-circle
            :percent="risk.lawsuitRiskProjectRate"
            stroke-color="#808695"
          >
            <span class="demo-Circle-inner"
              >{{ risk.lawsuitRiskProjectRate }}%</span
            >
          </i-circle>
          <div class="circel-desc">
            <p class="circel-desc-title">法务接管项目</p>
            <div class="circel-desc-content">
              <countTo
                :startVal="0"
                :endVal="risk.lawsuitRiskProjectNum"
                :duration="1000"
              ></countTo
              >/{{ risk.totalProjectNum }}
            </div>
            <p class="tooltip-icon-wrap">
              <Tooltip
                class="tooltip-icon"
                :content="`项目数：${risk.lawsuitRiskProjectNum}，总项目数：${risk.totalProjectNum}`"
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
  props: {
    risk: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    CountTo,
    iCircle: Circle,
    Tooltip
  }
};
</script>

<style lang="scss" scoped>
.click-handle {
  // cursor: pointer;
}
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
