<!-- 项目维护 -->
<template>
  <div class="app-container demand-page">
    <filter-form
      @search="handleQuery"
      :project-list="filterProjectList"
    ></filter-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['project:demand:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['project:demand:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['project:demand:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['project:demand:export']"
          >导出</el-button
        >
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="demandList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="需求名称" align="center" prop="demandName">
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <div v-html="toBreak(scope.row.demandRemakr)" slot="content"></div>
            <div class="ellipsis">
              {{ scope.row.demandName }}
              <i class="el-icon-warning-outline text-warning"></i>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="关联项目"
        align="center"
        prop="projectName"
        width="150"
        show-overflow-tooltip
      />

      <el-table-column
        label="需求状态"
        align="center"
        prop="demandStatusMeaning"
      />
      <el-table-column label="创建人" align="center" prop="createByName" />

      <el-table-column
        label="截止日期"
        align="center"
        prop="closingDate"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.closingDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="薪资范围" align="center" prop="minSalary">
        <template slot-scope="scope">
          <span>{{ `${scope.row.minSalary}-${scope.row.maxSalary}` }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作地点" align="center" prop="workPlace" />
      <el-table-column
        label="需求联系人"
        align="center"
        prop="demandContactName"
      />
      <el-table-column
        label="需求联系电话"
        align="center"
        prop="demandContact"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['project:demand:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['project:demand:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 新增/修改弹窗 -->
    <drawer-form
      :title="title"
      :project-list="filterProjectList"
      :open.sync="open"
      :datasource="form"
      @submit="submitForm"
    ></drawer-form>
  </div>
</template>

<script>
import filterForm from "./filterForm";
import drawerForm from "./drawerForm.vue";
import {
  listDemand,
  getDemand,
  delDemand,
  addDemand,
  updateDemand,
} from "@/api/project/demand";
import { listProject } from "@/api/project/project";
export default {
  name: "Demand",
  components: { filterForm, drawerForm },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      projectList: [], //项目列表
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,

      // 总条数
      total: 0,
      // 风控需求表格数据
      demandList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      // 表单参数
      form: {},
    };
  },
  computed: {
    filterProjectList() {
      return this.projectList.filter((item) => item.projectStatus);
    },
  },
  created() {
    this.getProjectList();
    this.getList();
  },
  activated() {
    this.getProjectList();
    this.getList();
  },
  methods: {
    toBreak(val) {
      return val.split("\n").join("<br/>");
    },

    /** 查询风控需求列表 */
    getList() {
      this.loading = true;
      listDemand(this.queryParams).then((response) => {
        this.demandList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getProjectList() {
      listProject({ pageNum: 1, pageSize: 99999, projectStatus: 1 }).then(
        (response) => {
          this.projectList = response.rows;
        }
      );
    },
    /** 搜索按钮操作 */
    handleQuery(params) {
      this.queryParams = {
        ...this.queryParams,
        ...params,
        pageNum: 1,
      };
      this.getList();
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.demandId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    closeDrawer() {
      this.open = false;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.open = true;
      this.title = "添加风控需求";
      this.form = {};
      this.getProjectList();
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      const demandId = row.demandId || this.ids;
      getDemand(demandId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改风控需求";
      });
    },
    submitForm(params) {
      const { demandId } = params;
      if (demandId != null) {
        updateDemand(params).then((response) => {
          this.$modal.msgSuccess("修改成功");
          this.open = false;
          this.getList();
        });
      } else {
        addDemand(params).then((response) => {
          this.$modal.msgSuccess("新增成功");
          this.open = false;
          this.getList();
        });
      }
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const demandIds = row.demandId || this.ids;
      this.$modal
        .confirm('是否确认删除风控需求编号为"' + demandIds + '"的数据项？')
        .then(function () {
          return delDemand(demandIds);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "project/demand/export",
        {
          ...this.queryParams,
        },
        `demand_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>

<style lang="scss">
.ellipsis {
  cursor: pointer;
}
</style>
