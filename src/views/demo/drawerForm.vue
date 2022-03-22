<!-- 添加或修改风控需求对话框 -->
<template>
  <el-drawer
    class="demand-drawer"
    :title="title"
    :visible.sync="open"
    :size="700"
    :wrapperClosable="false"
    :close-on-press-escape="false"
    :before-close="cancel"
  >
    <div class="content">
      <el-form ref="form" :model="form" label-width="120px">
        <section style="padding-bottom: 20px">
          <el-divider content-position="left">基本信息</el-divider>
          <el-row>
            <el-col :span="24">
              <el-form-item
                :rules="{
                  required: true,
                  message: '需求名称不能为空',
                  trigger: 'blur',
                }"
                label="需求名称"
                prop="demandName"
              >
                <el-input
                  v-model="form.demandName"
                  placeholder="请输入需求名称"
                />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item
                :rules="{
                  required: true,
                  message: '状态不能为空',
                  trigger: 'blur',
                }"
                label="状态"
                prop="demandStatus"
              >
                <el-select
                  v-model="form.demandStatus"
                  filterable
                  placeholder="请选择状态"
                >
                  <el-option
                    v-for="item in demandStatusMap"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                :rules="{
                  required: true,
                  message: '项目名称不能为空',
                  trigger: 'blur',
                }"
                label="关联项目"
                prop="projectId"
              >
                <el-select
                  v-model="form.projectId"
                  filterable
                  placeholder="请选择项目"
                >
                  <el-option
                    v-for="item in projectList"
                    :key="item.projectId"
                    :label="item.projectName"
                    :value="item.projectId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="岗位类型"
                :rules="{
                  required: true,
                  message: '岗位类型不能为空',
                  trigger: 'blur',
                }"
                prop="demandType"
              >
                <el-select
                  style="width: 100%"
                  v-model="form.demandType"
                  clearable
                  size="small"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="dict in dict.type.demand_type"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="需求联系人"
                :rules="{
                  required: true,
                  message: '需求联系人不能为空',
                  trigger: 'blur',
                }"
                prop="demandContactName"
              >
                <el-input
                  v-model="form.demandContactName"
                  placeholder="请输入需求联系人名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="需求联系人电话"
                :rules="{
                  required: true,
                  message: '需求联系人电话不能为空',
                  pattern: PHONEREG,
                  trigger: 'blur',
                }"
                prop="demandContact"
              >
                <el-input
                  v-model="form.demandContact"
                  placeholder="请输入需求联系人电话"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </section>

        <section>
          <el-divider content-position="left">需求详情</el-divider>
          <el-row>
            <el-col :span="12">
              <el-form-item
                :rules="{
                  required: true,
                  message: '数量不能为空',
                  trigger: 'blur',
                }"
                label="风控需求数量"
                prop="demandQuantity"
              >
                <el-input-number
                  v-model="form.demandQuantity"
                  controls-position="right"
                  placeholder="请输入风控需求数量"
                /> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item
                :rules="{
                  required: true,
                  message: '日期不能为空',
                  trigger: 'blur',
                }"
                label="截止日期"
                prop="closingDate"
              >
                <el-date-picker
                  clearable
                  style="width: 100%"
                  size="small"
                  v-model="form.closingDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择截止日期"
                >
                </el-date-picker> </el-form-item
            ></el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item
                :rules="{
                  required: true,
                  message: '最低薪资不能为空',
                  trigger: 'blur',
                }"
                label="最低薪资"
                prop="minSalary"
              >
                <el-input-number
                  v-model="form.minSalary"
                  controls-position="right"
                  placeholder="请输入最低薪资"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :rules="{
                  required: true,
                  message: '最高薪资不能为空',
                  trigger: 'blur',
                }"
                label="最高薪资"
                prop="maxSalary"
              >
                <el-input-number
                  v-model="form.maxSalary"
                  controls-position="right"
                  placeholder="请输入最高薪资"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item
            label="工作地点"
            :rules="{
              required: true,
              message: '工作地点不能为空',
              trigger: 'blur',
            }"
            prop="workPlace"
          >
            <el-input v-model="form.workPlace" placeholder="请输入工作地点" />
          </el-form-item>
          <el-form-item
            :rules="{
              required: true,
              message: '需求描述不能为空',
              trigger: 'blur',
            }"
            label="需求描述"
            prop="demandRemakr"
          >
            <el-input
              v-model="form.demandRemakr"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6 }"
              placeholder="请输入内容"
            />
          </el-form-item>
        </section>
      </el-form>
    </div>

    <div class="footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-drawer>
</template>

<script>
import { PHONEREG, EMAILREG } from "@/utils/reg";

export default {
  dicts: ["demand_type"],
  props: {
    open: Boolean,
    title: String,
    projectList: Array,
    datasource: Object,
  },
  data() {
    return {
      PHONEREG,
      demandStatusMap: [
        {
          label: "正常",
          value: 1,
        },
        {
          label: "停用",
          value: 0,
        },
      ],
      form: {
        demandId: null,
        tenantId: null,
        projectId: null,
        demandName: null,
        demandStatus: 1,
        demandRemakr: null,
        demandQuantity: null,
        closingDate: null,
        minSalary: null,
        maxSalary: null,
        workPlace: null,
        demandContactName: null,
        demandContact: null,
        deteleFlag: null,
        createBy: null,
        createTime: null,
        updateTime: null,
      },
    };
  },
  watch: {
    datasource(newV) {
      this.form = newV;
    },
  },
  components: {},
  methods: {
    // 关闭
    cancel() {
      this.$refs["form"].resetFields();
      this.$emit("update:open", false);
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$emit("submit", this.form);
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.demand-drawer {
  .content {
    padding: 0 20px;
    height: calc(100% - 45px);
    overflow: auto;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #eee;
    padding: 5px 20px;
    height: 45px;
  }
}
</style>
