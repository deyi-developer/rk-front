<template>
  <div class="wrap page-bg">
    <el-card>
      <div slot="header">
        <span>工单列表</span>
      </div>
      <filter-form :projectCode="$route.query.projectCode" @search="getList" ref="form"></filter-form>
      <vxe-table
        border
        size="small"
        class="table"
        :data="tableData"
        style="width: 100%"
        show-overflow
        v-loading="loading"
      >
        <vxe-column title="序号" type="seq" align="center" width="60px" fixed="left"></vxe-column>
        <vxe-column title="工单编号" align="center" width="240px" fixed="left">
          <template #default="{ row }">
            <a
              @click="() => $router.push({ path: '/order/send', query: { id: row.eventHeaderId } })"
            >{{ row.eventHeaderCode }}</a>
          </template>
        </vxe-column>
        <vxe-column align="center" title="项目编码" field="projectCode" width="180"></vxe-column>
        <vxe-column align="center" title="状态" field="eventCompleteStutas" width="100">
          <template #default="{ row }">
            <el-tag
              :type="setTagType(row.eventCompleteStutas)"
            >{{ selectDictLabel(dict.type.event_complete_stutas, row.eventCompleteStutas) || '未知' }}</el-tag>
          </template>
        </vxe-column>
        <vxe-column align="center" title="工单标题" field="eventTitle" width="180"></vxe-column>
        <vxe-column align="center" title="创建人" field="createName" width="120"></vxe-column>
        <vxe-column align="center" title="创建时间" field="createTime" width="180"></vxe-column>
        <vxe-column align="center" title="当前处理人" field="handlerName" width="120"></vxe-column>
        <vxe-column align="center" title="当前处理人部门" field="handlerDeptName" width="180"></vxe-column>
        <vxe-column align="center" title="最后更新时间" field="last_update_date" width="180"></vxe-column>
      </vxe-table>
    </el-card>
    <pagination
      v-show="totals > 0"
      :total="totals"
      :page.sync="params.pageNum"
      :limit.sync="params.pageSize"
      @pagination="getList"
    />
    <work-order-dialog
      type="update"
      :form="form"
      :dialogVisible.sync="dialogVisible"
      @refresh="() => getList()"
    />
  </div>
</template>
<script>
import { list } from './api'
import workOrderDialog from '../components/work-order-dialog'
import filterForm from './filterForm'
export default {
  name: 'OrderList',
  dicts: ["event_type", "event_urgency_level", "event_complete_stutas"],
  components: {
    workOrderDialog,
    filterForm
  },
  data() {
    return {
      dialogVisible: false,
      form: {},
      params: {
        pageNum: 1,
        pageSize: 10,
      },
      tableData: [],
      totals: 0,
      loading: false
    }
  },
  created() {
    const { query } = this.$route
    this.getList(query)
  },
  methods: {
    async getList(query) {
      this.loading = true
      this.params = {
        ...this.params,
        ...query
      }
      const { total, rows } = await list(this.params)
      this.tableData = rows
      this.totals = total
      this.loading = false
    },

    update(row) {
      this.form = row
      this.dialogVisible = true
    },

    setTagType(type) {
      if (!type) return 'info'
      const tgaMap = {
        0: 'warning',
        1: 'success',
        3: 'info',
        4: 'danger'
      }
      return tgaMap[type]
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  padding: 20px;
  min-height: calc(100vh - 84px);
  ::v-deep .el-table__body-wrapper {
    // max-height: 22vh;
    overflow-y: auto;
    border-bottom: none;
    border-radius: 0;
  }
  .pagination-container {
    display: flex;
    align-items: center;
    padding: 32px 12px !important;
    margin: 0;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  }
}
</style>