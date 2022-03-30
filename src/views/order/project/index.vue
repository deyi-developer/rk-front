<template>
  <div class="order">
    <header class="header">
      <h1>项目明细</h1>
      <p style="margin-left: 9%">开票中风险，收款高风险</p>
      <el-button style="margin-left: auto" type="primary">保存</el-button>
    </header>
    <div class="content">
      <el-form>
        <el-card class="spacing" title="项目基本信息">
          <div slot="header">
            <span>项目基本信息</span>
            <div style="float: right">
              <el-button
                style="padding: 3px 0"
                type="text"
                @click="$router.push({ name: 'order-list' })"
              >服务工单</el-button>
              <el-button style="padding: 3px 0" type="text" @click="sendOrder">发起工单</el-button>
            </div>
          </div>
          <el-row>
            <el-col :span="6">
              <el-form-item label="项目编码:">{{ projectData.projectCode }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="对外项目编码:">{{ projectData.parentProjectCode }}</el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="项目名称:">{{ projectData.projectName }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="对外项目名称:">{{ projectData.parentProjectName }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="项目状态:">{{ projectData.projectStatus }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目结算类型:">{{ projectData.projectChargeType }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目结算周期:">{{ projectData.projectChargePeriod }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="账务账期:">{{ projectData.projectInvoicePeriod }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="项目经理工号:">{{ projectData.projectManagerEmpNum }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目经理姓名:">{{ projectData.pmName }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="一级部门:">{{ projectData.oneDeptName }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目部门:">{{ projectData.deptName }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="项目创建日期:">{{ projectData.projectCreateDate }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目开始日期:">{{ projectData.projectStartDate }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目结束日期:">{{ projectData.projectEndDate }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="最终客户:">{{ projectData.customName }}</el-form-item>
            <el-form-item label="项目备注:">{{ projectData.describeMsg }}</el-form-item>
          </el-row>
        </el-card>
        <el-card class="spacing">
          <div slot="header">
            <span>收入信息</span>
          </div>
          <el-row>
            <el-col :span="6">
              <el-form-item label="总开票:">{{ projectData.totalBilling }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总收款:">{{ projectData.totalReceipts }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="PJTD含税总收入:">{{ projectData.pjtdTotalMoney }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="相对PJTD收款率:">{{ projectData.pjtdReceiptsRate }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="相对PJTD开票率:">{{ projectData.pjtdBillingRate }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="相对总开票收款率:">{{ projectData.totalBillingRate }}</el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="spacing">
          <div slot="header">
            <span>基于账期指标</span>
          </div>
          <el-row>
            <el-col :span="6">
              <el-form-item label="总应开金额:">{{ projectData.totalShouldBillingMoney }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总应收金额:">{{ projectData.totalShouldReceiptsMoney }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="总已开金额:">{{ projectData.totalAlreadyBillingMoney }}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总已收金额:">{{ projectData.totalInvoicedMoney }}</el-form-item>
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
    </div>
    <work-order-dialog type="add" :form="form" :dialogVisible.sync="dialogVisible"></work-order-dialog>
  </div>
</template>

<script>
export default {
  dicts: ["event_type", "event_urgency_level"]
}
</script>
<script setup>
import { ref, onMounted } from "@vue/composition-api";
import { projectDetails } from './api'
import workOrderDialog from '../components/work-order-dialog'

onMounted(() => {
  getData()
})

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

let projectData = ref({})
const getData = async () => {
  const { data } = await projectDetails("1000SP0220180927-Z01")
  projectData.value = data || {}
}

</script>

<style lang="scss" scoped>
.order {
  position: relative;
  .content {
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
    // margin-bottom: 12px;
    padding: 12px 24px;
    border-bottom: 1px solid #ddd;
    background: #fff;
  }
  .fixed {
    position: absolute;
    top: 110px;
    right: 40px;
    cursor: pointer;
    z-index: 999;
  }
  .spacing {
    margin-bottom: 12px;
  }
}
</style>