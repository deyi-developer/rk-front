<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import resize from "./mixins/resize";

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
      default: "300px"
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
          subtext: "单位（元）"
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            const {
              percent,
              data: { name, value }
            } = params;

            return `${name}<br/>比率：${percent}%<br/>数值：${value}<br/>`;
          }
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",

            data: [
              { value: totalAlreadyBillingMoney, name: "已开" },
              {
                value: billingMoney90Day,
                name: "超90天应开未开"
              },
              {
                value: billingMoney60to90Day,
                name: "超60-90天应开未开"
              },
              {
                value: billingMoney30to60Day,
                name: "超30-60天应开未开"
              },
              {
                value: billingMoney30Day,
                name: "超30天内应开未开"
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
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
