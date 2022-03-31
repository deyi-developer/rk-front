<!-- 达成率 -->
<template>
  <div>
    <div class="datepicker-wrap">
      <el-select
        size="mini"
        v-model="type"
        placeholder="请选择"
        @change="changeHandle"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div
      ref="dom"
      style="margin-top: 10px"
      :class="className"
      :style="{ height: height, width: width }"
    />
  </div>
</template>

<script>
import resize from "./mixins/resize";
import { getReach } from "./api";
const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    }
  },
  data() {
    return {
      type: 1,
      options: [
        { label: "工单收款达成率", value: 1 },
        { label: "开票收款达成率", value: 2 }
      ],

      chart: null
    };
  },
  mounted() {
    this.fetchData();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    changeHandle() {
      this.fetchData();
    },
    fetchData() {
      getReach(this.type).then((res) => {
        const data = res.rows;
        this.$nextTick(() => {
          this.initChart(data);
        });
      });
    },
    initChart(dataSource) {
      const option = {
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "cross"
          }
        },
        aria: {
          enabled: true,
          decal: {
            show: true
          }
        },
        title: {
          text: "达成率"
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {},
            smooth: true
          }
        ]
      };
      this.chart = this.$echarts.init(this.$refs.dom, "walden");

      this.chart.setOption(option);
    }
  }
};
</script>
