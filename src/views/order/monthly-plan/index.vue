<!-- 当月计划 -->
<template>
  <div class="wrap">
    <el-card class="space">
      <!-- title -->
      <div slot="header" class="clearfix">
        <span>当月计划</span>
      </div>

      <!-- table -->
      <vxe-table
        ref="table1"
        show-footer
        height="500"
        :footer-method="getSummaries"
        v-loading="loading"
        :data="MonthList"
        style="width: 100%"
      >
        <vxe-column
          v-for="(item, index) in columnist"
          :key="index"
          :prop="item.prop"
          :title="item.label"
          :min-width="item.minWidth"
        >
          <!-- 如果为行标签，自定义行 -->
          <template #default="{ row }">
            <router-link
              v-if="item.prop === 'oneDeptName'"
              :to="`/monthly/dept/${row.oneDeptId}?title=${row.oneDeptName}`"
              class="link-type"
            >
              <span>{{ row[item.prop] }}</span>
            </router-link>

            <span v-else>{{ row[item.prop] | currency }}</span>
          </template>
        </vxe-column>
      </vxe-table>
    </el-card>

    <!-- 图表 -->
    <el-card>
      <column-chart :MonthList="MonthList" />
    </el-card>
  </div>
</template>
<script>
import { getCurrentMonth } from "./api";
import ColumnChart from "./columnChart";
import currency from "currency.js";
export default {
  name: "Monthly-plan",
  components: {
    ColumnChart,
  },

  data() {
    return {
      columnist: [
        {
          prop: "oneDeptName",
          label: "行标签",
          minWidth: "180",
        },
        {
          prop: "planBillingMoney",
          label: "本月计划开票金额",
          minWidth: "180",
        },
        {
          prop: "billingThisMonth",
          label: "本月实际开票金额",
          minWidth: "180",
        },
        {
          prop: "planReceiptsMoney",
          label: "本月计划收款金额",
          minWidth: "180",
        },
        {
          prop: "receiptsThisMonth",
          label: "本月实际收款金额",
          minWidth: "180",
        },
      ],
      // 合计
      currentMonthList: {},
      // 当前月度列表
      MonthList: [],
      // 加载
      loading: false,
    };
  },
  async created() {
    this.loading = true;

    // 获取当前月度
    const {
      planDtoList = [],
      totalBillThisMonth: billingThisMonth, // 本月实际开票总额
      totalPlanBilling: planBillingMoney, //本月计划开票总额
      totalPlanReceipts: planReceiptsMoney, // 本月计划收款总额
      totalReceiptsThisMonth: receiptsThisMonth, // 本月实际收款总额
    } = await getCurrentMonth();

    // 当前月度列表
    this.MonthList = planDtoList;

    // 有总计项的当前月度列表
    this.currentMonthList = [
      "总计",
      this.currency(planBillingMoney),
      this.currency(billingThisMonth),
      this.currency(planReceiptsMoney),
      this.currency(receiptsThisMonth),
    ];

    this.loading = false;
  },
  methods: {
    // 合计
    getSummaries() {
      console.log(this.currentMonthList)
      return [this.currentMonthList];
    },
    // 格式化金额
    currency(value) {
      return currency(value, { symbol: "", separator: "," }).format();
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  background: #f0f2f5;
  padding: 20px;
  .space {
    margin-bottom: 12px;
  }
}
</style>
