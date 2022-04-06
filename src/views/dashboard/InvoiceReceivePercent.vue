<!-- 人天 -->
<template>
  <div ref="dom" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import resize from "./mixins/resize";
import { getInvoiceReceivePercent } from "./api";
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
  watch: {
    oneDeptId() {
      this.fetchData();
    }
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
      getInvoiceReceivePercent(this.projectCode).then((res) => {
        const data = res.data.data;
        this.$nextTick(() => {
          this.initChart(data);
        });
      });
    },
    initChart(dataSource) {
      const {
        dateList,
        invoicePjtdList,
        invoiceShouldInvoiceList,
        receivePjtdList,
        receiveShouldInvoiceList,
        receiveInvoiceList,
        receiveShouldReceiveList
      } = dataSource;
      const option = {
        legend: {},
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
          text: "开票收款率",
          subtext: "单位（%）"
        },
        xAxis: {
          type: "category",
          data: dateList
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: function (value, index) {
              return value + "%";
            }
          }
        },
        series: [
          {
            name: "实际开票相对总收入",
            data: invoicePjtdList,
            type: "line",
            smooth: true
          },
          {
            name: "实际开票相对应开",
            data: invoiceShouldInvoiceList,
            type: "line",
            smooth: true
          },
          {
            name: "总已收金额相对收入",
            data: receivePjtdList,
            type: "line",
            smooth: true
          },
          {
            name: "总已收金额相对应开",
            data: receiveShouldInvoiceList,
            type: "line",
            smooth: true
          },
          {
            name: "总已收金额相对已开",
            data: receiveInvoiceList,
            type: "line",
            smooth: true
          },
          {
            name: "总已收金额相对应收",
            data: receiveShouldReceiveList,
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