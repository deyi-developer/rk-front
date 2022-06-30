<template>
  <div class="wrap page-bg">
    <el-card style="height: 75vh">
      <!-- 顶部操作栏 -->
      <div class="header-class" slot="header">
        <span>工单列表</span>

        <div>
          <el-button plain size="small" @click="reset">重置筛选</el-button>

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

      <!-- 表格 -->
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
          :cell-class-name="rowClsName"
        >
          <vxe-column
            v-for="item in columnList"
            v-bind:key="item.prop"
            :title="item.title"
            :type="item.type"
            :align="item.align"
            :header-align="item.headerAlign"
            :width="item.width"
            :fixed="item.fixed"
            :filters="item.filters"
            :field="item.field"
            :filter-multiple="item.filterMultiple"
          >
            <!-- 工单编号筛选器 -->
            <template v-if="item.customFiltering" #filter="{ $panel, column }">
              <!-- 工单编号, 项目编码筛选器 -->
              <div
                v-if="
                  item.field === 'eventHeaderCode' ||
                  item.field === 'projectCode' ||
                  item.field === 'projectName' ||
                  item.field === 'eventTitle' ||
                  item.field === 'handlerName'
                "
              >
                <vxe-input
                  class="filter-input"
                  v-for="(option, index) in column.filters"
                  :key="index"
                  style="width: 200px"
                  v-model="option.data"
                  @input="$panel.changeOption($event, !!option.data, option)"
                  :placeholder="item.FilterPlaceholder"
                  size="mini"
                />
              </div>
            </template>

            <!-- 自定义工单编号显示内容 -->
            <template #default="{ row, rowIndex }">
              <!-- 序号 -->
              <span v-if="item.field === 'serialNumber'">{{
                rowIndex + 1
              }}</span>

              <!-- 工单编号 -->

              <a
                v-if="item.field === 'eventHeaderCode'"
                style="color: #57a3f3"
                @click="() => navWorkDetails(row)"
                >{{ row[item.field] }}</a
              >

              <!-- 项目编码 -->
              <a
                v-else-if="item.field === 'projectCode'"
                style="color: #57a3f3"
                @click="() => navOrderDetails(row)"
                >{{ row[item.field] }}</a
              >

              <!-- 状态 -->
              <el-tag
                v-else-if="item.field === 'eventStatus'"
                size="small"
                :type="getTagList(row.eventStatus)('type')"
                >{{ getTagList(row.eventStatus)("name") || "未知" }}</el-tag
              >

              <!-- 工单类型 -->
              <span v-else-if="item.field === 'eventType'">{{
                row.eventTypeName
              }}</span>

              <!-- 是否超期 -->
              <el-tag
                v-else-if="item.field === 'overdueDayType'"
                size="small"
                :type="0 > row.overdueDay && 'danger'"
                >{{ 0 > row.overdueDay ? "是" : "否" }}</el-tag
              >

              <!-- 超期天数 -->
              <span v-else-if="item.field === 'overdueDay'">{{
                0 > row.overdueDay ? -row.overdueDay : "-"
              }}</span>

              <span v-else>{{ row[item.field] }}</span>
            </template>
          </vxe-column>

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

    <!-- 分页 -->
    <pagination
      v-show="totals > 0"
      :total="totals"
      :page.sync="paging.pageNum"
      :limit.sync="paging.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { list, edit } from "./api";
import { COLUMN_LIST, RESET_PAGING, TAG_LIST } from "./constants";

export default {
  name: "Order-list",
  dicts: ["event_type", "event_urgency_level", "event_complete_stutas"],
  data() {
    return {
      columnList: COLUMN_LIST,
      getTagList: TAG_LIST,

      paging: RESET_PAGING(), // 分页
      tableData: [], // 列表数据
      totals: 0, // 总页数
      loading: false, // 表格加载
      filterParams: {} // 表头筛选条件
    };
  },
  computed: {
    ...mapGetters(["userRolse"])
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

    //如果从项目详情进来  回写项目编码 且页码重置
    this.projectCodeFilter();

    this.getList();
  },
  activated() {
    this.projectCodeFilter();
  },
  methods: {
    rowClsName({ row, column }) {
      const { field } = column;
      const { overdueDay } = row;
      return 0 > overdueDay && field === "eventHeaderCode" ? "overdue" : "";
    },
    // 获取工单列表数据
    async getList() {
      this.loading = true;

      const { total, rows } = await list({
        ...this.paging,
        ...this.filterParams
      });
      this.loading = false;
      this.tableData = rows;
      this.totals = total;
    },

    // 初始化筛选
    projectCodeFilter() {
      const { params } = this.$route;
      if (params?.projectCode) {
        this.filterParams = {
          projectCode: params.projectCode
        };

        const xTable = this.$refs.xTable1;
        const column = xTable.getColumnByField("projectCode");
        // 修改第一个选项为勾选状态
        const option = column.filters[0];
        option.data = params.projectCode;
        option.checked = true;
        // 修改条件之后，需要手动调用 updateData 处理表格数据
        xTable.updateData();

        this.resetPaging();
        this.getList();
      }
    },

    // 筛选方法
    filterChangeEvent({ property, values, datas }) {
      // 自定义的筛选数据是在datas里面
      let val = datas[0];
      if (values[0] == 0 || values[0]) val = values[0];
      // if (val !== null || val !== undefined || val !== "") {
      //   this.filterParams[property] = val;
      // } else {
      //   this.filterParams[property] = null;
      // }

      this.filterParams[property] = val;

      // 重置分页
      this.resetPaging();

      // 重新请求
      this.getList();
    },

    // 重置筛选
    reset() {
      this.filterParams = {};
      this.$refs.xTable1.clearFilter();
      this.resetPaging();

      // 重新请求
      this.getList();
    },

    /** 导出表格 */
    handleExport() {
      this.download(
        "/workOrder/header/export",
        this.filterParams,
        `工单列表_${new Date().getTime()}.xlsx`
      );
    },

    // 关闭工单
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

    // 重置分页
    resetPaging() {
      this.paging = RESET_PAGING();
    },

    // 跳转工单详情
    navWorkDetails({ eventHeaderId }) {
      this.$router.push({
        path: `/work/details/${eventHeaderId}`,
        query: { id: eventHeaderId }
      });
    },

    // 跳转项目明细
    navOrderDetails({ handlerId, projectCode }) {
      this.$router.push({
        path: `/order/details/${handlerId}`,
        query: { projectCode: projectCode }
      });
    }
  }
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
<style lang="scss">
.overdue {
  position: relative;
}
.overdue ::before {
  position: absolute;
  content: " ";
  left: -20px;
  top: -40px;
  width: 100%;
  height: 100%;
  background: url("../../../assets/images/over-date.png") no-repeat;
  background-size: 60px;
  transform: rotate(-30deg);
}
</style>
