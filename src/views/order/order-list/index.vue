<template>
  <div class="wrap page-bg">
    <el-card style="height: 75vh">
      <div class="header-class" slot="header">
        <span>工单列表</span>

        <div>
          <el-button icon="el-icon-refresh" size="small" @click="reset"
            >重置筛选</el-button
          >
          <el-button
            type="primary"
            size="small"
            icon="el-icon-download"
            @click="handleExport"
          >
            导出
          </el-button>
        </div>
      </div>
      <!-- <filter-form
        :projectCode="$route.query.projectCode"
        @search="getList"
        ref="form"
      ></filter-form> -->
      <div style="height: 65vh">
        <vxe-table
          border
          size="small"
          ref="xTable1"
          :data="tableData"
          max-height="99%"
          auto-resize
          show-overflow
          v-loading="loading"
          @filter-change="filterChangeEvent"
          :filter-config="{ remote: true }"
        >
          <vxe-column
            title="序号"
            type="seq"
            align="center"
            width="60px"
            fixed="left"
          ></vxe-column>
          <vxe-column
            field="eventHeaderCode"
            title="工单编号"
            align="center"
            width="240px"
            fixed="left"
            :filters="[{ data: '' }]"
          >
            <template #filter="{ $panel, column }">
              <template v-for="(option, index) in column.filters">
                <vxe-input
                  class="filter-input"
                  :key="index"
                  style="width: 200px"
                  v-model="option.data"
                  @input="$panel.changeOption($event, !!option.data, option)"
                  placeholder="请输入工单编号"
                  size="mini"
                ></vxe-input>
              </template>
            </template>
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
            :filters="[{ data: '' }]"
          >
            <template #filter="{ $panel, column }">
              <template v-for="(option, index) in column.filters">
                <vxe-input
                  class="filter-input"
                  :key="index"
                  style="width: 200px"
                  v-model="option.data"
                  @input="$panel.changeOption($event, !!option.data, option)"
                  placeholder="输入完整编码"
                  size="mini"
                ></vxe-input>
              </template>
            </template>
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
          <vxe-column
            align="center"
            title="项目名称"
            field="projectName"
            width="180"
          />
          <vxe-column
            align="center"
            title="父项目名称"
            field="parentProjectCode"
            width="180"
          />
          <vxe-column
            align="center"
            title="父项目编码"
            field="parentProjectName"
            width="180"
          />
          <vxe-column
            align="center"
            title="状态"
            field="eventStatus"
            width="100"
            :filter-multiple="false"
            :filters="[
              { label: '处理中', value: 0 },
              { label: '已关闭', value: 1 },
            ]"
          >
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
            :filters="[{ data: '' }]"
          >
            <template #filter="{ $panel, column }">
              <template v-for="(option, index) in column.filters">
                <vxe-input
                  class="filter-input"
                  :key="index"
                  style="width: 200px"
                  v-model="option.data"
                  @input="$panel.changeOption($event, !!option.data, option)"
                  placeholder="输入完整编码"
                  size="mini"
                ></vxe-input>
              </template>
            </template>
          </vxe-column>
          <vxe-column
            align="center"
            title="工单类型"
            field="eventType"
            width="180"
            :filter-multiple="false"
            :filters="[]"
          >
            <template #default="{ row }">
              {{ row.eventTypeName }}
            </template>
          </vxe-column>
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
            title="截止时间"
            field="eventHandleDate"
            width="180"
          ></vxe-column>
          <vxe-column
            align="center"
            title="责任人"
            field="handlerName"
            width="120"
            :filters="[{ data: '' }]"
          >
            <template #filter="{ $panel, column }">
              <template v-for="(option, index) in column.filters">
                <vxe-input
                  class="filter-input"
                  :key="index"
                  style="width: 200px"
                  v-model="option.data"
                  @input="$panel.changeOption($event, !!option.data, option)"
                  placeholder="输入完整编码"
                  size="mini"
                ></vxe-input>
              </template>
            </template>
          </vxe-column>
          <vxe-column
            align="center"
            title="责任人部门"
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
      </div>
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
// import filterForm from "./filterForm";
export default {
  name: "Order-list",
  dicts: ["event_type", "event_urgency_level", "event_complete_stutas"],
  components: {
    workOrderDialog,
    // filterForm,
  },
  data() {
    return {
      dialogVisible: false,
      form: {},
      params: {
        pageNum: 1,
        pageSize: 10,
      },
      eventTypeList: [
        { label: "提问工单", value: "提问工单" },
        { label: "开票类工单", value: "开票类工单" },
        { label: "收款类工单", value: "收款类工单" },
        { label: "阶段文档类工单", value: "阶段文档类工单" },
        { label: "毛利类工单", value: "毛利类工单" },
        { label: "项目结项工单", value: "项目结项工单" },
      ],
      tableData: [],
      totals: 0,
      loading: false,
      filterParams: {
      }, // 表头筛选条件
    };
  },
  computed: {
    ...mapGetters(["userRolse"]),
  },
  mounted() {
    // 异步加载筛选数据
    setTimeout(() => {
      const $table = this.$refs.xTable1;
      if ($table) {
        const nameColumn = $table.getColumnByField("eventType");
        if (nameColumn) {
          $table.setFilter(nameColumn, this.dict.type.event_type);
        }
      }
    }, 500);

    const { params } = this.$route;
    //如果从项目详情进来  回写项目编码 且页码重置
    this.projectCodeFilter();
    this.getList();
  },
  activated() {
    this.projectCodeFilter();
  },
  methods: {
    reset() {
      const $table = this.$refs.xTable1;
      this.filterParams = {};
      $table.clearFilter();
      // 重新请求
      this.params = {
        pageNum: 1,
        pageSize: 10,
      };
      this.getList();
    },
    projectCodeFilter() {
      const { params } = this.$route;
      if (params?.projectCode) {
        this.filterParams = {
          projectCode: params.projectCode,
        };

        const xTable = this.$refs.xTable1;
        const column = xTable.getColumnByField("projectCode");
        // 修改第一个选项为勾选状态
        const option = column.filters[0];
        option.data = params.projectCode;
        option.checked = true;
        // 修改条件之后，需要手动调用 updateData 处理表格数据
        xTable.updateData();

        this.params = {
          pageNum: 1,
          pageSize: 10,
        };
        this.getList();
      }
    },
    filterNameMethod: ({ value, row }) => {
      console.log(value, row);
      // return XEUtils.toValueString(row.name).toLowerCase().indexOf(value) > -1;
    },
    async getList(query = {}) {
      this.loading = true;
      // const filterVal = this.$refs.form.queryParams;
      const params = {
        ...this.params,
        ...query,
        ...this.filterParams,
        // ...filterVal,
      };
      const { total, rows } = await list(params);
      this.tableData = rows;
      this.totals = total;
      this.loading = false;
    },
    /** 导出表格 */
    handleExport() {
      this.download(
        "/workOrder/header/export",
        this.filterParams,
        `工单列表_${new Date().getTime()}.xlsx`
      );
    },
    //筛选
    filterChangeEvent({ property, values, datas }) {
      // 自定义的筛选数据是在datas里面
      let val = datas[0];
      if (values[0] == 0 || values[0]) {
        val = values[0];
      }
      if (val !== null || val !== undefined || val !== "") {
        this.filterParams[property] = val;
      } else {
        this.filterParams[property] = null;
      }

      // 重新请求
      this.getList({ pageNum: 1 });
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
  .header-class {
    display: flex;
    align-content: center;
    justify-content: space-between;
    span {
      line-height: 27px;
    }
  }
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
