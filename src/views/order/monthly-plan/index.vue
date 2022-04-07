<!-- 当月计划 -->
<template>
  <div class="wrap">
    <el-card class="space">
      <!-- title -->
      <div slot="header" class="clearfix">
        <span>当月计划</span>
      </div>

      <!-- table -->
      <el-table
        border
        height="500"
        v-loading="loading"
        :data="currentMonthList"
        style="width: 100%"
      >
        <el-table-column
          v-for="(item, index) in columnist"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        >
          <!-- 如果为行标签，自定义行 -->
          <template slot-scope="{ row, $index, column }">
            <router-link
              v-if="item.prop === 'oneDeptName' && currentMonthList.length !== $index + 1"
              :to="`/monthly/dept/${row.oneDeptId}`"
              class="link-type"
            >
              <span>{{ row[item.prop] }}</span>
            </router-link>

            <span v-else-if="item.prop === 'oneDeptName'">{{ row[item.prop] }}</span>

            <span v-else>{{ row[item.prop] | currency }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 图表 -->
    <el-card>
      <column-chart :MonthList="MonthList" />
    </el-card>
  </div>
</template>
<script>
import { getCurrentMonth } from './api';
import ColumnChart from "./columnChart";
export default {
  name: "Monthly-plan",
  components: {
    ColumnChart
  },

  data() {
    return {
      columnist: [
        {
          prop: "oneDeptName",
          label: "行标签",
          width: "180"
        },
        {
          prop: "planBillingMoney",
          label: "求和项: 本月计划开票金额",
          width: "180"
        },
        {
          prop: "billingThisMonth",
          label: "求和项: 本月实际开票金额",
          width: "180"
        },
        {
          prop: "planReceiptsMoney",
          label: "求和项: 本月计划收款金额",
          width: "180"
        },
        {
          prop: "receiptsThisMonth",
          label: "求和项: 本月实际收款金额",
          width: "180"
        }
      ],
      // 当前月度列表+合计
      currentMonthList: [],
      // 当前月度列表
      MonthList: [],
      // 加载
      loading: false
    };
  },
  async created() {
    this.loading = true

    // 获取当前月度
    const {
      planDtoList = [],
      totalBillThisMonth: billingThisMonth, // 本月实际开票总额
      totalPlanBilling: planBillingMoney, //本月计划开票总额
      totalPlanReceipts: planReceiptsMoney, // 本月计划收款总额
      totalReceiptsThisMonth: receiptsThisMonth // 本月实际收款总额
    } = await getCurrentMonth()

    // 当前月度列表
    this.MonthList = planDtoList

    // 有总计项的当前月度列表
    this.currentMonthList = [...planDtoList, {
      oneDeptName: '总计',
      planBillingMoney,
      billingThisMonth,
      planReceiptsMoney,
      receiptsThisMonth
    }]

    this.loading = false
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
