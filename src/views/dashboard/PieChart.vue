<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import resize from "./mixins/resize";

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
    this.$nextTick(() => {
      this.initChart();
    });
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
      const option = {
        aria: {
          enabled: true,
          decal: {
            show: true
          }
        },
        title: {
          text: "Referer of a Website",
          subtext: "Fake Data"
        },
        tooltip: {
          trigger: "item"
        },
        // legend: {
        //   bottom: "0",
        //   left: "center"
        // },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",

            data: [
              { value: 1048, name: "已开" },
              { value: 735, name: "超90天应开未开" },
              { value: 580, name: "超60-90天应开未开" },
              { value: 484, name: "超30-60天应开未开" },
              { value: 300, name: "超30天应开未开" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.chart = this.$echarts.init(this.$el, "walden");

      this.chart.setOption(option);
    }
  }
};
</script>
