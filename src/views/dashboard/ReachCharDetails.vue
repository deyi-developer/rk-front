<template>
  <div class="project-list app-container">
    <div class="export">
      <el-button
        type="primary"
        icon="el-icon-download"
        size="small"
        @click="handleExport"
        >导出</el-button
      >
    </div>
    <vxe-table
      show-overflow
      row-id="projectCode"
      :loading="loading"
      :data="tableData"
    >
      <vxe-column field="projectCode" title="项目编码"></vxe-column>
      <vxe-column field="projectName" title="项目名称"></vxe-column>
      <vxe-column field="parentProjectCode" title="父项目编码"></vxe-column>
      <vxe-column field="parentProjectName" title="父项目名称"></vxe-column>
      <!-- 1 工单    2 开票 -->
      <template v-if="parseInt(type) === 2">
        <vxe-column field="year" title="年"></vxe-column>
        <vxe-column field="month" title="月"></vxe-column>
        <vxe-column field="reachType" title="开票/收款类型"></vxe-column>
        <vxe-column field="planAmount" title="计划金额"></vxe-column>
        <vxe-column field="actualAmount" title="实际金额"></vxe-column>
      </template>
      <template v-else>
        <vxe-column field="reachType" title="工单类型"></vxe-column>
        <vxe-column field="createTime" title="工单行日期"></vxe-column>
        <vxe-column field="handler" title="工单行处理人(创建人)"></vxe-column>
      </template>

      <vxe-column field="completeStatus" title="达成状态"></vxe-column>
    </vxe-table>

    <vxe-pager
      :loading="loading"
      :current-page="tablePage.currentPage"
      :page-size="tablePage.pageSize"
      :total="tablePage.totalResult"
      :layouts="[
        'PrevPage',
        'JumpNumber',
        'NextPage',
        'FullJump',
        'Sizes',
        'Total',
      ]"
      @page-change="handlePageChange"
    >
    </vxe-pager>
  </div>
</template>
<script>
import { getReachDetail, reachExport } from "./api";
export default {
  data() {
    return {
      type: this.$route.query.type,
      projectCode: this.$route.query.projectCode,
      loading: false,
      tableData: [],
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
    };
  },
  created() {
    this.$tab.updatePage(
      Object.assign({}, this.$route, {
        title: `${this.$route.query.title || "达成率"}`,
      })
    );
    this.getReachDetailInfo();
  },
  methods: {
    async getReachDetailInfo() {
      this.loading1 = true;
      const { code, msg, rows, total } = await getReachDetail({
        reachType: this.type,
        data: {
          pageNum: this.tablePage.currentPage,
          pageSize: this.tablePage.pageSize,
          projectCode: this.projectCode,
        },
      });
      if (code === 200) {
        this.tableData = rows;
        this.tablePage.totalResult = total;
      } else {
        this.$message.error(msg);
      }
      this.loading = false;
    },
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.getReachDetailInfo();
    },
    handleExport() {
      console.log(11);
      const params = {
        pageNum: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize,
        projectCode: this.projectCode,
      };
      console.log(reachExport(this.type));
      this.download(
        reachExport(this.type),
        params,
        `达成率_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.export {
  text-align: right;
  padding-bottom: 10px;
}
</style>
