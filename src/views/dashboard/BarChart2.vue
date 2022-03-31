<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import resize from "./mixins/resize";
import { getReportCash } from "./api";
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
    fetchData() {
      getReportCash().then((res) => {
        const data = res.rows;
        this.$nextTick(() => {
          this.initChart(data);
        });
      });
    },
    initChart(dataSource) {
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
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
        legend: {},
        dataZoom: [
          {
            startValue: "2022-1",
            endValue: "2022-4"
          },
          {
            type: "inside"
          }
        ],
        grid: {},
        xAxis: [
          {
            type: "category",
            data: ["2022-1", "2022-2", "2022-3", "2022-4", "2022-5", "2022-6"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "当月收入",
            type: "bar",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "人天成本",
            type: "bar",
            stack: "Ad",

            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "外协成本",
            type: "bar",
            stack: "Ad",

            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "实施费用",
            type: "bar",
            stack: "Ad",

            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "当月毛利额",
            type: "bar",
            data: [862, 1018, 964, 1026, 1679, 1600, 1570]
          }
        ]
      };
      this.chart = this.$echarts.init(this.$el, "walden");

      this.chart.setOption(option);
    }
  }
};
</script>
