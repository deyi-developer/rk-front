<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card shadow="always" class="box-card">
        <el-descriptions :column="2" title="基础指标" border>
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="PJTD含税总收入"
            >{{ data.pjtdTotalMoney }}</el-descriptions-item
          >
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="总开票"
            >{{ data.totalBilling }}</el-descriptions-item
          >
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="相对PJTD开票率"
            >{{
              data.billingRateOfTotalPjtd
                ? `${data.billingRateOfTotalPjtd}%`
                : ""
            }}</el-descriptions-item
          >

          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="总收款"
            >{{ data.totalReceipts }}</el-descriptions-item
          >
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="相对PJTD收款率"
            >{{
              data.receivedRateOfTotalPjtd
                ? `${data.receivedRateOfTotalPjtd}%`
                : ""
            }}</el-descriptions-item
          >
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="相对总开票收款率"
            >{{
              data.totalBillingRate ? `${data.totalBillingRate}%` : ""
            }}</el-descriptions-item
          >
          <el-descriptions-item :contentStyle="{ textAlign: 'right' }" label="-"
            >-</el-descriptions-item
          >
          <el-descriptions-item :contentStyle="{ textAlign: 'right' }" label="-"
            >-</el-descriptions-item
          >
          <el-descriptions-item :contentStyle="{ textAlign: 'right' }" label="-"
            >-</el-descriptions-item
          >
          <el-descriptions-item :contentStyle="{ textAlign: 'right' }" label="-"
            >-</el-descriptions-item
          >
        </el-descriptions>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <el-row>
          <el-descriptions :column="2" title="基于账期指标" border>
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总应开金额"
              >{{ data.totalShouldBillingMoney }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总已开金额"
              >{{ data.totalAlreadyBillingMoney }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总应开未开"
              >{{ data.totalShouldNotBillingMoney }}</el-descriptions-item
            >

            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="相对应开开票率"
              >{{ data.correspondingBillingRate }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总应收金额"
              >{{ data.totalShouldReceiptsMoney }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总已收金额"
              >{{ data.totalReceiptssMoney }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总应收未收（相对应收）"
              >{{ data.totalShouldNotReceiptsMoney }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总应收未收（相对已开）"
              >{{ data.totalShouldNotReceiptsBilling }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="相对应收收款率"
              >{{
                data.relativeReceivableRate
                  ? `${data.relativeReceivableRate}%`
                  : ""
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="相对已开收款率"
              >{{
                data.relativeOpenedCollectionRate
                  ? `${data.relativeOpenedCollectionRate}%`
                  : ""
              }}</el-descriptions-item
            >
          </el-descriptions>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    default() {
      return {};
    }
  }
});
</script>
<style lang="scss" scoped>
.box-card {
  margin-bottom: 10px;
}
</style>
<style lang="scss"></style>
