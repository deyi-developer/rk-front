<!-- <template>
  <div class="wrap">
    <el-row>
      <el-card style="margin-bottom: 10px;">
        <div slot="header">
          <span class="header">一语中的：收入增加，毛利下降，经营恶化</span>
        </div>
        <el-descriptions :column="3" border>
          <el-descriptions-item label="本期收入总额">1810000</el-descriptions-item>
          <el-descriptions-item label="总开票">1810000</el-descriptions-item>
          <el-descriptions-item label="相对PJTD开票率">1810000</el-descriptions-item>
          <el-descriptions-item label="总收款率">1810000</el-descriptions-item>
          <el-descriptions-item label="相对PJTD收款率">1810000</el-descriptions-item>
          <el-descriptions-item label="相对总开票收款率">1810000</el-descriptions-item>
          <el-descriptions-item label="相对PJTD收款率">1810000</el-descriptions-item>
          <el-descriptions-item label="相对总开票收款率">1810000</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card style="margin-bottom: 10px;">
        <el-descriptions :column="3" border>
          <el-descriptions-item label="PJTD含税总收入">1810000</el-descriptions-item>
          <el-descriptions-item label="总开票">1810000</el-descriptions-item>
          <el-descriptions-item label="相对PJTD开票率">1810000</el-descriptions-item>
          <el-descriptions-item label="总收款率">1810000</el-descriptions-item>
          <el-descriptions-item label="相对PJTD收款率">1810000</el-descriptions-item>
          <el-descriptions-item label="相对总开票收款率">1810000</el-descriptions-item>
          <el-descriptions-item label="相对PJTD收款率">1810000</el-descriptions-item>
          <el-descriptions-item label="相对总开票收款率">1810000</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card>
        <div>总项目数：100个，高风险项目：3，中风险：3，低风险：10</div>
        <el-row>
          <el-col :span="12">
            <pie-chart :options="options"></pie-chart>
          </el-col>
          <el-col :span="12">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" width="180"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
      <el-card style="margin-top: 10px;">
        <div slot="header">
          <span class="header">环比对照</span>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>
<script setup>
import PieChart from "../../dashboard/PieChart";
import { ref } from "@vue/composition-api";

const tableData = ref([{
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
}])

const options = ref({
  title: {
    show: false
  },
  series: {
    name: "Access From",
    type: "pie",
    radius: "70%",
    data: [
      { value: 1048, name: "已开" },
      { value: 735, name: "超90天应开未开" },
      { value: 580, name: "超60-90天应开未开" },
      { value: 484, name: "超30-60天应开未开" },
      { value: 300, name: "超30天应开未开" }
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: "rgba(0, 0, 0, 0.5)"
      }
    }
  }
})

</script>
<style lang="scss" scoped>
.wrap {
  margin: 20px;
  .header {
    font-weight: bold;
  }
}
</style> -->