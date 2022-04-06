<template>
  <div>
    <!-- <div class="datepicker-wrap">
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
    </div> -->

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
  watch: {
    oneDeptId() {
      this.fetchData();
    }
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
      const params = {
        // redLine: redYear,
        // blueLine: blueYear,
        projectCode: this.projectCode,
        oneDeptId: this.oneDeptId
      };
      getMaori(params).then((res) => {
        const data = res.data;
        this.$nextTick(() => {
          this.initChart(data);
        });
      });
    },
    initChart(dataSource) {
      // const redYear = this.red;
      // const blueYear = this.blue;
      const { dateList, dataList } = dataSource;
      const option = {
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
            data: dateList
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
            name: `毛利率`,
            type: "line",
            smooth: true,
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(63,177,227,0.7)"
                },
                {
                  offset: 1,
                  color: "rgba(63,177,227,0.1)"
                }
              ])
            },
            data: dataList
          }
        ]
      };
      this.chart = this.$echarts.init(this.$refs.dom, "walden");

      this.chart.setOption(option);
    }
  }
};
</script>
