<template>
  <div class="list">
    <filter-form></filter-form>
    <el-table style="width: 100%">
      <el-table-column prop="date" label="服务单编号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="标题" width="180"> </el-table-column>
      <el-table-column prop="address" label="状态"> </el-table-column>
      <el-table-column prop="address" label="优先级"> </el-table-column>
      <el-table-column prop="address" label="提单人"> </el-table-column>
      <el-table-column prop="address" label="提交时间"> </el-table-column>
      <el-table-column prop="address" label="处理人"> </el-table-column>
      <el-table-column prop="address" label="处理组"> </el-table-column>
      <el-table-column prop="address" label="最后更新时间"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import FilterForm from "./filterForm.vue";
export default {
  components: {
    FilterForm,
  },
};
</script>

<style lang="scss" scoped>
.list {
  padding: 12px;
  background: #fff;
}
</style>