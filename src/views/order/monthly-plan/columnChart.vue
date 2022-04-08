<template>
  <div class="demo"></div>
</template>
<script>
import resize from "@/views/dashboard/mixins/resize";
export default {
  mixins: [resize],

  props: {
    MonthList: Array,
  },

  data() {
    return {
      chart: null,
    };
  },

  methods: {
    initChart(
      oneDeptNameAll,
      planBillingMoneyAll,
      billingThisMonthAll,
      planReceiptsMoneAll,
      receiptsThisMonthAll
    ) {
      const config = {
        rotate: 90,
        align: "left",
        verticalAlign: "middle",
        position: "insideBottom",
        distance: 15,
      };
      const labelOption = {
        show: true,
        position: config.position,
        distance: config.distance,
        align: config.align,
        verticalAlign: config.verticalAlign,
        rotate: config.rotate,
        formatter: "{c}  {name|{a}}",
        fontSize: 13,
        color: "#000",
        rich: {
          name: {},
        },
      };
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["计划开票额", "实际开票额", "计划收款额", "实际收款额"],
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            axisLabel: { interval: 0 },
            data: oneDeptNameAll,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "计划开票额",
            type: "bar",
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: planBillingMoneyAll,
          },
          {
            name: "实际开票额",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: billingThisMonthAll,
          },
          {
            name: "计划收款额",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: planReceiptsMoneAll,
          },
          {
            name: "实际收款额",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: receiptsThisMonthAll,
          },
        ],
        dataZoom: [
          //1.横向使用滚动条
          {
            type: "slider", //有单独的滑动条，用户在滑动条上进行缩放或漫游。inside是直接可以是在内部拖动显示
            show: true, //是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。
            start: 0, //数据窗口范围的起始百分比0-100
            end: 50, //数据窗口范围的结束百分比0-100
            xAxisIndex: [0], // 此处表示控制第一个xAxis，设置 dataZoom-slider 组件控制的 x轴 可是已数组[0,2]表示控制第一，三个；xAxisIndex: 2 ，表示控制第二个。yAxisIndex属性同理
            bottom: -10, //距离底部的距离
          },
          //2.在内部可以横向拖动
          {
            type: "inside", // 内置于坐标系中
            start: 0,
            end: 30,
            xAxisIndex: [0],
          },
        ],
      };

      // 初始化
      this.chart = this.$echarts.init(this.$el, "walden");

      this.chart.setOption(option);
    },
  },
  watch: {
    MonthList(newVal) {
      const oneDeptNameAll = []; // 行标签
      const planBillingMoneyAll = []; // 本月计划开票金额
      const billingThisMonthAll = []; // 本月实际开票金额
      const planReceiptsMoneAll = []; // 本月计划收款金额
      const receiptsThisMonthAll = []; // 本月实际收款金额

      for (const elem of newVal.values()) {
        const {
          oneDeptName = "",
          planBillingMoney = 0,
          billingThisMonth = 0,
          planReceiptsMoney = 0,
          receiptsThisMonth = 0,
        } = elem;

        oneDeptNameAll.push(oneDeptName);
        planBillingMoneyAll.push(planBillingMoney);
        billingThisMonthAll.push(billingThisMonth);
        planReceiptsMoneAll.push(planReceiptsMoney);
        receiptsThisMonthAll.push(receiptsThisMonth);
      }

      this.initChart(
        oneDeptNameAll,
        planBillingMoneyAll,
        billingThisMonthAll,
        planReceiptsMoneAll,
        receiptsThisMonthAll
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.demo {
  width: 100%;
  min-height: 400px;
}
</style>
