<template>
  <div class="wrap">
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column prop="eventTitle" label="工单标题" width="180"></el-table-column>
        <el-table-column prop="eventType" label="工单类型" width="180">
          <template v-slot="scope">
            <span>{{ selectDictLabel(dict.type.event_type, scope.row.eventType) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="eventContext" label="工单内容">
          <template v-slot="scope">
            <span v-html="scope.row.eventContext"></span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="eventUrgencyLevel" label="工单级别">
          <template v-slot="scope">
            <span>{{ selectDictLabel(dict.type.event_urgency_level, scope.row.eventUrgencyLevel) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="eventHandler" label="工单处理人"></el-table-column>-->
        <el-table-column prop="projectCode" label="关联项目"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <div>
              <el-button size="small" @click="update(scope.row)">修改</el-button>
              <el-button
                size="small"
                @click="() => $router.push({ name: 'send', query: { id: scope.row.eventHeaderId } })"
              >详情</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <work-order-dialog
      type="update"
      :form="form"
      :dialogVisible.sync="dialogVisible"
      @refresh="() => getList()"
    ></work-order-dialog>
  </div>
</template>
<script>
export default {
  dicts: ["event_type", "event_urgency_level"]
}
</script>
<script setup>
import { ref, onMounted } from "@vue/composition-api";
import { list } from './api'
import workOrderDialog from '../components/work-order-dialog'

onMounted(() => {
  getList()
})

let tableData = ref([])
const getList = async () => {
  const { rows } = await list()
  tableData.value = rows
}

let form = ref({
  eventTitle: '',
  eventType: '',
  eventMsg: '',
  eventHandler: '',
  eventUrgencyLevel: '',
  projectCode: ''
})

let dialogVisible = ref(false)
const update = (row) => {
  form.value = { ...row }
  dialogVisible.value = true
}

const detail = (id) => {

}

</script>
<style lang="scss" scoped>
.wrap {
  margin: 20px;
}
</style>