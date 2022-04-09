<!-- 当月计划 -->
<template>
  <div class="wrap">
    <el-card class="space">
      <!-- title -->
      <div slot="header" class="clearfix2">
        <span>{{ this.$route.query.title }}计划明细</span>
        <el-button @click="clearFilter" type="primary" size="small"
          >清除所有过滤器</el-button
        >
      </div>

      <!-- table -->
      <vxe-table
        show-footer
        :footer-method="getSummaries"
        ref="filterTable"
        v-loading="loading"
        height="600"
        :data="MonthList"
      >
        <vxe-column
          v-for="(item, index) in columnist"
          :key="index"
          :prop="item.prop"
          :title="item.label"
          :min-width="item.minWidth"
          :type="item.type || ''"
          :filters="item.filters"
          :filter-method="filterHandler"
          :filter-multiple="
            item.prop === 'projectCode' || (item.prop === 'projectName' && true)
          "
        >
          <template
            v-if="item.prop === 'projectCode' || item.prop === 'projectName'"
            #filter="{ $panel, column }"
          >
            <input
              class="filter-input"
              type="type"
              v-for="(option, index) in column.filters"
              :key="index"
              v-model="option.data"
              @input="$panel.changeOption($event, !!option.data, option)"
              @keyup.enter="$panel.confirmFilter()"
              :placeholder="
                item.prop === 'projectCode'
                  ? '输入完整编码'
                  : '请输入完整项目名称'
              "
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

            <!-- 收款完成率 -->
            <span v-else-if="item.prop === 'compleReceiptsThisMonth'">
              {{ row.compleReceiptsThisMonth + "%" }}
            </span>

            <span v-else>{{ row[item.prop] | currency }}</span>
          </template>
        </vxe-column>
      </vxe-table>
    </el-card>

    <!-- 图表 -->
    <!-- <el-card>
      <column-chart :MonthList="MonthList" />
    </el-card> -->
  </div>
</template>
<script>
import { getCurrentMonth } from "./api";
import ColumnChart from "./columnChart";
import currency from "currency.js";
export default {
  name: "MonthlyDept",
  components: {
    ColumnChart,
  },

  data() {
    return {
      columnist: [
        {
          prop: "serialNumber",
          label: "序号",
          minWidth: 50,
        },
        {
          prop: "projectCode",
          label: "得逸项目编码",
          filters: [{ value: "projectCode", data: "" }],
          minWidth: "200",
        },
        {
          prop: "projectName",
          label: "得逸项目名称",
          filters: [{ value: "projectName", data: "" }],
          minWidth: "180",
        },
        {
          prop: "planBillingMoney",
          label: "本月计划开票金额",
          filters: [{ label: "隐藏无效数据", value: "planBillingMoney" }],
          minWidth: "160",
        },
        {
          prop: "billingThisMonth",
          label: "本月实际开票金额",
          filters: [{ label: "隐藏无效数据", value: "billingThisMonth" }],
          minWidth: "160",
        },
        {
          prop: "planReceiptsMoney",
          label: "本月计划收款金额",
          filters: [{ label: "隐藏无效数据", value: "planReceiptsMoney" }],
          minWidth: "160",
        },
        {
          prop: "receiptsThisMonth",
          label: "本月实际收款金额",
          filters: [{ label: "隐藏无效数据", value: "receiptsThisMonth" }],
          minWidth: "160",
        },
        {
          prop: "compleBillingThisMonth",
          label: "开票完成率",
          filters: [{ label: "隐藏无效数据", value: "compleBillingThisMonth" }],
          minWidth: "110",
        },
        {
          prop: "compleReceiptsThisMonth",
          label: "收款完成率",
          filters: [
            { label: "隐藏无效数据", value: "compleReceiptsThisMonth" },
          ],
          minWidth: "110",
        },
      ],
      // 当前月度列表+合计
      currentMonthList: [],
      // 当前月度列表
      MonthList: [],
      // 加载
      loading: false,
      entryCode: "", // 项目编码
      projectName: "", // 项目名称
    };
  },
  created() {
    const obj = Object.assign({}, this.$route, {
      title: `${this.$route.query.title}计划明细`,
    });
    this.$tab.updatePage(obj);
    this.getCurrentMonthInfo();
  },
  methods: {
    getSummaries() {
      return [this.currentMonthList];
    },
    currency(value) {
      return currency(value, { symbol: "", separator: "," }).format();
    },
    // 获取部门明细信息
    async getCurrentMonthInfo() {
      this.loading = true;

      // 获取当前月度
      const {
        planDtoList = [],
        totalBillThisMonth: billingThisMonth, // 本月实际开票总额
        totalPlanBilling: planBillingMoney, //本月计划开票总额
        totalPlanReceipts: planReceiptsMoney, // 本月计划收款总额
        totalReceiptsThisMonth: receiptsThisMonth, // 本月实际收款总额
      } = await getCurrentMonth(
        this.$route.params.id,
        this.entryCode,
        this.projectName
      );

      // 当前月度列表
      this.MonthList = planDtoList;

      // 有总计项的当前月度列表
      this.currentMonthList = [
        "总计",
        "-",
        "-",
        this.currency(planBillingMoney),
        this.currency(billingThisMonth),
        this.currency(planReceiptsMoney),
        this.currency(receiptsThisMonth),
        "-",
        "-",
      ];

      this.loading = false;
    },

    // 数据过滤
    filterHandler({ option: { data }, row, value }) {
      const validData = row[value];

      if(value === 'projectCode' || value === 'projectName') {
        if(validData.includes(data)) return row
      } else {
        if (validData && validData != "0.00") return row;
      }
    },

    // 清除所有过滤器
    clearFilter() {
      this.$refs.filterTable.clearFilter();
      this.entryCode = "";
      this.projectName = "";
      this.getCurrentMonthInfo();
    },
  },
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
  background: #f0f2f5;
  font-family: sans-serif, PingFangSC-Regular;
  .clearfix2 {
    display: flex;
    justify-content: space-between;
  }
  span {
    font-family: sans-serif, PingFangSC-Regular;
  }
  .space {
    margin-bottom: 12px;
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
