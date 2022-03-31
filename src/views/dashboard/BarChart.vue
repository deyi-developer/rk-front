<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import resize from "./mixins/resize";

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
      chart: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      const option = {
        aria: {
          enabled: true,
          decal: {
            show: true
          }
        },
        title: {
          text: "总收入（未税）"
          // subtext: "比率：%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function (params) {
            var tar = params[1];
            return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          }
        },
        grid: {},
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: ["总收入", "人天成本", "外协成本", "实施费用", "毛利额"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "Placeholder",
            type: "bar",
            stack: "Total",
            itemStyle: {
              borderColor: "transparent",
              color: "transparent"
            },
            emphasis: {
              itemStyle: {
                borderColor: "transparent",
                color: "transparent"
              }
            },
            data: [0, 1700, 1400, 1200, 0]
          },
          {
            name: "Life Cost",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
              position: "inside"
            },
            data: [2900, 1200, 300, 200, 900]
          }
        ]
      };
      this.chart = this.$echarts.init(this.$el, "walden");

      this.chart.setOption(option);
    }
  }
};
</script>
