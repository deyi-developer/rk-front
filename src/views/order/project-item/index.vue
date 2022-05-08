<template>
  <div class="wrap page-bg">
    <el-card class="card">
      <div slot="header">
        <span>{{ header }}</span>
      </div>
      <vxe-table
        border
        style="width: 100%"
        height="80%"
        show-overflow
        :data="tableData"
      >
        <vxe-column
          v-for="(item, index) in tableColumn"
          :key="index"
          :prop="item.prop"
          :title="item.label"
          :min-width="item.minWidth"
          :width="item.width"
          :align="item.align"
        >
          <template #default="{ row, rowIndex }">
            <!-- 序号 -->
            <span v-if="item.prop === 'index'">{{ rowIndex + 1 }}</span>

            <!-- 序号 -->
            <span v-if="item.prop === 'money'">{{ row[item.prop] | currency }}</span>

            <!-- 默认值 -->
            <span v-else>{{ row[item.prop] }}</span>
          </template>
        </vxe-column>
      </vxe-table>
    </el-card>
  </div>
</template>
<script>
import {
  fetchPjtdListApi,
  fetchAlreadyBillingListApi,
  fetchReceiptsMoneyListApi,
} from "./api";
import { PJTD_LIST, ALREADY_BILLING, RECEIPTS_MONEY } from "./column";
export default {
  data() {
    return {
      tableColumn: [],
      tableData: [],
      header: ''
    };
  },

  created() {
    const { projectCode, type, name } = this.$route.query;
    this.getList(projectCode, Number(type))
    this.setTitle(name)
  },

  methods: {
    getList(projectCode, type) {
      switch (type) {
        case 1:
          this.header = '总收入'
          this.tableColumn = PJTD_LIST
          this.fetchPjtdListApi(projectCode);
        break
        case 2:
          this.header = '已开总额'
          this.tableColumn = ALREADY_BILLING
          this.fetchAlreadyBillingListApi(projectCode)
        break
        case 3:
          this.header = '已收总额'
          this.tableColumn = RECEIPTS_MONEY
          this.fetchReceiptsMoneyListApi(projectCode)
        break
      }
    },

    setTitle(name) {
      const vm = this
      const obj = Object.assign({}, vm.$route, {
        title: `${name}: ${this.header}`
      });
      this.$tab.updatePage(obj);
    },

    async fetchPjtdListApi(projectCode) {
      const { rows } = await fetchPjtdListApi({ projectCode });
      this.tableData = rows;
    },

    async fetchAlreadyBillingListApi(projectCode) {
      const { rows } = await fetchAlreadyBillingListApi({ projectCode });
      this.tableData = rows;
    },

    async fetchReceiptsMoneyListApi(projectCode) {
      const { rows } = await fetchReceiptsMoneyListApi({ projectCode });
      this.tableData = rows;
    }
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  padding: 20px; 
  .card {
    ::v-deep .el-card__body {
      height: calc(100vh - 170px);
    }
  }
}
</style>