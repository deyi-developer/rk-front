<!-- 当月计划 -->
<template>
  <div class="wrap">
    <el-card class="space">
      <!-- title -->
      <div slot="header" class="clearfix">
        <span>部门计划明细</span>
      </div>

      <div class="search">
        <el-input placeholder="清输入项目名称" v-model="entryName">
          <el-button slot="append" icon="el-icon-search" @click="goSearch" />
        </el-input>
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
          <template slot-scope="{ row, $index }">
            <router-link
              v-if="item.prop === 'projectName' && currentMonthList.length !== $index + 1"
              :to="`/order/details?projectCode=${row.projectCode}`"
              class="link-type overflowHiding"
            >
              <el-tooltip effect="dark" :content="row[item.prop]">
                <span>{{ row[item.prop] }}</span>
              </el-tooltip>
            </router-link>

            <span v-else-if="item.prop === 'billingCompletionRate'">
              {{
                ((row.billingThisMonth / row.planBillingMoney) ||
                  0) * 100
              }}%
            </span>

            <span v-else-if="item.prop === 'collectionCompletionRate'">
              {{
                ((row.receiptsThisMonth /
                  row.planReceiptsMoney) || 0) * 100
              }}%
            </span>

            <span v-else-if="item.prop === 'projectName'">{{ row[item.prop] }}</span>

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
  name: "monthly-dept",
  components: {
    ColumnChart
  },

  data() {
    return {
      columnist: [
        {
          prop: "projectName",
          label: "得逸项目名称",
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
        },
        {
          prop: "billingCompletionRate",
          label: "开票完成率",
          width: "180"
        },
        {
          prop: "collectionCompletionRate",
          label: "收款完成率",
          width: "180"
        }
      ],
      // 当前月度列表+合计
      currentMonthList: [],
      // 当前月度列表
      MonthList: [],
      // 加载
      loading: false,
      entryName: "", // 项目名称
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
    } = await getCurrentMonth(this.$route.params.id)

    // 当前月度列表
    this.MonthList = planDtoList

    // 有总计项的当前月度列表
    this.currentMonthList = [...planDtoList, {
      projectName: '总计',
      planBillingMoney,
      billingThisMonth,
      planReceiptsMoney,
      receiptsThisMonth
    }]

    this.loading = false
  },
  methods: {
    goSearch: () => {

    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  padding: 20px;
  background: #f0f2f5;
  .space {
    margin-bottom: 12px;
  }
}

.overflowHiding {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 20px;
}
.search {
  margin-bottom: 20px;
  .el-input {
    width: 250px;
  }
}
</style>
