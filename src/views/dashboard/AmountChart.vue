<!-- 人天 -->
<template>
  <div ref="dom" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import resize from "./mixins/resize";
import { getReportAmount } from "./api";
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
      default: "400px"
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
      getReportAmount().then((res) => {
        const data = res.data.data;
        this.$nextTick(() => {
          this.initChart(data);
        });
      });
    },
    initChart(dataSource) {
      const { dateList, incomeList, invoiceList, receiveList } = dataSource;
      const option = {
        legend: {},
        dataZoom: [
          {
            startValue: dateList[dateList.length - 12],
            endValue: dateList[dateList.length]
          },
          {
            type: "inside"
          }
        ],
        tooltip: {
          trigger: "axis",
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
          text: "逐月含税收入，开票，收款分布",
          subtext: "单位（元）"
        },
        xAxis: {
          type: "category",
          data: dateList
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
            name: "含税收入",
            data: incomeList,
            type: "line",
            smooth: true
          },
          {
            name: "开票",
            data: invoiceList,
            type: "line",
            smooth: true
          },
          {
            name: "收款",
            data: receiveList,
            type: "line",
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
