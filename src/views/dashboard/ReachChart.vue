<!-- 达成率 -->
<template>
  <div>
    <div class="datepicker-wrap">
      <el-select
        size="mini"
        v-model="type"
        placeholder="请选择"
        @change="changeHandle"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
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
import { getReach } from "./api";
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
      type: 2,
      options: [
        { label: "工单完工达成率", value: 1 },
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
        type: this.type,
        projectCode: this.projectCode,
        oneDeptId: this.oneDeptId
      };
      getReach(params).then((res) => {
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
      const { dateList, percentList } = dataSource;
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
        // aria: {
        //   enabled: true,
        //   decal: {
        //     show: true
        //   }
        // },
        title: {
          text: "达成率",
          subtext: "单位（%）"
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
            data: percentList,
            type: "line",
            smooth: true,
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(63,177,227,0.8)"
                },
                {
                  offset: 1,
                  color: "rgba(63,177,227,0.1)"
                }
              ])
            }
          }
        ]
      };
      this.chart = this.$echarts.init(this.$refs.dom, "walden");

      this.chart.setOption(option);
    }
  }
};
</script>
