<template>
  <div class="order">
    <header class="header">
      <h1>项目明细</h1>
      <p style="margin-left: 9%">开票中风险，收款高风险</p>
      <el-button style="margin-left: auto" type="primary">保存</el-button>
    </header>
    <div class="content">
      <!-- <el-button class="fixed" type="primary" size="small">服务工单</el-button> -->
      <el-form>
        <el-card class="spacing" title="项目基本信息">
          <div slot="header">
            <span>项目基本信息</span>
            <el-button style="float: right; padding: 3px 0" type="text">服务工单</el-button>
          </div>
          <el-row>
            <el-col :span="4">
              <el-form-item label="项目编码:">项目编码</el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="对外项目编码:">对外项目编码</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="项目名称:">项目名称</el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="对外项目名称:">对外项目名称</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="项目状态:">项目状态</el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="项目类型:">项目类型</el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="结算周期:">结算周期</el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="账务账期:">账务周期</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="项目经理工号:">项目经理工号</el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="项目经理姓名:">项目经理姓名</el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="一级部门:">一级部门</el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="项目部门:">项目部门</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="项目创建日期:">项目创建日期</el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="项目开始日期:">项目开始日期</el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="项目结束日期:">项目结束日期</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="最终客户:">最终客户</el-form-item>
            <el-form-item label="项目备注:">项目备注</el-form-item>
          </el-row>
        </el-card>
        <el-card class="spacing">
          <div slot="header">
            <span>收入信息</span>
          </div>
          <el-row>
            <el-col :span="6">
              <el-form-item label="总开票:">总开票</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总收款:">总收款</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="PJTD含税总收入:">PJTD含税总收入</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="相对PJTD收款率:">相对PJTD收款率</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="相对PJTD开票率:">相对PJTD开票率</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="相对总开票收款率:">相对总开票收款率</el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="spacing">
          <div slot="header">
            <span>基于账期指标</span>
          </div>
          <el-row>
            <el-col :span="6">
              <el-form-item label="总应开金额:">总应开金额</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总应收金额:">总应收金额</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="总已开金额:">总已开金额</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总已收金额:">总已收金额</el-form-item>
            </el-col>
          </el-row>
          <el-row>
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
          </el-row>
        </el-card>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectDetail",
  data() {
    return {
      form: {},
    };
  },
};
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