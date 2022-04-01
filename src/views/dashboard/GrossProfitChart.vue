<template>
  <div>
    <div class="datepicker-wrap">
      <el-date-picker
        size="mini"
        v-model="red"
        type="year"
        placeholder="选择年"
        format="yyyy 年"
        value-format="yyyy"
        @change="changeHandle"
      >
      </el-date-picker>
      <span style="margin: 0 15px; color: #909399">vs</span>
      <el-date-picker
        size="mini"
        v-model="blue"
        type="year"
        placeholder="选择年"
        format="yyyy 年"
        value-format="yyyy"
        @change="changeHandle"
      >
      </el-date-picker>
    </div>

    <div
      ref="dom"
      style="margin-top: 10px"
      :class="className"
      :style="{ height: height, width: width }"
    />
  </div>
</template>

<script>
import resize from "./mixins/resize";
import { getMaori } from "./api";
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
      red: (new Date().getFullYear() - 1).toString(),
      blue: new Date().getFullYear().toString(),

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
    changeHandle(val) {
      if (this.red && this.blue) {
        this.fetchData();
      }
    },
    fetchData() {
      const redYear = this.red;
      const blueYear = this.blue;
      getMaori({ redLine: redYear, blueLine: blueYear }).then((res) => {
        const data = res.rows;
        this.$nextTick(() => {
          this.initChart(data);
        });
      });
    },
    initChart(dataSource) {
      const redYear = this.red;
      const blueYear = this.blue;
      const [red, blue] = dataSource;
      const option = {
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
          text: "毛利同比对照",
          subtext: "单位（%）"
        },
        legend: {},
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data + "%"
                      : "")
                  );
                }
              }
            },
            // prettier-ignore
            data:blue.date
          },
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data + "%"
                      : "")
                  );
                }
              }
            },
            // prettier-ignore
            data: red.date
          }
        ],
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}%"
          }
        },
        series: [
          {
            name: `毛利率-${blueYear}年`,
            type: "line",
            xAxisIndex: 1,
            smooth: true,
            emphasis: {
              focus: "series"
            },
            data: blue.data
          },
          {
            name: `毛利率-${redYear}年`,
            type: "line",
            smooth: true,
            emphasis: {
              focus: "series"
            },
            data: red.data
          }
        ]
      };
      this.chart = this.$echarts.init(this.$refs.dom, "walden");

      this.chart.setOption(option);
    }
  }
};
</script>
