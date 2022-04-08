<!-- 当月计划 -->
<template>
  <div class="wrap">
    <el-card class="space">
      <!-- title -->
      <div slot="header" class="clearfix2">
        <span>{{this.$route.query.title}}计划明细</span>
        <el-button @click="clearFilter" type="primary" size="small"
          >清除所有过滤器</el-button
        >
      </div>

      <!-- table -->
      <el-table
        show-summary
        :summary-method="getSummaries"
        ref="filterTable"
        v-loading="loading"
        height="600"
        :data="MonthList"
      >
        <el-table-column
          v-for="(item, index) in columnist"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          :filters="item.filters"
          :filter-method="item.filters && filterHandler"
          :type="item.type || ''"
          :fixed="item.fixed"
        >
          <!-- 自定义表头 -->
          <template slot="header" slot-scope="{ row }">
            <!-- 项目编码 -->
            <div class="table-header" v-if="item.prop === 'projectCode'">
              <span>{{ item.label }}</span>

              <el-popover placement="bottom" width="160" trigger="click">
                <el-input
                  class="search-entryCode"
                  size="mini"
                  placeholder="清输入项目编码"
                  v-model="entryCode"
                >
                  <i
                    slot="suffix"
                    class="el-input__icon el-icon-search search-entryCode-icon"
                    @click="getCurrentMonthInfo"
                  />
                </el-input>

                <i
                  slot="reference"
                  class="table-header-item-icon el-icon-search"
                />
              </el-popover>
            </div>

            <!-- 项目名称 -->
            <div class="table-header" v-else-if="item.prop === 'projectName'">
              <span>{{ item.label }}</span>

              <el-popover placement="bottom" width="160" trigger="click">
                <el-input
                  class="search-entryCode"
                  size="mini"
                  placeholder="清输入项目名称"
                  v-model="projectName"
                >
                  <i
                    slot="suffix"
                    class="el-input__icon el-icon-search search-entryCode-icon"
                    @click="getCurrentMonthInfo"
                  />
                </el-input>

                <i
                  slot="reference"
                  class="table-header-item-icon el-icon-search"
                />
              </el-popover>
            </div>

            <span v-else>{{ item.label }}</span>
          </template>

          <!-- 自定义项内容-->
          <template slot-scope="{ row, $index }">

            <!-- 序号 -->
            <span v-if="item.prop === 'serialNumber'">{{ $index + 1 }}</span>

            <!-- 项目名称 -->
            <el-tooltip
              v-else-if="item.prop === 'projectName'"
              effect="dark"
              :content="row[item.prop]"
              class="overflowHiding"
            >
              <span>{{ row[item.prop] }}</span>
            </el-tooltip>

            <!-- 项目编码 -->
            <router-link
              v-else-if="
                item.prop === 'projectCode' && MonthList.length !== $index + 1
              "
              :to="`/order/details?projectCode=${row.projectCode}`"
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
        </el-table-column>
      </el-table>
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
  name: "Monthly-dept",
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
          fixed: true,
        },
        {
          prop: "projectCode",
          label: "得逸项目编码",
          minWidth: "200",
        },
        {
          prop: "projectName",
          label: "得逸项目名称",
          minWidth: "180",
        },
        {
          prop: "planBillingMoney",
          label: "本月计划开票金额",
          filters: [{ text: "隐藏无效数据", value: "planBillingMoney" }],
          minWidth: "150",
        },
        {
          prop: "billingThisMonth",
          label: "本月实际开票金额",
          filters: [{ text: "隐藏无效数据", value: "billingThisMonth" }],
          minWidth: "150",
        },
        {
          prop: "planReceiptsMoney",
          label: "本月计划收款金额",
          filters: [{ text: "隐藏无效数据", value: "planReceiptsMoney" }],
          minWidth: "150",
        },
        {
          prop: "receiptsThisMonth",
          label: "本月实际收款金额",
          filters: [{ text: "隐藏无效数据", value: "receiptsThisMonth" }],
          minWidth: "150",
        },
        {
          prop: "compleBillingThisMonth",
          label: "开票完成率",
          filters: [{ text: "隐藏无效数据", value: "compleBillingThisMonth" }],
          minWidth: "100",
        },
        {
          prop: "compleReceiptsThisMonth",
          label: "收款完成率",
          filters: [{ text: "隐藏无效数据", value: "compleReceiptsThisMonth" }],
          minWidth: "100",
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
    this.$route.meta.title = `${this.$route.query.title}计划明细`
    this.getCurrentMonthInfo();
  },
  updated() {
    this.$nextTick(() => {
      this.$refs["filterTable"].doLayout();
    });
  },
  methods: {
    getSummaries(){
      return this.currentMonthList
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
    filterHandler(value, row) {
      const data = row[value];
      if (data && data != "0.00") return row;
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
.search-entryCode-icon:hover {
  cursor: pointer;
  color: #429eff;
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
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 20px;
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
