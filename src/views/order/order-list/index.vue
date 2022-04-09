<template>
  <div class="wrap page-bg">
    <el-card>
      <div slot="header">
        <span>工单列表</span>
      </div>

      <filter-form :projectCode="$route.query.projectCode" @search="getList" ref="form"></filter-form>

      <el-table
        border
        size="small"
        class="table"
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column label="序号" type="index" align="center" width="60px" fixed></el-table-column>

        <el-table-column label="工单编号" align="center" width="240px" fixed>
          <template v-slot="scope">
            <a
              @click="() => $router.push({ path: '/order/send', query: { id: scope.row.eventHeaderId } })"
            >{{ scope.row.eventHeaderCode }}</a>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          show-overflow-tooltip
          label="项目编码"
          prop="projectCode"
          width="180"
        ></el-table-column>

        <el-table-column align="center" label="状态" prop="eventCompleteStutas" width="100">
          <template v-slot="scope">
            <el-tag
              :type="setTagType(scope.row.eventCompleteStutas)"
            >{{ selectDictLabel(dict.type.event_complete_stutas, scope.row.eventCompleteStutas) }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          show-overflow-tooltip
          label="工单标题"
          prop="eventTitle"
          width="180"
        ></el-table-column>
        <el-table-column align="center" label="创建人" prop="createName" width="120"></el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime" width="180"></el-table-column>
        <el-table-column align="center" label="当前处理人" prop="handlerName" width="120"></el-table-column>
        <el-table-column align="center" label="当前处理人部门" prop="handlerDeptName" width="180"></el-table-column>
        <el-table-column align="center" label="最后更新时间" prop="last_update_date" width="180"></el-table-column>

        <!-- <el-table-column prop="eventType" label="工单类型" width="180">
          <template v-slot="scope">
            <span>{{ selectDictLabel(dict.type.event_type, scope.row.eventType) }}</span>
          </template>
        </el-table-column>-->

        <!-- <el-table-column show-overflow-tooltip prop="eventContext" label="工单内容" width="500">
          <template v-slot="scope">
            <div class="content" v-html="scope.row.eventContext"></div>
          </template>
        </el-table-column>-->

        <!-- <el-table-column prop="eventUrgencyLevel" label="工单级别">
          <template v-slot="scope">
            <span>{{ selectDictLabel(dict.type.event_urgency_level, scope.row.eventUrgencyLevel) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="eventHandler" label="工单处理人"></el-table-column>-->
        <!-- <el-table-column prop="projectCode" label="项目编码"></el-table-column> -->
        <!-- <el-table-column label="操作" width="240">
          <template v-slot="scope">
            <div>
              <el-button size="small" @click="update(scope.row)">修改</el-button>
              <el-button
                size="small"
                @click="() => $router.push({ path: '/order/send', query: { id: scope.row.eventHeaderId } })"
              >详情</el-button>
            </div>
          </template>
        </el-table-column>-->
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
  // .content {
  //   width: 180px;
  //   height: 54px;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   white-space: nowrap;
  // }
}
</style>