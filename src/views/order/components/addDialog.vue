
<template>
  <el-dialog :title="name" :visible.sync="logVisible" @close="dialogClose">
    <div class="formbox">
      <el-form :model="form" :rules="rules" ref="ruleForm" v-if="logVisible">
        <el-form-item
          label="Checkitem"
          :label-width="formLabelWidth"
          prop="checkItemName"
        >
          <el-input v-model="form.checkItemName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="完成截止时间"
          :label-width="formLabelWidth"
          prop="checkItemEndTime"
        >
          <el-input
            v-model="form.checkItemEndTime"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Checkitem角色"
          :label-width="formLabelWidth"
          prop="checkItemRoleCode"
        >
          <el-select v-model="form.checkItemRoleCode" multiple class="selectStyle">
            <el-option
              v-for="(dict, index) in dict.type.check_item_role_code"
              :key="index"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="描述"
          :label-width="formLabelWidth"
          prop="checkItemDescribe"
        >
          <el-input type="textarea" v-model="form.checkItemDescribe" rows="3"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { CustomRequest as DialogRequest } from "../check-item/api";
export default {
  name: "AddDialog",
  dicts: ["check_item_role_code"],
  data() {
    const RoleCodevalidate = (rule, value, callback) => {
      if (!value.length && !this.firstChange) {
        callback(new Error("请选择Checkitem角色"));
      } else {
        callback();
      }
      this.firstChange = false;
    };
    return {
      form: {
        checkItemName: "",
        checkItemEndTime: "",
        checkItemRoleCode: [],
        checkItemDescribe: "",
      },
      rules: {
        checkItemName: [
          { required: true, message: "请输入checkitem名称", trigger: "blur" },
        ],
        checkItemEndTime: [
          { required: true, message: "请输入截止时间", trigger: "blur" },
        ],
        checkItemRoleCode: [
          {
            validator: RoleCodevalidate,
            required: true,
            trigger: "change",
          },
        ],
        checkItemDescribe: [
          {
            required: true,
            message: "请输入描述",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "140px",
      logVisible: false,
      name: "",
      type: "",
      apiMessage: {},
      requestConfig: {},
    };
  },
  props: {
    Visible: {
      type: [Boolean],
      default: () => false,
    },
    dialogType: {
      type: [Object],
      default: () => {
        return {
          name: "新建",
          type: "add",
        };
      },
    },
    DialogData: {
      type: [Object],
      default: () => {},
    },
  },
  watch: {
    Visible: {
      handler: function (newValue) {
        this.logVisible = newValue;
      },
      immediate: true, // 首次监听
    },
    DialogData: {
      handler: function (newValue) {
        this.form = { ...newValue };
      },
      immediate: true, // 首次监听
      deep: true,
    },
    dialogType: {
      handler: function (newValue) {
        Object.keys(newValue).forEach((v) => {
          this[v] = newValue[v];
        });
      },
      immediate: true, // 首次监听
    },
  },
  created() {
    // 解决首次校验的头疼问题
    this.firstChange = true;
  },
  methods: {
    dialogClose() {
      this.$emit("dialogClose");
    },
    confirm() {
      this.firstChange = false;
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.tableElitorORadd();
        } else {
          return false;
        }
      });
    },
    // 表格新增OR编辑
    async tableElitorORadd() {
      const { requestConfig, form = {} } = this;
      form.checkItemRoleCode = form.checkItemRoleCode.join(",");
      const { code } = await DialogRequest({ ...requestConfig, data: form });
      this.messageConfig(code, this.apiMessage, () => {
        this.$emit("confirm"), this.$emit("dialogClose");
      });
    },
    messageConfig(code, { success, error }, callback) {
      this.$message(
        code === 200
          ? { message: success, type: "success" }
          : { message: error }
      );
      callback();
    },
  },
};
</script>

<style  scoped lang="scss">
.formbox {
  padding: 0 40px 0 40px;
}
.selectStyle{
  width: 100%;
}
</style>