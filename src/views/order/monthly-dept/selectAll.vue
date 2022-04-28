<template>
  <el-select
    v-model="selectDeptId"
    size="small"
    placeholder="请选择部门"
    @change="update"
  >
    <el-option
      v-for="dict in deptList"
      :key="dict.oneDeptId"
      :value="dict.oneDeptId"
      :label="dict.oneDeptName"
    ></el-option>
  </el-select>
</template>
<script>
import { getDeptList } from "@/api/common";
export default {
  data() {
    return {
      deptList: [],
      selectDeptId: 1,
    };
  },
  created() {
    this.selectDeptId = this.$route.params.id
      ? parseInt(this.$route.params.id)
      : 0;
    getDeptList().then((res) => {
      if (res.code == 200) {
        this.deptList = res.rows;
        this.deptList = [
          {
            oneDeptId: 1,
            oneDeptName: "全部",
          },
          ...this.deptList,
        ];
      }
    });
  },
  methods: {
    update() {
      this.$parent.$parent.getCurrentMonthInfo(this.selectDeptId);
    },
  },
};
</script>
<style lang="scss" scoped></style>
