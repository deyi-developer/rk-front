<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import resize from "./mixins/resize";
import currency from "currency.js";
const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    summary: {
      type: Object,
      default: () => {}
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
      default: "350px"
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    summary() {
      this.initChart();
    }
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
      const {
        totalShouldBillingMoney = 0,
        totalAlreadyBillingMoney = 0,
        billingMoney30Day = 0,
        billingMoney30to60Day = 0,
        billingMoney60to90Day = 0,
        billingMoney90Day = 0
      } = this.summary;

      const total =
        (billingMoney30Day +
          billingMoney30to60Day +
          billingMoney60to90Day +
          billingMoney90Day) /
        10000;
      const option = {
        aria: {
          enabled: true,
          decal: {
            show: true
          }
        },
        title: {
          text:
            "应开总额:" + (totalShouldBillingMoney / 10000).toFixed(2) + "万",
          subtext:
            "单位（万元）    " +
            "已开:" +
            (totalAlreadyBillingMoney / 10000).toFixed(2) +
            "万"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function (params) {
            const { name, value } = params[0];
            const percent = ((value / total) * 100).toFixed(2);
            return `${name}<br/>比率：${percent}%<br/>数值：${currency(value, {
              symbol: "",
              separator: ","
            }).format()}<br/>`;
          }
        },
        yAxis: {
          type: "value",
          position: "right",
          axisLabel: {
            interval: 0,
            rotate: 30,
            formatter: function (value, index) {
              // return value / 10000 + "万元";
              return value;
            }
          }
        },
        xAxis: {
          type: "category",
          splitLine: { show: false },

          data: [
            "超30天内\n应开未开",
            "超30-60天\n应开未开",
            "超60-90天\n应开未开",
            "超90天\n应开未开"
          ]
        },
        series: [
          {
            type: "bar",
            barWidth: "30",
            data: [
              {
                value: billingMoney30Day / 10000
              },
              {
                value: billingMoney30to60Day / 10000,
                itemStyle: {
                  color: "#6be6c1"
                }
              },
              {
                value: billingMoney90Day / 10000,
                itemStyle: {
                  color: "#626c91"
                }
              },
              {
                value: billingMoney60to90Day / 10000,
                itemStyle: {
                  color: "#a0a7e6"
                }
              }
            ],
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            },
            label: {
              show: true,
              position: "top",
              formatter: ({ value }) => {
                return currency(value, {
                  symbol: "",
                  separator: ","
                }).format();
              }
            }
          }
        ],
        ...this.options
      };

      this.chart = this.$echarts.init(this.$el, "walden");

      this.chart.setOption(option);
    }
  }
};
</script>
