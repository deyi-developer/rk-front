<!-- 当月计划 -->
<template>
  <div class="wrap">
    <el-card class="space">
      <!-- title -->
      <div slot="header" class="clearfix">
        <span>当月计划</span>
        <el-button
          style="float: right;"
          type="primary"
          size="mini"
          icon="el-icon-download"
          @click="handleExport('monthPlan')"
        >
          导出
        </el-button>
      </div>

      <!-- table -->
      <vxe-table
        ref="table1"
        show-footer
        height="500"
        :footer-method="() => this.currentMonthList"
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
          :align="item.align"
        >
          <template #default="{ row, rowIndex }">
            <!-- 序号 -->
            <span v-if="item.prop === 'serialNumber'">{{ rowIndex + 1 }}</span>

            <!-- 部门名称 -->
            <router-link
              v-else-if="item.prop === 'oneDeptName'"
              :to="`/monthly/dept/${row.oneDeptId}?title=${row.oneDeptName}`"
              class="link-type"
            >
              <span>{{ row[item.prop] }}</span>
            </router-link>

            <!-- 默认值 -->
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
// 接口
import { getCurrentMonth } from "./api";

// 图表
import ColumnChart from "./columnChart";

// 转换千元单位
import { thousandHandle } from "@utils";

// 常量
import { COLUMN_LIST } from "./constants";

// 导出
import { exportMixins } from "@/mixins/export";
export default {
  name: "Monthly-plan",
  mixins: [exportMixins],
  components: {
    ColumnChart,
  },
  data() {
    return {
      columnist: COLUMN_LIST, // 表格项

      MonthList: [], // 当前月度列表
      currentMonthList: [], // 合计
      loading: false, // 加载
    };
  },
  created() {
    this.getMonthPlanList();
  },
  methods: {
    // 获取当月计划列表
    async getMonthPlanList() {
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
        [
          "总计",
          "-",
          thousandHandle(planBillingMoney),
          thousandHandle(billingThisMonth),
          thousandHandle(planReceiptsMoney),
          thousandHandle(receiptsThisMonth),
        ],
      ];

      this.loading = false;
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
