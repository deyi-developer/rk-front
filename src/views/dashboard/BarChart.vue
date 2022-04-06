<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import resize from "./mixins/resize";
import { getReportReceive } from "./api";
import currency from "currency.js";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    projectCode: {
      type: String
    },
    oneDeptId: {
      type: [String, Number]
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
  watch: {
    oneDeptId() {
      this.fetchData();
    }
  },
  methods: {
    fetchData() {
      const params = {
        projectCode: this.projectCode,
        oneDeptId: this.oneDeptId
      };
      getReportReceive(params).then((res) => {
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
          text: "总收入（未税）:" + income + "万元",
          subtext: "单位（万元）"
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
              currency(tar.value, {
                symbol: "",
                separator: ","
              }).format() +
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
              // return value / 10000 + "万元";
              return value + "万元";
            }
          }
        },
        series: [
          {
            name: "Placeholder",
            type: "bar",
            barMaxWidth: "45",
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
            barMaxWidth: "45",
            label: {
              show: true,
              position: "top",
              formatter: ({ value }) => {
                return currency(value, {
                  symbol: "",
                  separator: ","
                }).format();
              }
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
