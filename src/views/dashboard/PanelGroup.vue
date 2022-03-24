<template>
  <el-row :gutter="12" style="margin-bottom: 10px">
    <el-col :span="6">
      <el-card shadow="always" style="height: 150px">
        <i-circle :percent="80" stroke-color="#409EFF">
          <span class="demo-Circle-inner" style="font-size: 24px">80%</span>
        </i-circle>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="always" style="height: 150px">
        <i-circle :percent="80" stroke-color="#5cb85c">
          <span class="demo-Circle-inner" style="font-size: 24px">80%</span>
        </i-circle>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="always" style="height: 150px">
        <i-circle :percent="80" stroke-color="#5cb85c">
          <span class="demo-Circle-inner" style="font-size: 24px">80%</span>
        </i-circle>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="always" style="height: 150px">
        <i-circle :percent="80" stroke-color="#ff5500">
          <span class="demo-Circle-inner" style="font-size: 24px">80%</span>
        </i-circle>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { Circle } from "view-design";
import CountTo from "vue-count-to";

export default {
  components: {
    CountTo,
    iCircle: Circle
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-group {
  // margin-top: 18px;

  .card-panel-col {
    margin-bottom: 16px;
  }

  .card-panel {
    height: 182px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
