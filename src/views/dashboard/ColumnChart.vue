<template>
  <div class="demo"></div>
</template>
<script>
import resize from "./mixins/resize";
export default {
  mixins: [resize],

  data() {
    return {
      chart: null
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },

  methods: {
    initChart() {
      const config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
      };
      const labelOption = {
        show: true,
        position: config.position,
        distance: config.distance,
        align: config.align,
        verticalAlign: config.verticalAlign,
        rotate: config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {}
        }
      };
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Forest', 'Steppe', 'Desert', 'Wetland']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['2012', '2013', '2014', '2015', '2016']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Forest',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390]
          },
          {
            name: 'Steppe',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290]
          },
          {
            name: 'Desert',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190]
          },
          {
            name: 'Wetland',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [98, 77, 101, 99, 40]
          }
        ]
      };

      this.chart = this.$echarts.init(this.$el, "walden");

      this.chart.setOption(option);
    }
  }
}
</script>
<style lang="scss" scoped>
.demo {
  width: 100%;
  min-height: 400px;
}
</style>