<template>
  <el-dialog title="发起工单" width="70%" :visible.sync="dialogVisible" :before-close="beforeClose">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="150px">
      <el-form-item label="工单标题:" prop="eventTitle">
        <el-input style="width: 80%;" v-model="form.eventTitle"></el-input>
      </el-form-item>
      <el-form-item label="工单类型:" prop="eventType">
        <el-select style="width: 80%;" placeholder="请选择工单类型" v-model="form.eventType" clearable>
          <el-option
            v-for="dict in dict.type.event_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工单内容:" prop="eventContext">
        <editor v-model="form.eventContext" style="width: 80%;" :height="100"></editor>
      </el-form-item>
      <el-form-item label="工单级别:" prop="eventUrgencyLevel">
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
      <el-form-item label="工单处理人:" prop="eventHandler">
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
      <el-form-item label="工单完成截止日期" prop="eventHandleDate">
        <el-date-picker
          style="width: 80%;"
          v-model="form.eventHandleDate"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
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
import { debounce } from "lodash-es";
import { send, update, handlerList } from "../project/api"
// import editor from "@/components/Editor";
export default {
  dicts: ["event_type", "event_urgency_level"],
  props: {
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
    },
    /** 如果登录人员不是项目经理，负责人需要默认显示此项目的项目经理, nickName用于接口请求 */
    isPm: {
      type: Boolean,
    },
    pmName: {
      type: String
    }
    /** end */
  },
  data() {
    return {
      rules: {
        eventTitle: [
          { required: true, message: '请输入工单标题', trigger: 'change' },
        ],
        eventType: [
          { required: true, message: '请输入选择工单类型', trigger: 'change' },
        ],
        eventContext: [
          { required: true, message: '请输入工单内容', trigger: 'change' },
        ],
        eventUrgencyLevel: [
          { required: true, message: '请选择工单级别', trigger: 'change' },
        ],
        eventHandler: [
          { required: true, message: '请选择工单处理人', trigger: 'change' },
        ],
        eventHandleDate: [
          { required: true, message: '请选择工单完成截止日期', trigger: 'change' },
        ]
      },
      handlers: [],
      handlerLoding: false
    }
  },
  watch: {
    pmName(n) {
      this.defaultHandler(n)
    }
  },
  created() {
    if (this.isPm) { // 一切如常，无事发生
      this.getHandlers()
    } else { // 走默认显示的路子
      this.defaultHandler(this.pmName)
    }
  },

  methods: {
    submit() {
      if (this.type === 'add') {
        this.sendWorkOrder()
      } else {
        this.updateWorkOrder()
      }
    },

    sendWorkOrder() {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          const { code, msg } = await send(this.form)
          if (code == 200) {
            this.close()
            this.refresh()
            this.$router.push({ path: '/order/order-list' })
          }
          this.message(code, msg)
        }
      })
    },

    updateWorkOrder() {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          const { code, msg } = await update(this.form)
          if (code == 200) {
            this.close()
            this.refresh()
          }
          this.message(code, msg)
        }
      })
    },

    close() {
      this.$emit('update:dialogVisible', false)
      this.$refs.formRef.resetFields();
    },

    /** 刷新父组件的列表 */
    refresh() {
      this.$emit('refresh')
    },

    /** 提示 */
    message(code, msg) {
      if (code === 200) {
        this.$modal.msgSuccess(msg)
      } else {
        this.$modal.msgError(msg)
      }
    },

    beforeClose() {
      this.close()
    },

    async defaultHandler(nickName) {
      if (!nickName) return
      const params = {
        pageNum: 1,
        pageSize: 100,
      }
      const { rows } = await handlerList(params)
      this.handlers = rows || []

      this.form.eventHandler = this.handlers.find(item => item.nickName === nickName).userId
    },

    getHandlers: debounce(async function (value) {
      this.handlerLoding = true
      const params = {
        pageNum: 1,
        pageSize: 100,
        nickName: value || '',
      }
      const { rows } = await handlerList(params)
      this.handlers = rows || []
      this.handlerLoding = false
    })
  }
}
</script>
