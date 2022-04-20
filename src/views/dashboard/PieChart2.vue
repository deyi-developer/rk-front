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
      default: () => {},
    },
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
    options: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    summary: {
      handler() {
        this.initChart();
      },
      depp: true,
    },
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
      if (this.chart) {
        this.chart.dispose();
      }
      const {
        totalShouldReceiptsMoney = 0,
        totalReceiptssMoney = 0,
        receiptsMoney30Day = 0,
        receiptsMoney30to60Day = 0,
        receiptsMoney60to90Day = 0,
        receiptsMoney90Day = 0,
        totalShouldNotReceiptsMoney = 0,
      } = this.summary;
      const total =
        (receiptsMoney30Day +
          receiptsMoney30to60Day +
          receiptsMoney60to90Day +
          receiptsMoney90Day) /
        10000;
      const option = {
        aria: {
          enabled: true,
          decal: {
            show: true,
          },
        },
        title: {
          text:
            "应收总额:" + (totalShouldReceiptsMoney / 10000).toFixed(2) + "万",
          subtext:
            "单位（万元）    " +
            "已收:" +
            (totalReceiptssMoney / 10000).toFixed(2) +
            "万     " +
            "总应收未收：" +
            (totalShouldNotReceiptsMoney / 10000).toFixed(2) +
            "万",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            const { name, value } = params[0];
            const percent = total ? ((value / total) * 100).toFixed(2) : 0;
            return `${name}<br/>比率：${percent}%<br/>数值：${currency(value, {
              symbol: "",
              separator: ",",
            }).format()}<br/>`;
          },
        },
        xAxis: {
          type: "category",
          splitLine: { show: false },

          data: [
            "超30天内\n应收未收",
            "超30-60天\n应收未收",
            "超60-90天\n应收未收",
            "超90天\n应收未收",
          ],
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
            },
          },
        },
        series: [
          {
            name: "Access From",
            type: "bar",
            barWidth: "30",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
            data: [
              // { value: totalReceiptssMoney, name: "已收" },
              { value: receiptsMoney30Day / 10000, id: "receiptsMoney30Day" },
              {
                value: receiptsMoney30to60Day / 10000,
                id: "receiptsMoney30to60Day",
                itemStyle: {
                  color: "#6be6c1",
                },
              },
              {
                value: receiptsMoney60to90Day / 10000,
                id: "receiptsMoney60to90Day",
                itemStyle: {
                  color: "#626c91",
                },
              },
              {
                value: receiptsMoney90Day / 10000,
                id: "receiptsMoney90Day",
                itemStyle: {
                  color: "#a0a7e6",
                },
              },
            ],
            label: {
              show: true,
              position: "top",
              formatter: ({ value }) => {
                return currency(value, {
                  symbol: "",
                  separator: ",",
                }).format();
              },
            },
          },
        ],
        ...this.options,
      };

      this.chart = this.$echarts.init(this.$el, "walden");

      this.chart.setOption(option);

      this.chart.getZr().on("click", (event) => {
        // 点击空白处，触发
        if (!event.target) {
          this.$router.push({
            path: `/order/list?filter=${JSON.stringify([
              "totalShouldNotReceiptsMoney",
            ])}`,
          });
        }
      });

      // 柱状图点击事件
      this.chart.on("click", ({ data }) => {
        this.$router.push({
          path: `/order/list?filter=${JSON.stringify([data.id])}`,
        });
      });
    },
  },
};
</script>
