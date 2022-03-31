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

const risk = ref({});

const summary = ref({});

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
