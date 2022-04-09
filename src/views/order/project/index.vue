<template>
  <div class="order page-bg">
    <header
      class="header"
      :class="[sidebar.opened ? 'fixed-header-wide' : 'fixed-header-narrow']"
    >
      <div>
        <h1>项目明细</h1>
        <p class="header-title">
          项目编码：{{ projectData.projectCode }} 项目名称:
          {{ projectData.projectName }}
        </p>
      </div>

      <el-button style="margin-left: auto" type="text" @click="save"
        ><i class="el-icon-edit"></i>保存</el-button
      >
      <el-button
        style="padding: 3px 0"
        type="text"
        @click="
          $router.push({
            path: '/order/order-list',
            query: { projectCode: projectData.projectCode }
          })
        "
        >服务工单</el-button
      >
      <el-button style="padding: 3px 0" type="text" @click="sendOrder"
        >发起工单</el-button
      >
    </header>
    <div class="content">
      <el-form :model="updateData" :rules="rules" ref="form">
        <el-card class="spacing" title="项目基本信息">
          <div slot="header">
            <span>项目基本信息</span>
            <div style="float: right"></div>
          </div>
          <el-row>
            <el-col :span="6">
              <el-form-item label="项目编码:">{{
                projectData.projectCode
              }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="对外项目编码:">{{
                projectData.parentProjectCode
              }}</el-form-item>
            </el-col>
            <el-col :span="6">
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
            <el-col :span="6">
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
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="项目状态:">
                {{ projectData.projectStatus }}
                <!-- {{ selectDictLabel(dict.type.event_type, info.eventType) }} -->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目结算类型:">{{
                updateData.projectChargeType
              }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目结算周期:" prop="projectChargePeriod">
                <el-input-number
                  style="width: 60%"
                  v-model="updateData.projectChargePeriod"
                  size="small"
                  :disabled="!isPmRule"
                ></el-input-number>
                <span>月</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="账务账期:" prop="projectInvoicePeriod">
                <el-input-number
                  style="width: 60%"
                  v-model="updateData.projectInvoicePeriod"
                  size="small"
                  :disabled="!isPmRule"
                ></el-input-number>
                <span>天</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="项目经理工号:">{{
                projectData.projectManagerEmpNum
              }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目经理姓名:">{{
                projectData.pmName
              }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="一级部门:">{{
                projectData.oneDeptName
              }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目部门:">{{
                projectData.deptName
              }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="项目创建日期:">{{
                projectData.projectCreateDate
              }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目开始日期:">{{
                projectData.projectStartDate
              }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目结束日期:">{{
                projectData.projectEndDate
              }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目风险状态:">{{
                selectDictLabel(dict.type.risk_level, projectData.riskLevel)
              }}</el-form-item>
            </el-col>
          </el-row>
          <!-- 风控专员才显示 -->
          <el-row v-if="isRisker">
            <el-col :span="6">
              <el-form-item label="开票风险等级:">
                <el-select
                  style="width: 70%"
                  placeholder="请选择工单级别"
                  v-model="updateData.invoicingRiskLevel"
                  clearable
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
            <el-col :span="6">
              <el-form-item label="收款风险等级:">
                <el-select
                  style="width: 70%"
                  placeholder="请选择工单级别"
                  v-model="updateData.receiveRiskLevel"
                  clearable
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
            <el-col :span="6">
              <el-form-item label="毛利风险等级:">
                <el-select
                  style="width: 70%"
                  placeholder="请选择工单级别"
                  v-model="updateData.grossProfitRiskLevel"
                  clearable
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
          <el-row>
            <el-col :span="6">
              <el-form-item label="计划开票金额:">
                <el-input
                  style="width: 70%"
                  v-model="updateData.planBillingMoney"
                  :disabled="isBoss"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="计划收款金额:">
                <el-input
                  style="width: 70%"
                  v-model="updateData.planReceiptsMoney"
                  :disabled="isBoss"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="最终客户:">{{
                projectData.customName
              }}</el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="项目结算类型:">{{ projectData.projectChargeType }}</el-form-item>
            </el-col>-->
          </el-row>
          <el-row>
            <el-form-item label="项目备注:">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="updateData.planRemark"
                :disabled="isBoss"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-card>
        <el-card class="spacing">
          <div slot="header">
            <span>收入信息</span>
          </div>
          <el-row>
            <el-col :span="6">
              <el-form-item label="总开票:">{{
                projectData.totalBilling | currency
              }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总收款:">{{
                projectData.totalReceipts | currency
              }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="PJTD含税总收入:">{{
                projectData.pjtdTotalMoney | currency
              }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="相对PJTD收款率:">{{
                projectData.pjtdReceiptsRate | percent
              }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="相对PJTD开票率:">{{
                projectData.pjtdBillingRate | percent
              }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="相对总开票收款率:">{{
                projectData.totalBillingRate | percent
              }}</el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="spacing">
          <div slot="header">
            <span>基于账期指标</span>
          </div>
          <el-row>
            <el-col :span="6">
              <el-form-item label="总应开金额:">{{
                projectData.totalShouldBillingMoney | currency
              }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总应收金额:">{{
                projectData.totalShouldReceiptsMoney | currency
              }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="总已开金额:">{{
                projectData.totalAlreadyBillingMoney | currency
              }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总已收金额:">{{
                projectData.totalInvoicedMoney | currency
              }}</el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="6">
              <el-form-item label="总应开未开:">总应开未开</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总应收未收(相对应收):">总应收未收(相对应收)</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总应收未收(相对已开):">总应收未收(相对已开)</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="相对应开开票率:">相对应开开票率</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="相对应收收款率:">相对应收收款率</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="相对已开收款率:">相对已开收款率</el-form-item>
            </el-col>
          </el-row>-->
        </el-card>
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
import filterForm from "../list/filterForm";
import workOrderDialog from "../components/work-order-dialog";

export default {
  dicts: ["event_type", "event_urgency_level", "risk_level"],
  components: {
    filterForm,
    workOrderDialog,
    ChartsGroup
  },
  data() {
    /** 项目结算周期 */
    const projectChargePeriodRule = (rule, value, callback) => {
      if (!this.isPmRule) callback();
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
            callback(new Error("非里程碑状态下项目结算周期不能0"));
          }
        }
      }
    };
    /** 账务账期 */
    const projectInvoicePeriodRule = (rule, value, callback) => {
      if (!this.isPmRule) callback();

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
        projectChargeType: ""
      },
      // 工单内容
      workOrderform: {
        eventTitle: "",
        eventType: "",
        eventMsg: "",
        eventHandler: "",
        eventUrgencyLevel: "",
        eventHandleDate: "",
        projectCode: this.$route.query.projectCode
      },
      rules: {
        projectChargePeriod: [
          { validator: projectChargePeriodRule, required: true }
        ],
        projectInvoicePeriod: [
          { validator: projectInvoicePeriodRule, required: true }
        ]
      },
      dialogVisible: false
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
    }
  },

  created() {
    const {
      query: { projectCode }
    } = this.$route;
    this.getData(projectCode);
  },

  methods: {
    /** 页面数据 */
    async getData(projectCode) {
      const { data } = await projectDetails(projectCode);
      const obj = Object.assign({}, this.$route, { title: data.projectCode });
      this.$tab.updatePage(obj);
      this.projectData = data;
      this.setUpdata(data);
      this.$refs["form"].validate(); // 请求完数据后即做一次验证
    },

    /** 保存 */
    save() {
      this.$refs["form"].validate(async (valid) => {
        console.log("valid", valid);
        if (valid) {
          this.updateData.projectCode = this.projectData.projectCode;
          const { code, msg } = await projectUpdate([this.updateData]);
          if (code === 200) {
            this.$modal.msgSuccess(msg);
          } else {
            this.$modal.msgError(msg);
          }
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
    }
  }
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
    margin-top: 80px;
    padding: 20px;
  }
  .el-form-item {
    margin-bottom: 6px;
    &::v-deep .el-form-item__label {
      font-size: 12px;
    }
    &::v-deep .el-form-item__content {
      font-size: 12px;
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
    // z-index: 999;
    .header-title {
      margin-top: 6px;
      font-size: 12px;
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
