<!-- 部门计划明细 -->
<template>
  <div class="wrap">
    <el-card class="space">
      <!-- title -->
      <div slot="header" class="clearfix2">
        <div>
          <selectAll v-if="!checkRole(['pm', 'boss'])" />

          <!-- 月份选择器 -->
          <el-date-picker
            v-model="duringMonth"
            type="month"
            placeholder="选择月份"
            @change="(res) => (duringMonth = res)"
            :clearable="false"
            :picker-options="pickerOptions"
          />
        </div>
        <div>
          <!-- clear filter -->
          <el-button plain size="small" @click="clearFilter"
            >重置筛选</el-button
          >

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
      </div>

      <!-- table -->
      <vxe-table
        show-footer
        align="center"
        :footer-method="footerMethod"
        ref="filterTable"
        v-loading="loading"
        auto-resize
        height="80%"
        :data="MonthList"
        :filter-config="{ remote: true }"
        @filter-change="filterHandler"
      >
        <vxe-column
          v-for="(item, index) in columnist"
          :key="index"
          :prop="item.prop"
          :title="item.label"
          :min-width="item.minWidth"
          :type="item.type || ''"
          :filters="item.filters"
          :field="item.prop"
          :fixed="item.fixed"
          :filter-multiple="
            (item.prop === 'projectCode' || item.prop === 'projectName') && true
          "
        >
          <!-- 筛选 -->
          <template
            v-if="item.prop === 'projectCode' || item.prop === 'projectName'"
            #filter="{ $panel, column }"
          >
            <input
              class="filter-input"
              type="type"
              v-for="(option, index) in column.filters"
              :key="index"
              v-model="option.value"
              @input="$panel.changeOption($event, !!option.value, option)"
              @keyup.enter="$panel.confirmFilter()"
              :placeholder="inputPlaceholder[item.prop]"
            />
          </template>

          <!-- 自定义项内容-->
          <template #default="{ row, rowIndex }">
            <!-- 序号 -->
            <span v-if="item.prop === 'serialNumber'">{{ rowIndex + 1 }}</span>

            <!-- 项目名称 -->
            <el-tooltip
              v-else-if="item.prop === 'projectName'"
              effect="dark"
              :content="row[item.prop]"
            >
              <span class="overflowHiding">{{ row[item.prop] }}</span>
            </el-tooltip>

            <!-- 项目编码 -->
            <router-link
              v-else-if="item.prop === 'projectCode'"
              :to="`/order/details/${rowIndex}?projectCode=${row.projectCode}`"
              class="link-type"
            >
              <span>{{ row[item.prop] }}</span>
            </router-link>

            <!-- 开票完成率 -->
            <span v-else-if="item.prop === 'compleBillingThisMonth'">
              {{ row.compleBillingThisMonth + "%" }}
            </span>

            <!-- 开票备注 -->
            <el-tooltip
              v-else-if="item.prop === 'billRemark'"
              effect="dark"
              :content="row[item.prop]"
            >
              <span class="overflowHiding">{{ row[item.prop] }}</span>
            </el-tooltip>

            <!-- 收款完成率 -->
            <span v-else-if="item.prop === 'compleReceiptsThisMonth'">
              {{ row.compleReceiptsThisMonth + "%" }}
            </span>

            <!-- 收款备注 -->
            <el-tooltip
              v-else-if="item.prop === 'receiptRemark'"
              effect="dark"
              :content="row[item.prop]"
            >
              <span class="overflowHiding">{{ row[item.prop] }}</span>
            </el-tooltip>
            <span v-else>{{ row[item.prop] | currency }}</span>
          </template>
        </vxe-column>
      </vxe-table>
    </el-card>
  </div>
</template>
<script>
// 接口
import { getCurrentMonthApi, exportDeptMonthlyPlanApi } from "./api";

// 常量
import { COLUMN_LIST, INPUT_PLACEHOLDER, FILTER_CONDITIONS } from "./constants";

