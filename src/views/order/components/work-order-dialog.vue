<template>
  <el-dialog title="发起工单" width="70%" :visible.sync="dialogVisible" :before-close="beforeClose">
    <el-form :model="form" label-width="100px">
      <el-form-item label="工单标题:">
        <el-input style="width: 80%;" v-model="form.eventTitle"></el-input>
      </el-form-item>
      <el-form-item label="工单类型:">
        <el-select style="width: 80%;" placeholder="请选择工单类型" v-model="form.eventType" clearable>
          <el-option
            v-for="dict in dict.type.event_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工单内容:">
        <template v-slot="scope">
          <editor v-model="form.eventContext" style="width: 80%;" :height="100"></editor>
        </template>
      </el-form-item>
      <div v-if="type === 'add'">
        <el-form-item label="工单级别:">
          <el-select
            style="width: 80%;"
            placeholder="请选择工单级别"
            v-model="form.eventUrgencyLevel"
            clearable
          >
            <el-option
              v-for="dict in dict.type.event_urgency_level"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工单处理人:">
          <el-select
            style="width: 80%;"
            v-model="form.eventHandler"
            filterable
            placeholder="请选择工单处理人"
            :filter-method="getHandlers"
            :loading="handlerLoding"
          >
            <el-option
              v-for="item in handlers"
              :key="item.userId"
              :label="item.nickName"
              :value="item.userId"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <!-- <el-form-item label="关联项目:">
        <el-input style="width: 80%;" v-model="form.projectCode"></el-input>
      </el-form-item>-->
    </el-form>
    <div slot="footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  dicts: ["event_type", "event_urgency_level"],
}
</script>
<script setup>
import vm from 'vue'
import router from '@/router/index';
import { debounce } from "lodash-es";
import { send, update, handlerList } from "../project/api"
import { ref, reactive, defineProps, defineEmits, onMounted } from "@vue/composition-api";
import editor from "@/components/Editor";

/** props */
const props = defineProps({
  form: {
    type: Object,
    default: () => { }
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  type: { // 新增或编辑,编辑不显示工单级别
    type: String,
    default: 'add'
  }
})

/** emit */
const emit = defineEmits(['dialogVisible', 'refresh'])

/** 提交 */
const submit = async () => {
  if (props.type === 'add') {
    sendWorkOrder()
  } else {
    updateWorkOrder()
  }
}

/** 新增 */
const sendWorkOrder = async () => {
  const { code, msg } = await send(props.form)
  if (code == 200) {
    close()
    refresh()
    router.push({ name: 'order-list' })
  }
  message(code, msg)
}

/** 修改 */
const updateWorkOrder = async () => {
  const { code, msg } = await update(props.form)
  if (code == 200) {
    close()
    refresh()
  }
  message(code, msg)
}

/** 关闭弹窗 */
const close = () => {
  emit('update:dialogVisible', false)
}

/** 刷新父组件的列表 */
const refresh = () => {
  emit('refresh')
}

/** 提示 */
const message = (code, msg) => {
  if (code === 200) {
    vm.prototype.$modal.msgSuccess(msg)
  } else {
    vm.prototype.$modal.msgError(msg)
  }
}

const beforeClose = () => {
  close()
}

/** 获取处理人数据 */
let handlers = ref([])
let handlerLoding = ref(false)
const getHandlers = debounce(async (value) => {
  handlerLoding.value = true
  const params = {
    pageNum: 1,
    pageSize: 10, // 只显示十条，如果用户找不到会输入更详细名称
    nickName: value
  }
  const { rows } = await handlerList(params)
  handlers.value = rows || []
  handlerLoding.value = false
}, 500)

</script>