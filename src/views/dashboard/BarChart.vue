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
        title: {
          text: "Waterfall Chart",
          subtext: "Living Expenses in Shenzhen"
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
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: [
            "Total",
            "Rent",
            "Utilities",
            "Transportation",
            "Meals",
            "Other"
          ]
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
            data: [0, 1700, 1400, 1200, 300, 0]
          },
          {
            name: "Life Cost",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
              position: "inside"
            },
            data: [2900, 1200, 300, 200, 900, 300]
          }
        ]
      };
      this.chart = this.$echarts.init(this.$el, "walden");

      this.chart.setOption(option);
    }
  }
};
</script>
