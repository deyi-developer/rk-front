<template>
  <div class="wrap">
    <el-card class="space">
      <div slot="header" class="clearfix">
        <span>当月计划</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <column-chart></column-chart>
    </el-card>
  </div>
</template>
<script>
import ColumnChart from '../../dashboard/ColumnChart'
export default {
  components: {
    ColumnChart
  },

  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  margin: 20px;
  .space {
    margin-bottom: 12px;
  }
}
</style>