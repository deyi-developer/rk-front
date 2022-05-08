<template>
  <el-row :gutter="10" class="table-desc">
    <el-col :span="12">
      <el-card shadow="always" class="box-card">
        <el-descriptions :column="2" title="基础指标" border>
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="PJTD含税总收入"
          >
            <span v-if="$route.name === 'Index'" style="font-size: 12px">
              {{ summary.pjtdTotalMoney | currency }}
            </span>
            <el-link
              v-else
              style="font-size: 12px"
              type="primary"
              @click="toItemDetails(1)"
              >{{ summary.pjtdTotalMoney | currency }}</el-link
            >
          </el-descriptions-item>
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="总已开金额"
          >
            <span v-if="$route.name === 'Index'" style="font-size: 12px">
              {{ summary.totalBilling | currency }}
            </span>
            <el-link
              v-else
              style="font-size: 12px"
              type="primary"
              @click="toItemDetails(2)"
              >{{ summary.totalBilling | currency }}</el-link
            >
          </el-descriptions-item>
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="相对PJTD开票率"
            >{{
              summary.billingRateOfTotalPjtd | percent
            }}</el-descriptions-item
          >

          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="总已收金额"
          >
            <span v-if="$route.name === 'Index'" style="font-size: 12px">
              {{ summary.totalReceipts | currency }}
            </span>
            <el-link
              v-else
              style="font-size: 12px"
              type="primary"
              @click="toItemDetails(3)"
              >{{ summary.totalReceipts | currency }}</el-link
            >
          </el-descriptions-item>
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="相对PJTD收款率"
            >{{
              summary.receivedRateOfTotalPjtd | percent
            }}</el-descriptions-item
          >
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="收款率(相对已开)"
            >{{ summary.totalBillingRate | percent }}</el-descriptions-item
          >
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="未开票金额(相对PJTD)"
            >{{
              formatVal(summary.pjtdTotalMoney, summary.totalBilling) | currency
            }}</el-descriptions-item
          >
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="未收款金额(相对PJTD)"
            >{{
              formatVal(summary.pjtdTotalMoney, summary.totalReceipts)
                | currency
            }}</el-descriptions-item
          >
          <el-descriptions-item
            :contentStyle="{ textAlign: 'right' }"
            label="未收款金额(相对已开)"
            >{{
              formatVal(summary.totalBilling, summary.totalReceipts) | currency
            }}</el-descriptions-item
          >
          <el-descriptions-item
            :contentStyle="{ textAlign: 'center' }"
            :labelStyle="{ textAlign: 'center' }"
            label="-"
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
              >{{
                summary.totalShouldBillingMoney | currency
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总已开金额"
            >
              <span v-if="$route.name === 'Index'" style="font-size: 12px">
                {{ summary.totalAlreadyBillingMoney | currency }}
              </span>
              <el-link
                v-else
                style="font-size: 12px"
                type="primary"
                @click="toItemDetails(2)"
                >{{ summary.totalAlreadyBillingMoney | currency }}</el-link
              >
            </el-descriptions-item>
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              labelClassName="boldClass"
              contentClassName="boldClass"
              label="总应开未开"
              >{{
                summary.totalShouldNotBillingMoney | currency
              }}</el-descriptions-item
            >

            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="相对应开开票率"
              labelClassName="boldClass"
              contentClassName="boldClass"
              >{{
                summary.correspondingBillingRate | percent
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总应收金额"
              >{{
                summary.totalShouldReceiptsMoney | currency
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总已收金额"
            >
              <span v-if="$route.name === 'Index'" style="font-size: 12px">
                {{ summary.totalReceiptssMoney | currency }}
              </span>
              <el-link
                v-else
                style="font-size: 12px"
                type="primary"
                @click="toItemDetails(3)"
                >{{ summary.totalReceiptssMoney | currency }}</el-link
              >
            </el-descriptions-item>
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总应收未收(相对应收)"
              labelClassName="boldClass"
              contentClassName="boldClass"
              >{{
                summary.totalShouldNotReceiptsMoney | currency
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="总应收未收(相对已开)"
              >{{
                summary.totalShouldNotReceiptsBilling | currency
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="相对应收收款率"
              labelClassName="boldClass"
              contentClassName="boldClass"
              >{{
                summary.relativeReceivableRate | percent
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :contentStyle="{ textAlign: 'right' }"
              label="相对已开收款率"
              >{{
                summary.relativeOpenedCollectionRate | percent
              }}</el-descriptions-item
            >
          </el-descriptions>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { isNumber } from "lodash-es";
export default {
  props: {
    summary: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    formatVal(a, b) {
      if (isNumber(a) && isNumber(b)) {
        return a - b;
      } else {
        return 0;
      }
    },

    toItemDetails(type) {
      this.$router.push({
        path: `/project/item/${this.summary.projectCode}?projectCode=${this.summary.projectCode}&name=${this.summary.projectName}&type=${type}`,
      });
      // if (this.$route.name === 'Index') {
      //   this.$router.push({
      //     path: `/project/item/1?type=${type}`,
      //   });
      // } else {

      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 10px;
}
</style>
<style lang="scss" scoped>
.table-desc {
  .el-descriptions-row {
    th,
    td {
      font-size: 12px;
    }
  }
}
::v-deep .boldClass {
  color: #000;
  font-weight: bold;
}
</style>
