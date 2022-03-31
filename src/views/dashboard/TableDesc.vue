<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card shadow="always" class="box-card">
        <el-descriptions :column="2" title="基础指标" border>
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="PJTD含税总收入"
            >{{ state.pjtdTotalMoney }}</el-descriptions-item
          >
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="总开票"
            >{{ state.totalBilling }}</el-descriptions-item
          >
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="相对PJTD开票率"
            >{{
              state.billingRateOfTotalPjtd
                ? `${state.billingRateOfTotalPjtd}%`
                : ""
            }}</el-descriptions-item
          >

          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="总收款"
            >{{ state.totalReceipts }}</el-descriptions-item
          >
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="相对PJTD收款率"
            >{{
              state.receivedRateOfTotalPjtd
                ? `${state.receivedRateOfTotalPjtd}%`
                : ""
            }}</el-descriptions-item
          >
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="相对总开票收款率"
            >{{
              state.totalBillingRate ? `${state.totalBillingRate}%` : ""
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
              >{{ state.totalShouldBillingMoney }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总已开金额"
              >{{ state.totalAlreadyBillingMoney }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总应开未开"
              >{{ state.totalShouldNotBillingMoney }}</el-descriptions-item
            >

            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="相对应开开票率"
              >{{ state.correspondingBillingRate }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总应收金额"
              >{{ state.totalShouldReceiptsMoney }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总已收金额"
              >{{ state.totalReceiptssMoney }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总应收未收（相对应收）"
              >{{ state.totalShouldNotReceiptsMoney }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总应收未收（相对已开）"
              >{{ state.totalShouldNotReceiptsBilling }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="相对应收收款率"
              >{{
                state.relativeReceivableRate
                  ? `${state.relativeReceivableRate}%`
                  : ""
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="相对已开收款率"
              >{{
                state.relativeOpenedCollectionRate
                  ? `${state.relativeOpenedCollectionRate}%`
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
import { defineProps } from "@vue/composition-api";

defineProps({
  state: Object,
  default: () => {}
});
</script>
<style lang="scss" scoped>
.box-card {
  margin-bottom: 10px;
}
</style>
<style lang="scss"></style>
