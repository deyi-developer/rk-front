<template>
  <div class="app-container home">
    <PanelGroup :risk="risk" />
    <TableDesc :summary="summary" />
    <ChartsGroup />
  </div>
</template>
<script>
export default {
  name: "Index"
};
</script>
<script setup>
import { getSummary, getRiskNum } from "./dashboard/api";
import ChartsGroup from "./dashboard/ChartsGroup.vue";
import PanelGroup from "./dashboard/PanelGroup.vue";
import TableDesc from "./dashboard/TableDesc.vue";
import { ref, onMounted } from "@vue/composition-api";
onMounted(() => {
  fetchData();
});

const risk = ref({
  highRiskProjectNum: 0,
  highRiskProjectRate: 0,
  mediumRiskProjectNum: 0,
  mediumRiskProjectRate: 0,
  noRiskProjectNum: 0,
  noRiskProjectRate: 0,
  totalProjectNum: 0
});

const summary = ref({
  billingMoney30Day: 0,
  billingMoney30to60Day: 0,
  billingMoney60to90Day: 0,
  billingMoney90Day: 0,
  billingRateOfTotalPjtd: 0,
  correspondingBillingRate: 0,
  pjtdTotalMoney: 0,
  receiptsMoney30Day: 0,
  receiptsMoney30to60Day: 0,
  receiptsMoney60to90Day: 0,
  receiptsMoney90Day: 0,
  receivedRateOfTotalPjtd: 0,
  relativeReceivableRate: 0,
  totalAlreadyBillingMoney: 0,
  totalBilling: 0,
  totalReceipts: 0,
  totalReceiptssMoney: 0,
  totalShouldBillingMoney: 0,
  totalShouldNotBillingMoney: 0,
  totalShouldNotReceiptsBilling: 0,
  totalShouldNotReceiptsMoney: 0,
  totalShouldReceiptsMoney: 0
});

function fetchData() {
  getRiskNum().then((res) => {
    if (res) {
      risk.value = res;
    }
  });
  getSummary().then((res) => {
    if (res) {
      summary.value = res;
    }
  });
}
</script>

<style scoped lang="scss">
.home {
  .box-card {
    margin-bottom: 10px;
  }
  .echarts-panel {
    background: #fff;
    padding: 20px;
  }
}
</style>
