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
      getReach({ type: this.type }).then((res) => {
        const data = res.data.data;
        this.$nextTick(() => {
          this.initChart(data);
        });
      });
    },
    initChart(dataSource) {
      const { dateList, percentList } = dataSource;
      const option = {
        dataZoom: [
          {
            startValue: "2022-1",
            endValue: "2022-4"
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
        // aria: {
        //   enabled: true,
        //   decal: {
        //     show: true
        //   }
        // },
        title: {
          text: "达成率"
        },
        xAxis: {
          type: "category",
          data: dateList
        },
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
