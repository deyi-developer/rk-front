<template>
  <div class="page-bg">
    <div class="table-bg">
      <!-- 表格 -->
      <CheckItemTable tableType="finish" />
    </div>
  </div>
</template>
<script>
import CheckItemTable from "../components/checkItemTable.vue";
export default {
  name: "my-checkItem",
  components: { CheckItemTable },
  data() {
    return {
    };
  },
  created() {},
  watch: {},
  methods: {},
};
</script>
<style scoped lang="scss">
.page-bg {
  padding: 20px;
}
.table-bg {
  padding: 20px;
  min-height: calc(100vh - 84px);
  background-color: #fff;
}
</style>
