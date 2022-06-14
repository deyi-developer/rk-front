<template>
  <div class="order page-bg">
    <header
      class="header"
      :class="[sidebar.opened ? 'fixed-header-wide' : 'fixed-header-narrow']"
    >
      <div>
        <span class="header-span">项目明细</span>
        <p class="header-title">
          <span>项目编码：{{ projectData.projectCode }}</span>
          <span style="margin-left: 15px"
            >项目名称: {{ projectData.projectName }}</span
          >
        </p>
      </div>

      <div style="margin-left: auto">
        <el-button v-hasPermi="['risk:detail:save']" type="text" @click="save">
          <i class="el-icon-edit"></i>保存
        </el-button>
        <el-button
          v-hasPermi="['workOrder:order:list']"
          style="padding: 3px 0"
          type="text"
          @click="
            $router.push({
              name: 'Order-list',
              params: { projectCode: projectData.projectCode },
            })
          "
          >服务工单</el-button
        >
        <el-button
          v-hasPermi="['workOrder:header:add']"
          style="padding: 3px 0"
          type="text"
          @click="sendOrder"
          >发起工单</el-button
        >
      </div>
    </header>
    <div class="content">
      <el-form
        :model="updateData"
        :rules="rules"
        ref="form"
        size="mini"
        label-position="left"
        label-width="140px"
      >
        <el-card class="spacing" title="项目基本信息">
          <div slot="header">
            <span style="font-weight: bold; font-size: 16px">项目基本信息</span>
            <div style="float: right"></div>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="项目编码:">
                {{ projectData.projectCode }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-tooltip
                effect="dark"
                :content="projectData.projectName && projectData.projectName"
                placement="top"
              >
                <el-form-item label="项目名称:">
                  <div class="ellipsis">{{ projectData.projectName }}</div>
                </el-form-item>
              </el-tooltip>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目状态:">
                {{ projectData.projectStatus }}
                <!-- {{ selectDictLabel(dict.type.event_type, info.eventType) }} -->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="对外项目编码:">
                {{ projectData.parentProjectCode }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-tooltip
                effect="dark"
                :content="
                  projectData.parentProjectName && projectData.parentProjectName
                "
                placement="top"
              >
                <el-form-item label="对外项目名称:">
                  <div class="ellipsis">
                    {{ projectData.parentProjectName }}
                  </div>
                </el-form-item>
              </el-tooltip>
            </el-col>

            <el-col :span="8">
              <el-form-item label="项目结算类型:">
                {{ updateData.projectChargeType }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="项目创建日期:">
                {{ projectData.projectCreateDate }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目开始日期:">
                {{ projectData.projectStartDate }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目结束日期:">
                {{ projectData.projectEndDate }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="最终客户:">
                {{ projectData.customName }}
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="一级部门:">
                {{ projectData.oneDeptName }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目部门:">
                {{ projectData.deptName }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="项目经理工号:">
                {{ projectData.projectManagerEmpNum }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目经理姓名:">
                {{ projectData.pmName }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目风险状态:">
                <el-select
                  style="width: 70%"
                  size="mini"
                  :class="clacClass(projectData.riskLevel)"
                  placeholder="请选择风险级别"
                  v-model="projectData.riskLevel"
                  :disabled="checkRole(['pm', 'boss'])"
                >
                  <el-option
                    v-for="dict in dict.type.risk_status"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="项目结算周期:" prop="projectChargePeriod">
                <el-input-number
                  size="mini"
                  style="width: 60%"
                  step-strictly
                  v-model="updateData.projectChargePeriod"
                  :disabled="!checkRole(['pm', 'boss'])"
                ></el-input-number>
                <span>月</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票账期:" prop="projectInvoicePeriod">
                <el-input-number
                  size="mini"
                  style="width: 60%"
                  step-strictly
                  v-model="updateData.projectInvoicePeriod"
                  :disabled="!checkRole(['pm', 'boss'])"
                ></el-input-number>
                <span>天</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计划开票金额:">
                <el-input
                  style="width: 70%"
                  size="mini"
                  v-model="updateData.planBillingMoney"
                  :disabled="
                    !checkRole(['pm', 'boss']) || !projectData.planEditEnable
                  "
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="开票备注:">
                <el-input
                  style="width: 70%"
                  size="mini"
                  v-model="updateData.billRemark"
                  :disabled="
                    !checkRole(['pm', 'boss']) || !projectData.planEditEnable
                  "
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计划收款金额:">
                <el-input
                  style="width: 70%"
                  size="mini"
                  v-model="updateData.planReceiptsMoney"
                  :disabled="
                    !checkRole(['pm', 'boss']) || !projectData.planEditEnable
                  "
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收款备注:">
                <el-input
                  style="width: 70%"
                  size="mini"
                  v-model="updateData.receiptRemark"
                  :disabled="
                    !checkRole(['pm', 'boss']) || !projectData.planEditEnable
                  "
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="开票风险等级:">
                <el-select
                  style="width: 70%"
                  size="mini"
                  :class="clacClass(updateData.invoicingRiskLevel)"
                  placeholder="请选择风险级别"
                  v-model="updateData.invoicingRiskLevel"
                  :disabled="checkRole(['pm', 'boss'])"
                >
                  <el-option
                    v-for="dict in dict.type.risk_level"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收款风险等级:">
                <el-select
                  style="width: 70%"
                  size="mini"
                  :class="clacClass(updateData.receiveRiskLevel)"
                  placeholder="请选择风险级别"
                  v-model="updateData.receiveRiskLevel"
                  :disabled="checkRole(['pm', 'boss'])"
                >
                  <el-option
                    v-for="dict in dict.type.risk_level"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="毛利风险等级:">
                <el-select
                  style="width: 70%"
                  placeholder="请选择风险级别"
                  size="mini"
                  :class="clacClass(updateData.grossProfitRiskLevel)"
                  v-model="updateData.grossProfitRiskLevel"
                  :disabled="checkRole(['pm', 'boss'])"
                >
                  <el-option
                    v-for="dict in dict.type.risk_level"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-col :span="8">
              <el-form-item label="项目结算类型:">{{ projectData.projectChargeType }}</el-form-item>
          </el-col>-->

          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="项目备注:">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  :autosize="{
                    minRows: 6,
                  }"
                  v-model="updateData.planRemark"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <TableDesc :summary="projectData" />
        <!-- <el-card class="spacing">
          <div slot="header">
            <span>收入信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="总开票金额:">
                {{ projectData.totalAlreadyBillingMoney | currency }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总收款金额:">
                {{ projectData.totalReceiptssMoney | currency }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="PJTD含税总收入:">
                {{ projectData.pjtdTotalMoney | currency }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="相对PJTD收款率:">
                {{ projectData.pjtdReceiptsRate | percent }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="相对PJTD开票率:">
                {{ projectData.pjtdBillingRate | percent }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="相对总开票收款率:">
                {{ projectData.totalBillingRate | percent }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

        <el-card class="spacing">
          <div slot="header">
            <span>基于账期指标</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="总应开金额:">
                {{ projectData.totalShouldBillingMoney | currency }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总应收金额:">
                {{ projectData.totalShouldReceiptsMoney | currency }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="总已开金额:">
                {{ projectData.totalAlreadyBillingMoney | currency }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总已收金额:">
                {{ projectData.totalReceiptssMoney | currency }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-card> -->
      </el-form>
      <ChartsGroup
        :projectData="projectData"
        :projectCode="$route.query.projectCode"
      ></ChartsGroup>
    </div>

    <work-order-dialog
      type="add"
      :isPm="isPm"
      :pmName="projectData.pmName"
      :form="workOrderform"
      :dialogVisible.sync="dialogVisible"
    ></work-order-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { projectDetails, projectUpdate } from "./api";
import ChartsGroup from "../../dashboard/ChartsGroup";
import TableDesc from "../../dashboard/TableDesc.vue";
import filterForm from "../list/filterForm";
import workOrderDialog from "../components/work-order-dialog";
import { checkPermi, checkRole } from "@/utils/permission"; // 权限判断函数
export default {
  name: "Details",
  dicts: ["event_type", "event_urgency_level", "risk_level", "risk_status"],
  components: {
    filterForm,
    workOrderDialog,
    ChartsGroup,
    TableDesc,
  },
  data() {
    /** 项目结算周期 */
    const projectChargePeriodRule = (rule, value, callback) => {
      if (!checkRole(["pm", "boss"])) callback();
      if (value === "") {
        callback(new Error("请输入项目结算周期"));
      } else {
        if (this.projectData.projectChargeType == "里程碑") {
          if (value !== 0) {
            callback(new Error("里程碑状态下项目结算周期必须为0"));
          } else {
            callback();
          }
        } else {
          if (value !== 0) {
            callback();
          } else {
            callback(new Error("非里程碑状态下项目结算周期不能为0"));
          }
        }
      }
    };
    /** 账务账期 */
    const projectInvoicePeriodRule = (rule, value, callback) => {
      if (!checkRole(["pm", "boss"])) callback();

      if (value === "") {
        callback(new Error("请输入账务账期"));
      } else if (value === 0 || value < 0) {
        callback(new Error("账务账期必须大于0"));
      } else {
        callback();
      }
    };
    return {
      projectData: {},
      updateData: {
        // 可编辑内容
        projectInvoicePeriod: 0,
        invoicingRiskLevel: "",
        receiveRiskLevel: "",
        grossProfitRiskLevel: "",
        projectChargePeriod: 0,
        planBillingMoney: "",
        planReceiptsMoney: "",
        planRemark: "",
        projectCode: "",
        projectChargeType: "",
        receiptRemark: "",
        billRemark: ""
      },
      // 工单内容
      workOrderform: {
        eventTitle: "",
        eventType: "",
        eventMsg: "",
        eventHandler: "",
        eventUrgencyLevel: "",
        eventHandleDate: "",
        projectCode: this.$route.query.projectCode,
        orderAmount: "",
      },
      rules: {
        projectChargePeriod: [
          { validator: projectChargePeriodRule, required: true },
        ],
        projectInvoicePeriod: [
          { validator: projectInvoicePeriodRule, required: true },
        ],
      },
      dialogVisible: false,
    };
  },

  computed: {
    ...mapGetters(["userRolse", "sidebar", "usersInfo"]),

    // 是否boss
    isBoss() {
      if (this.userRolse.length === 0) return;
      if (this.userRolse.length === 1) {
        return this.userRolse.includes("boss");
      } else if (this.userRolse.length > 1) {
        return false;
      }
    },

    // 登录人员是否是此项目项目经理
    isPm() {
      return this.usersInfo.userId == this.projectData.pmUserId;
    },

    // 是否pm
    isPmRule() {
      if (this.userRolse.length === 0) return;
      if (this.userRolse.length === 1) {
        return this.userRolse.includes("pm");
      } else if (this.userRolse.length > 1) {
        return false;
      }
    },

    // 是否风控
    isRisker() {
      if (this.userRolse.length === 0) return;
      if (this.userRolse.length === 1) {
        return this.userRolse.includes("risker");
      } else if (this.userRolse.length > 1) {
        return false;
      }
    },
  },

  created() {
    const {
      query: { projectCode },
    } = this.$route;
    this.getData(projectCode);
  },

  methods: {
    checkPermi,
    checkRole,

    clacClass(status) {
      let className = "";
      if (status == "Green") {
        className = "cell-green";
      }
      if (status == "Yellow") {
        className = "cell-yellow";
      }
      if (status == "Red") {
        className = "cell-red";
      }
      if (status == "lawsuit") {
        className = "cell-lawsuit";
      }
      return className;
    },

    /** 页面数据 */
    async getData(projectCode) {
      const vm = this;
      const { data } = await projectDetails(projectCode);
      const obj = Object.assign({}, vm.$route, {
        title: "项目:" + data.projectCode,
      });
      this.$tab.updatePage(obj);
      this.projectData = data;
      this.setUpdata(data);
      this.$refs["form"].validate(); // 请求完数据后即做一次验证
    },

    /** 保存 */
    save() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.updateData.projectCode = this.projectData.projectCode;
          this.updateData.riskStatus = this.projectData.riskLevel;
          this.updateData.riskLevel = this.projectData.riskLevel;
          const { code, msg } = await projectUpdate([this.updateData]);
          if (code === 200) {
            this.$modal.msgSuccess(msg);
            const {
              query: { projectCode },
            } = this.$route;
            this.getData(projectCode);
          } else {
            this.$modal.msgError(msg);
          }
        } else {
          this.$modal.msgError("校验不通过");
        }
      });
    },

    /** 设置回显数据 */
    setUpdata(data) {
      Object.keys(data).forEach((key) => {
        if (this.updateData.hasOwnProperty(key)) {
          this.updateData[key] = data[key];
        }
      });
    },

    /** 发起工单 */
    sendOrder() {
      this.dialogVisible = true;
    },
  },
};
</script>
<!-- <script setup>
import { ref } from "@vue/composition-api";
import workOrderDialog from '../components/work-order-dialog'

let dialogVisible = ref(false)
const sendOrder = () => {
  dialogVisible.value = true
}

let form = ref({
  eventTitle: '',
  eventType: '',
  eventMsg: '',
  eventHandler: '',
  eventUrgencyLevel: '',
  projectCode: ''
})

</script> -->

<style lang="scss" scoped>
.order {
  // position: relative;
  .content {
    margin-top: 77px;
    padding: 20px;
  }
  .cell-red {
    &::v-deep input {
      background-color: #fef0f0 !important;
      color: #f56c6c !important;
      border-color: #f56c6c !important;
    }
  }
  .cell-lawsuit {
    &::v-deep input {
      background-color: #fef0f0 !important;
      color: #f56c6c !important;
      border-color: #f56c6c !important;
    }
  }
  .cell-yellow {
    &::v-deep input {
      background-color: #fdf6ec !important;
      color: #e6a23c !important;
      border-color: #e6a23c !important;
    }
  }
  .el-form-item {
    // margin-bottom: 6px;
    &::v-deep .el-form-item__label {
      font-size: 13px;
    }
    &::v-deep .el-form-item__content {
      font-size: 13px;
    }
  }
  .el-divider__text {
    font-weight: bold;
  }
  .header {
    display: flex;
    align-items: center;
    padding: 12px 24px;
    border-bottom: 1px solid #ddd;
    background: #fff;
    .header-span {
      margin-right: 15px;
      font-size: 20px;
      font-weight: 500;
      color: #262626;
      line-height: 28px;
      margin-bottom: 12px;
      word-break: break-all;
    }
    // z-index: 999;
    .header-title {
      margin-top: 6px;
      font-size: 12px;
      color: #909399;
    }
  }
  .fixed-header-wide,
  .fixed-header-narrow {
    position: fixed;
    top: 84px;
    left: 0;
    background: #fff;
    z-index: 4;
    transition: all 0.28s;
  }
  .fixed-header-wide {
    margin-left: 200px;
    width: calc(100% - 200px);
  }
  .fixed-header-narrow {
    margin-left: 54px;
    width: calc(100% - 54px);
  }
  .spacing {
    margin-bottom: 12px;
  }
  .ellipsis {
    white-space: nowrap;
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
