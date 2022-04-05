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
        totalShouldReceiptsMoney = 0,
        totalReceiptssMoney = 0,
        receiptsMoney30Day = 0,
        receiptsMoney30to60Day = 0,
        receiptsMoney60to90Day = 0,
        receiptsMoney90Day = 0
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
            "应收总额:" + (totalShouldReceiptsMoney / 10000).toFixed(2) + "万",
          subtext: "已收:" + (totalReceiptssMoney / 10000).toFixed(2) + "万"
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            const {
              percent,
              data: { name, value }
            } = params;
            // const percent = (value / totalShouldReceiptsMoney).toFixed(2);
            return `${name}<br/>比率：${percent}%<br/>数值：${value}<br/>`;
          }
        },
        // legend: {
        //   bottom: "0",
        //   left: "center"
        // },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",

            data: [
              // { value: totalReceiptssMoney, name: "已收" },
              { value: receiptsMoney90Day, name: "超90天应收未收" },
              { value: receiptsMoney60to90Day, name: "超60-90天应收未收" },
              { value: receiptsMoney30to60Day, name: "超30-60天应收未收" },
              { value: receiptsMoney30Day, name: "超30天应收未收" }
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
