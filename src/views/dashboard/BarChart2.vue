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
      getReportCash(params).then((res) => {
        const data = res.data.data;
        this.$nextTick(() => {
          this.initChart(data);
        });
      });
    },
    initChart(dataSource) {
      const {
        date,
        expenseCostList,
        expenseOutSourceList,
        expensePracticeList,
        grossProfitList,
        incomeList
      } = dataSource;
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
          text: "逐月累积现金占用趋势",
          subtext: "单位（元）"
        },
        legend: {},
        dataZoom: [
          {
            startValue: date[date.length - 12],
            endValue: date[date.length]
          },
          {
            type: "inside"
          }
        ],
        grid: {},
        xAxis: [
          {
            type: "category",
            data: date
          }
        ],
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
            name: "当月收入",
            type: "bar",
            data: incomeList
          },
          {
            name: "人天成本",
            type: "bar",
            stack: "Ad",

            data: expenseCostList
          },
          {
            name: "外协成本",
            type: "bar",
            stack: "Ad",

            data: expenseOutSourceList
          },
          {
            name: "实施费用",
            type: "bar",
            stack: "Ad",

            data: expensePracticeList
          },
          {
            name: "当月毛利额",
            type: "bar",
            data: grossProfitList
          }
        ]
      };
      this.chart = this.$echarts.init(this.$el, "walden");

      this.chart.setOption(option);
    }
  }
};
</script>
