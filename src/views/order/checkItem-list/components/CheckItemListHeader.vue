<template>
  <div class="checkItem-header">
    <el-date-picker v-model="yearMonth" type="month" placeholder="选择月">
    </el-date-picker>
    <vxe-button @click="exportDataEventEmit">默认导出</vxe-button>
  </div>
</template>
<script>
export default {
  props: ["yearMonth", "exportDataEvent"],
  methods: {
    exportDataEventEmit() {
      this.$emit("exportDataEvent");
    },
  },
};
</script>
