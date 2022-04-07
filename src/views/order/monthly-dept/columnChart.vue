<template>
  <div class="demo"></div>
</template>
<script>
import resize from "@/views/dashboard/mixins/resize";
export default {
  mixins: [resize],

  props: {
    MonthList: Array
  },

  data() {
    return {
      chart: null
    }
  },

  methods: {
    initChart(projectNameAll, planBillingMoneyAll, billingThisMonthAll, planReceiptsMoneAll, receiptsThisMonthAll) {
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
        fontSize: 13,
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
          data: ['计划开票额', '实际开票额', '计划收款额', '实际收款额']
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
            axisLabel: { interval: 0 },
            data: projectNameAll
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '计划开票额',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: planBillingMoneyAll
          },
          {
            name: '实际开票额',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: billingThisMonthAll
          },
          {
            name: '计划收款额',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: planReceiptsMoneAll
          },
          {
            name: '实际收款额',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: receiptsThisMonthAll
          }
        ],
      };


      // 初始化
      this.chart = this.$echarts.init(this.$el, "walden");

      this.chart.setOption(option);
    }
  },
  watch: {
    MonthList(newVal) {
      const projectNameAll = []; // 行标签
      const planBillingMoneyAll = []; // 本月计划开票金额
      const billingThisMonthAll = []; // 本月实际开票金额
      const planReceiptsMoneAll = []; // 本月计划收款金额
      const receiptsThisMonthAll = []; // 本月实际收款金额

      for (const elem of newVal.values()) {
        const {
          projectName = "",
          planBillingMoney = 0,
          billingThisMonth = 0,
          planReceiptsMoney = 0,
          receiptsThisMonth = 0
        } = elem

        projectNameAll.push(projectName)
        planBillingMoneyAll.push(planBillingMoney)
        billingThisMonthAll.push(billingThisMonth)
        planReceiptsMoneAll.push(planReceiptsMoney)
        receiptsThisMonthAll.push(receiptsThisMonth)
      }

      console.log(projectNameAll)
      console.log(planBillingMoneyAll)
      console.log(billingThisMonthAll)
      console.log(planReceiptsMoneAll)
      console.log(receiptsThisMonthAll)

      this.initChart(projectNameAll, planBillingMoneyAll, billingThisMonthAll, planReceiptsMoneAll, receiptsThisMonthAll)
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