// 转换千元单位
import { thousandHandle } from "@utils";
import selectAll from "./selectAll.vue";
import { checkRole } from "@/utils/permission";
export default {
  name: "MonthlyDept",
  components: {
    selectAll
  },
  data() {
    return {
      columnist: COLUMN_LIST, // tableColum
      inputPlaceholder: INPUT_PLACEHOLDER, // 筛选提示文案

      duringMonth: new Date(), // 当前选择月份
      MonthList: [], // 当前月度列表
      loading: false, // 加载
      filterConditions: FILTER_CONDITIONS(), // 筛选条件
      id: this.$route.params.id, // 当月
      pickerOptions: {
        // 时间选择器有效范围
        // disabledDate(time) {
        //   return time.getTime() > Date.now() - 8.64e6;
        // }
      }
    };
  },
  created() {
    const { duringMonth, title } = this.$route.query;
    // 动态设置tab拦
    this.$tab.updatePage(
      Object.assign({}, this.$route, {
        title: `${title || ""}计划明细`
      })
    );

    if (duringMonth) {
      this.duringMonth = new Date(duringMonth);
    }

    // 获取事业部计划明细列表
    this.getCurrentMonthInfo();
  },
  methods: {
    checkRole,
    // 获取部门明细信息
    async getCurrentMonthInfo() {
      this.loading = true;

      // 获取当前月度
      const { deptPlanDtoList = [] } = await getCurrentMonthApi({
        oneDeptId: this.id,
        month: this.duringMonth.getMonth() + 1,
        year: this.duringMonth.getFullYear(),
        ...this.filterConditions
      });

      // 当前月度列表
      this.MonthList = deptPlanDtoList;

      this.loading = false;
    },

    footerMethod({ data }) {
      let planBillingMoney = 0;
      let billingThisMonth = 0;
      let planReceiptsMoney = 0;
      let receiptsThisMonth = 0;
      let totalShouldNotBillingMoney = 0;
      let totalShouldNotReceiptsMoney = 0;
      data.forEach((item) => {
        planBillingMoney += Number(item.planBillingMoney || 0);
        billingThisMonth += Number(item.billingThisMonth || 0);
        planReceiptsMoney += Number(item.planReceiptsMoney || 0);
        receiptsThisMonth += Number(item.receiptsThisMonth || 0);
        totalShouldNotBillingMoney += Number(item.totalShouldNotBillingMoney || 0)
        totalShouldNotReceiptsMoney += Number(item.totalShouldNotReceiptsMoney || 0)
      });
      const billingThisPlanBillingMonth = (
        (billingThisMonth / planBillingMoney || 0) * 100
      ).toFixed(2);
      const receiptsThisPlanReceiptsMoney = (
        (receiptsThisMonth / planReceiptsMoney || 0) * 100
      ).toFixed(2);
      return [
        [
          "总计",
          "-",
          "-",
          thousandHandle(totalShouldNotBillingMoney),
          thousandHandle(planBillingMoney),
          thousandHandle(billingThisMonth),
          `${
            billingThisPlanBillingMonth == Infinity
              ? 100
              : billingThisPlanBillingMonth
          }%`,
          "-",
          thousandHandle(totalShouldNotReceiptsMoney),
          thousandHandle(planReceiptsMoney),
          thousandHandle(receiptsThisMonth),
          `${
            receiptsThisPlanReceiptsMoney == Infinity
              ? 100
              : receiptsThisPlanReceiptsMoney
          }%`,
          "-"
        ]
      ];
    },

    setId(id) {
      this.id = id;
    },

    // 数据过滤
    filterHandler({ property, values, datas }) {
      let val = datas[0];
      if (values[0] == 0 || values[0]) {
        val = values[0];
      }
      if (val !== null || val !== undefined || val !== "") {
        this.filterConditions[property] = val;
      } else {
        this.filterConditions[property] = null;
      }
      this.getCurrentMonthInfo();
    },

    // 导出
    async downloadFile() {
      // 获取当前月度
      this.download(
        exportDeptMonthlyPlanApi,
        {
          oneDeptId: this.id,
          month: this.duringMonth.getMonth() + 1,
          year: this.duringMonth.getFullYear(),
          ...this.filterConditions
        },
        `${
          this.$route.query.title || ""
        }计划明细列表_${new Date().getTime()}.xlsx`
      );
    },

    // 清除所有过滤器
    clearFilter() {
      this.$refs.filterTable.clearFilter();

      this.filterConditions = FILTER_CONDITIONS();

      this.getCurrentMonthInfo();
    }
  },
  watch: {
    // 监听时间变化，更新列表
    duringMonth() {
      this.getCurrentMonthInfo();
    },
    id() {
      this.getCurrentMonthInfo();
    }
  }
};
</script>
<style lang="scss" scoped>
.filter-input {
  margin: 5px;
}
.search-entryCode-icon:hover {
  cursor: pointer;
  color: #429eff;
}
.filterHandleStyle {
  border-top: 1px solid #ebeef5;
  padding: 8px;
  .span {
    background: transparent;
    border: none;
    color: #606266;
    cursor: pointer;
    font-size: 13px;
    padding: 0 3px;
  }
}
.wrap {
  padding: 20px;
  height: calc(100vh - 84px);
  background: #f0f2f5;
  font-family: sans-serif, PingFangSC-Regular;
  .clearfix2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  span {
    font-family: sans-serif, PingFangSC-Regular;
  }
  .space {
    margin-bottom: 12px;
    height: calc(100vh - 120px);
    ::v-deep .el-card__body {
      height: calc(100vh - 100px);
    }
  }

  /* 表单头样式 */
  .table-header {
    .table-header-item-icon {
      margin-left: 5px;
      cursor: pointer;
    }

    .popover-class {
      margin-left: 5px;
    }

    .el-table-filter__bottom {
      margin-top: 8px;
    }

    /* 搜索框 */
    .search-entryCode {
      margin: 10px;
    }
  }

  /* 移除隐藏 */
  .overflowHiding {
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    cursor: default;
  }

  /* 筛选框 */
  .search {
    margin-bottom: 20px;
    .el-input {
      width: 250px;
    }

    /* 筛选按钮 */
    .search-button {
      margin-left: 20px;
      border-radius: 3px;
    }
  }
}
</style>
