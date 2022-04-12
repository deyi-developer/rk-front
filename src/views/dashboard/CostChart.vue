<!-- 人天 -->
<template>
  <div ref="dom" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import resize from "./mixins/resize";
import { getReportCost } from "./api";
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
      default: "340px"
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
    changeHandle() {
      this.fetchData();
    },
    fetchData() {
      const params = {
        projectCode: this.projectCode,
        oneDeptId: this.oneDeptId
      };
      getReportCost(params).then((res) => {
        const data = res.data.data;
        this.$nextTick(() => {
          this.initChart(data);
        });
      });
    },
    initChart(dataSource) {
      if (this.chart) {
        this.chart.dispose();
      }
      const { dateList, avgAmountList, avgUnitPriceList } = dataSource;
      const option = {
        legend: {
          top: "25"
        },
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
          },
          formatter: function (params) {
            let tip = "";
            let { axisValue, value } = params[0];
            let { value: value2 } = params[1];
            tip += axisValue;
            params.forEach((item) => {
              const { marker, seriesName, value } = item;
              const val = currency(value, {
                symbol: "",
                separator: ","
              }).format();
              tip += "<br/>" + marker + seriesName + "   " + val;
            });

            const percent = ((value / value2) * 100).toFixed(2) + "%";
            tip = tip + "<br/>" + "比率：" + percent;
            return tip;
          }
        },
        aria: {
          enabled: true,
          decal: {
            show: true
          }
        },
        title: {
          text: "逐月平均人天结算单价和平均人天成本",
          subtext: "单位（元）"
        },
        xAxis: {
          type: "category",
          data: dateList
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "当月平均人天成本",
            data: avgAmountList,
            type: "line",
            smooth: true
          },
          {
            name: "当月平均人天结算单价",
            data: avgUnitPriceList,
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
