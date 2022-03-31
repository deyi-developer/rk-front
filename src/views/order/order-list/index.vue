<template>
  <div class="wrap">
    <el-card>
      <div slot="header">
        <span>工单列表</span>
      </div>
      <filter-form @search="getList" ref="form"></filter-form>
      <el-table class="table" :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column prop="eventTitle" label="工单标题" width="180"></el-table-column>
        <el-table-column prop="eventType" label="工单类型" width="180">
          <template v-slot="scope">
            <span>{{ selectDictLabel(dict.type.event_type, scope.row.eventType) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="eventContext" label="工单内容">
          <template v-slot="scope">
            <span v-html="scope.row.eventContext"></span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="eventUrgencyLevel" label="工单级别">
          <template v-slot="scope">
            <span>{{ selectDictLabel(dict.type.event_urgency_level, scope.row.eventUrgencyLevel) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="eventHandler" label="工单处理人"></el-table-column>-->
        <el-table-column prop="projectCode" label="关联项目"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <div>
              <el-button size="small" @click="update(scope.row)">修改</el-button>
              <el-button
                size="small"
                @click="() => $router.push({ name: 'send', query: { id: scope.row.eventHeaderId } })"
              >详情</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
    ></work-order-dialog>
  </div>
</template>
<script>
import { list } from './api'
import workOrderDialog from '../components/work-order-dialog'
import filterForm from '../list/filterForm'
export default {
  dicts: ["event_type", "event_urgency_level"],
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
      totals: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList(query) {
      this.params = {
        ...this.params,
        ...query
      }
      const { total, rows } = await list(this.params)
      this.tableData = rows
      this.totals = total
    },

    update(row) {
      this.form = row
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  margin: 20px;
  ::v-deep .el-table__body-wrapper {
    height: 52vh;
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