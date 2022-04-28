<template>
  <div class="wrap page-bg">
    <el-card>
      <div slot="header">
        <span>工单列表</span>
      </div>
      <filter-form
        :projectCode="$route.query.projectCode"
        @search="getList"
        ref="form"
      ></filter-form>
      <vxe-table
        border
        size="small"
        :data="tableData"
        style="width: 100%"
        show-overflow
        v-loading="loading"
      >
        <vxe-column
          title="序号"
          type="seq"
          align="center"
          width="60px"
          fixed="left"
        ></vxe-column>
        <vxe-column title="工单编号" align="center" width="240px" fixed="left">
          <template #default="{ row }">
            <a
              style="color: #57a3f3"
              @click="
                () =>
                  $router.push({
                    path: `/work/details/${row.eventHeaderId}`,
                    query: { id: row.eventHeaderId },
                  })
              "
              >{{ row.eventHeaderCode }}</a
            >
          </template>
        </vxe-column>
        <vxe-column
          align="center"
          title="项目编码"
          field="projectCode"
          width="180"
        >
          <template #default="{ row }">
            <a
              style="color: #57a3f3"
              @click="
                () =>
                  $router.push({
                    path: `/order/details/${row.handlerId}`,
                    query: { projectCode: row.projectCode },
                  })
              "
              >{{ row.projectCode }}</a
            >
          </template>
        </vxe-column>
        <vxe-column align="center" title="状态" field="eventStatus" width="100">
          <template #default="{ row }">
            <el-tag size="small" :type="setTagType(row.eventStatus)">{{
              setStatus(row.eventStatus) || "未知"
            }}</el-tag>
          </template>
        </vxe-column>
        <vxe-column
          align="center"
          title="工单名"
          field="eventTitle"
          width="180"
        ></vxe-column>
        <vxe-column
          align="center"
          title="创建人"
          field="createName"
          width="120"
        ></vxe-column>
        <vxe-column
          align="center"
          title="创建时间"
          field="createTime"
          width="180"
        ></vxe-column>
        <vxe-column
          align="center"
          title="当前处理人"
          field="handlerName"
          width="120"
        ></vxe-column>
        <vxe-column
          align="center"
          title="当前处理人部门"
          field="handlerDeptName"
          width="180"
        ></vxe-column>
        <vxe-column
          align="center"
          title="最后更新时间"
          field="lastUpdateDate"
          width="180"
        ></vxe-column>
        <vxe-column
          v-if="userRolse.includes('risker')"
          align="center"
          title="操作"
          fixed="right"
          width="100px"
        >
          <template #default="{ row }">
            <el-button
              :disabled="row.eventStatus == 1"
              size="mini"
              type="primary"
              @click="closeOrder(row)"
              >关 闭</el-button
            >
          </template>
        </vxe-column>
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
import { mapGetters } from "vuex";
import { list, edit } from "./api";
import workOrderDialog from "../components/work-order-dialog";
import filterForm from "./filterForm";
export default {
  name: "Order-list",
  dicts: ["event_type", "event_urgency_level", "event_complete_stutas"],
  components: {
    workOrderDialog,
    filterForm,
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
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["userRolse"]),
  },

  mounted() {
    const { params } = this.$route;
    //如果从项目详情进来  回写项目编码 且页码重置
    if (params?.projectCode) {
      this.$refs.form.queryParams = {
        projectCode: params.projectCode,
      };
      this.params = {
        pageNum: 1,
        pageSize: 10,
      };
    }
    this.getList();
  },
  activated() {
    const { params } = this.$route;

    if (params?.projectCode) {
      this.$refs.form.queryParams = {
        projectCode: params.projectCode,
      };
      this.params = {
        pageNum: 1,
        pageSize: 10,
      };
    }

    this.getList();
  },
  methods: {
    async getList(query = {}) {
      this.loading = true;
      const filterVal = this.$refs.form.queryParams;
      const params = {
        ...this.params,
        ...query,
        ...filterVal,
      };
      const { total, rows } = await list(params);
      this.tableData = rows;
      this.totals = total;
      this.loading = false;
    },

    closeOrder(row) {
      this.$modal
        .confirm(`确定关闭此工单吗？`)
        .then(async () => {
          const { eventHeaderId } = row;
          const { code, msg } = await edit({ eventHeaderId, eventStatus: 1 });
          if (code === 200) {
            this.$modal.msgSuccess(msg);
            this.getList();
          } else {
            this.$modal.msgError(msg);
          }
        })
        .catch(() => {
          console.log("catch");
        });
    },

    update(row) {
      this.form = row;
      this.dialogVisible = true;
    },

    setTagType(type) {
      const tgaMap = {
        0: "success",
        1: "info",
      };
      return tgaMap[type];
    },

    setStatus(type) {
      const typeMap = {
        0: "处理中",
        1: "已关闭",
      };
      return typeMap[type];
    },
  },
};
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
