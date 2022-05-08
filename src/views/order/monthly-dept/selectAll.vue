<template>
  <el-select
    class="mg"
    v-model="selectDeptId"
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
      selectDeptId: -1,
    };
  },
  created() {
    this.selectDeptId = parseInt(this.$route.params.id) || -1;
    getDeptList().then((res) => {
      if (res.code == 200) {
        this.deptList = res.rows;
        this.deptList = [
          {
            oneDeptId: -1,
            oneDeptName: "全部",
          },
          ...this.deptList,
        ];
      }
    });
  },
  methods: {
    update() {
      this.$parent.$parent.setId(this.selectDeptId);
    },
  },
};
</script>
<style lang="scss" scoped>
.mg {
  margin-right: 10px;
}
</style>
