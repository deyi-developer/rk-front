<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import resize from "./mixins/resize";
import { getReportReceive } from "./api";
const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    projectCode: {
      type: String
    },
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
    fetchData() {
      getReportReceive(this.projectCode).then((res) => {
        const { data } = res;
        this.$nextTick(() => {
          this.initChart(data);
        });
      });
    },
    initChart(dataSource) {
      const {
        expenseCost,
        expenseOutSource,
        expensePractice,
        grossProfit,
        income
      } = dataSource;

      const option = {
        aria: {
          enabled: true,
          decal: {
            show: true
          }
        },
        title: {
          text: "总收入（未税）:" + (income / 10000).toFixed(2) + "万元",
          subtext: "单位（元）"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function (params) {
            var tar = params[1];
            return (
              tar.name +
              "<br/>" +
              tar.value +
              "<br/>" +
              ((tar.value / income) * 100).toFixed(2) +
              "%"
            );
          }
        },
        grid: {},
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: ["总收入", "人天成本", "外协成本", "实施费用", "毛利额"]
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: function (value, index) {
              return value / 10000 + "万元";
            }
          }
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
            data: [
              0,
              income - expenseCost,
              income - expenseCost - expenseOutSource,
              income - expenseCost - expenseOutSource - expensePractice,
              0
            ]
          },
          {
            name: "Life Cost",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
              position: "top"
            },
            data: [
              income,
              expenseCost,
              expenseOutSource,
              expensePractice,
              grossProfit
            ]
          }
        ]
      };
      this.chart = this.$echarts.init(this.$el, "walden");

      this.chart.setOption(option);
    }
  }
};
</script>
