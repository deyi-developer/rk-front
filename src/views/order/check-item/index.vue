<template>
  <div class="page-bg">
    <div class="table-bg">
      <!-- 表格 -->
      <CheckItemTable
        tableType="operate"
      />
    </div>
  </div>
</template>
<script>
import CheckItemTable from "../components/checkItemTable.vue";
import AddDialog from "../components/addDialog.vue";
export default {
  name: "check-item",
  components: { CheckItemTable, AddDialog },
  data() {
    return {
    };
  },
  created() {
  },
  watch: {},
  methods: {
  },
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
