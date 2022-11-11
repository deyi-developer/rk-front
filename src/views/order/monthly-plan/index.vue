<!-- 月计划 -->
<template>
  <div class="wrap">
    <el-card class="space">
      <!-- header -->
      <div slot="header" class="header">
        <!-- 月份选择器 -->
        <el-date-picker
          v-model="duringMonth"
          type="month"
          placeholder="选择月份"
          @change="(res) => (duringMonth = res)"
          :clearable="false"
          :picker-options="pickerOptions"
        />

        <!-- 当前表格导出 -->
        <el-button
          @click="downloadFile"
          type="primary"
          icon="el-icon-download"
          size="small"
        >
          导出
        </el-button>
      </div>

      <!-- table -->
      <vxe-table
        ref="table1"
        show-footer
        height="500"
        :footer-method="footerMethod"
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
              :to="`/monthly/dept/${row.oneDeptId}?title=${row.oneDeptName}&duringMonth=${duringMonth}`"
              class="link-type"
            >
              <span>{{ row[item.prop] }}</span>
            </router-link>

            <!-- 默认值 -->
            <span
              v-else-if="
                item.prop === 'bilCompletionRate' ||
                item.prop === 'colleCompletionRate'
              "
              >{{ (row[item.prop]*100).toFixed(2) }}%</span
            >
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
import { getCurrentMonthApi, exportMonthlyPlanApi } from "./api";

// 图表
import ColumnChart from "./columnChart";

// 转换千元单位
import { thousandHandle } from "@utils";

// 常量
import { COLUMN_LIST } from "./constants";
export default {
  name: "Monthly-plan",
  components: {
    ColumnChart,
  },
  data() {
    return {
      columnist: COLUMN_LIST, // 表格项

      MonthList: [], // 当前选择月度列表
      loading: false, // 加载
      duringMonth: new Date(), // 当前选择月份
      pickerOptions: {
        // 时间选择器有效范围
        // disabledDate(time) {
        //   return time.getTime() > Date.now() - 8.64e6;
        // },
      },
    };
  },
  created() {
    this.getMonthPlanList();
  },
  methods: {
    // 获取当前月计划列表
    async getMonthPlanList() {
      this.loading = true;

      // 获取当前月度
      const {
        planDtoList = [],
      } = await getCurrentMonthApi({
        month: this.duringMonth.getMonth() + 1,
        year: this.duringMonth.getFullYear(),
      });

      // 当前月度列表
      this.MonthList = planDtoList;

      this.loading = false;
    },

    footerMethod({ data }){
      let planBillingMoney = 0;
      let billingThisMonth = 0;
      let planReceiptsMoney = 0;
      let receiptsThisMonth = 0;
      data.forEach((item) => {
        planBillingMoney += Number(item.planBillingMoney || 0)
        billingThisMonth += Number(item.billingThisMonth || 0)
        planReceiptsMoney += Number(item.planReceiptsMoney || 0)
        receiptsThisMonth += Number(item.receiptsThisMonth || 0)
      })
      const billingThisPlanBillingMonth = ((billingThisMonth/planBillingMoney || 0)*100).toFixed(2)
      const receiptsThisPlanReceiptsMoney = ((receiptsThisMonth/planReceiptsMoney || 0)*100).toFixed(2)
      return [
        [
          "总计",
          "-",
          thousandHandle(planBillingMoney),
          thousandHandle(billingThisMonth),
          `${billingThisPlanBillingMonth == Infinity ? 100 : billingThisPlanBillingMonth}%`,
          thousandHandle(planReceiptsMoney),
          thousandHandle(receiptsThisMonth),
          `${receiptsThisPlanReceiptsMoney == Infinity ? 100 : receiptsThisPlanReceiptsMoney}%`,
        ],
      ];
    },

    // 导出
    async downloadFile() {
      this.download(
        exportMonthlyPlanApi,
        {},
        `月计划列表_${new Date().getTime()}.xlsx`
      );
    },
  },
  watch: {
    // 监听时间变化，更新列表
    duringMonth() {
      this.getMonthPlanList();
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

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
