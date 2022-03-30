<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card shadow="always" class="box-card">
        <el-descriptions :column="2" title="基础指标" border>
          <el-descriptions-item label="PJTD含税总收入"
            >1810000</el-descriptions-item
          >
          <el-descriptions-item label="总开票">1810000</el-descriptions-item>
          <el-descriptions-item label="相对PJTD开票率"
            >1810000</el-descriptions-item
          >

          <el-descriptions-item label="总收款率">1810000</el-descriptions-item>
          <el-descriptions-item label="相对PJTD收款率"
            >1810000</el-descriptions-item
          >
          <el-descriptions-item label="相对总开票收款率"
            >1810000</el-descriptions-item
          >
        </el-descriptions>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <el-row>
          <el-descriptions :column="2" title="基于账期指标" border>
            <el-descriptions-item label="PJTD含税总收入"
              >1810000</el-descriptions-item
            >
            <el-descriptions-item label="总开票">1810000</el-descriptions-item>
            <el-descriptions-item label="相对PJTD开票率"
              >1810000</el-descriptions-item
            >

            <el-descriptions-item label="总收款率"
              >1810000</el-descriptions-item
            >
            <el-descriptions-item label="相对PJTD收款率"
              >1810000</el-descriptions-item
            >
            <el-descriptions-item label="相对总开票收款率"
              >1810000</el-descriptions-item
            >
          </el-descriptions>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "tableDesc",
  methods: {}
};
</script>
<style lang="scss" scoped>
.box-card {
  margin-bottom: 10px;
}
</style>
