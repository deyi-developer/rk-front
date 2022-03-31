<!-- 人天 -->
<template>
  <div ref="dom" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import resize from "./mixins/resize";
import { getReportCashOccupy } from "./api";
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
      getReportCashOccupy().then((res) => {
        const data = res.data.data;
        this.$nextTick(() => {
          this.initChart(data);
        });
      });
    },
    initChart(dataSource) {
      const { dateList, cashOccupyList } = dataSource;
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
          text: "逐月累积现金占用趋势"
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
            data: cashOccupyList,
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
