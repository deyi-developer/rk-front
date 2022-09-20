<template>
  <!-- 添加提醒弹框 -->
  <el-dialog
    title="提示"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    :destroy-on-close="true"
    :show-close="false"
    :modal="modal"
    width="60%"
  >
    <ul class="ul-type">
      <li>
        <label class="space">工单编号:</label>
        <span class="value value-span">
          <el-input
            size="mini"
            v-model="addRemindParams.orderCode"
            maxlength="50"
          />
        </span>
      </li>
      <li>
        <label class="space">项目编号:</label>
        <span class="value value-span">
          <el-input
            size="mini"
            v-model="addRemindParams.projectCode"
            maxlength="50"
          />
        </span>
      </li>
      <li>
        <label class="space"><i class="require-icon">*</i>截止时间:</label>
        <span class="value value-span">
          <el-date-picker
            v-model="addRemindParams.headerEndDate"
            style="width: 100%"
            size="mini"
            type="date"
            filterable
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </span>
      </li>
      <li>
        <label class="space"><i class="require-icon">*</i>创建人:</label>
        <span class="value value-span">
          <el-select
            v-model="addRemindParams.createById"
            style="width: 100%"
            size="mini"
            filterable
            placeholder="请选择工单责任人"
            :filter-method="getHandlers"
            :loading="handlerLoding"
            clearable
          >
            <el-option
              v-for="item in handlers"
              :key="item.userId"
              :label="item.nickName"
              :value="item.userId"
            >
              <span style="float: left">{{ item.nickName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.userId
              }}</span>
            </el-option>
          </el-select>
        </span>
      </li>
      <li>
        <label class="space" style="vertical-align: top"
          ><i class="require-icon">*</i>提醒事项:</label
        >
        <span class="value value-span" :style="{width: '80%'}">
          <editor
            type="textarea"
            size="mini"
            :autosize="{ minRows: 10}"
            v-model="addRemindParams.noteContext"
            :height="300"
            @input="checkContent"
          />
        </span>
      </li>
    </ul>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('toggleFalse')">取 消</el-button>
      <el-button type="primary" @click="addRemind">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { handlerList } from "../project/api";
import { debounce } from "lodash-es";
import { workOrderDetail } from '../send/api'
import editor from "@/components/Editor";
import { mapGetters } from "vuex";
export default {
  dicts: [],
  name: "backlogDialog",
  components: {
    editor
  },
  computed: {
    ...mapGetters(["usersInfo"]),
  },
  props: {
    dialogVisible: {
      type: Boolean,
    },
    modal: {
      type: Boolean,
    },
    index: {
      type: Number,
    },
    info: {
      type: Object,
    },
  },
  data() {
    return {
      handlerLoding: false,
      handlers: [],
      addRemindParams: {
        headerEndDate: null,
        orderCode: "",
        projectCode: "",
        createById:''
      }
    };
  },
  created() {
    this.getHandlers()
    setTimeout(()=>{
      // 提醒弹框的 截止日期，工单和项目编号
      this.addRemindParams.headerEndDate = this.info.headerEndDate
      this.addRemindParams.orderCode = this.info.eventHeaderCode
      this.addRemindParams.projectCode = this.info.projectCode
      this.addRemindParams.createById = this.usersInfo.userId
    },1000)
  },
  methods: {
    // 校验提醒弹框字段
    getRulesAddRemindParams(data){
      console.log(data)
      if(!data.headerEndDate||!data.headerEndDate.trim()){
        this.$modal.msgError('截止时间不能为空');
        return false
      }
      if(!data.createById){
        this.$modal.msgError('创建人不能为空');
        return false
      }
      if(!data.noteContext||!data.noteContext.trim()){
        this.$modal.msgError('提醒事项不能为空');
        return false
      }
      return true
    },
    async addRemind() {
      // 如果校验不通过，则弹框提示，并且不关闭新增弹框
      if(!this.getRulesAddRemindParams(this.addRemindParams)){
        return true
      }
      const { code, msg } = await workOrderDetail(this.addRemindParams)
      if(code === 200){
        this.$modal.msgSuccess(msg);
        this.$emit('callBack')
        this.$emit('toggleFalse')
        // 隐藏弹框之后清空创建人和提醒事项并且还原截止日期
        this.addRemindParams = {
          ...this.addRemindParams,
          noteContext: '',
          orderCode: this.info.eventHeaderCode,
          projectCode: this.info.projectCode,
          headerEndDate: this.info.headerEndDate
        }
      }
      // this.$emit('addRemind', this.addRemindParams)
    },
    // 校验提醒弹框字段
    getRulesAddRemindParams(data){
      console.log(data)
      if(!data.headerEndDate||!data.headerEndDate.trim()){
        this.$modal.msgError('截止时间不能为空');
        return false
      }
      if(!data.createById){
        this.$modal.msgError('创建人不能为空');
        return false
      }
      if(!data.noteContext||!data.noteContext.trim()){
        this.$modal.msgError('提醒事项不能为空');
        return false
      }
      return true
    },
    getHandlers: debounce(async function (value) {
      this.handlerLoding = true;
      const params = { pageNum: 1, pageSize: 100, nickName: value };
      const { rows } = await handlerList(params);
      this.handlers = rows;
      this.handlerLoding = false;
    }, 500),
  },
};
</script>
<style lang="scss" scoped>
.require-icon {
  font-size: 8px;
  color: red;
  margin-right: 2px;
}
.ul-type {
  list-style-type: none;
  > li {
    margin-bottom: 10px;
    white-space: nowrap;
    .space {
      display: inline-block;
      // min-width: 60px;
      margin-right: 6px;
      font-weight: 400;
    }
    > label {
      width: 130px;
      display: inline-block;
      text-align: right;
    }
  }
}

.value-span {
  display: inline-block;
  margin-left: 5px;
  width: 60%;
}
.value {
  // color: #909399;
  font-size: 14px;
  font-weight: 400;
  color: #2b2d38;
}
</style>
