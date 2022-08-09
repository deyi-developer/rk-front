<template>
  <div class="wrap page-bg">
    <el-card v-loading="loading" class="card">
      <div class="form-container">
        <el-form
          label-width="120px"
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-row :style="{ width: '100%' }" :gutter="24">
            <el-col :span="5">
              <el-form-item label="工单编号标题: ">
                <el-input
                  :style="{ width: '80%' }"
                  size="mini"
                  v-model="formInline.orderCode"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="项目编号标题: ">
                <el-input
                  size="mini"
                  v-model="formInline.projectCode"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="提醒事项: ">
                <el-input
                  size="mini"
                  v-model="formInline.noteContext"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
            <el-form-item label="创建人: ">
              <el-select
                v-model="formInline.createById"
                size="mini"
                filterable
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
            </el-form-item>
          </el-col> -->
            <el-col :span="7">
              <el-form-item>
                <div class="title-finish">
                  <el-button
                    size="mini"
                    :icon="
                      toggleDownFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                    "
                    @click="toggleDownFlag = !toggleDownFlag"
                    >{{ toggleDownFlag ? "收起" : "更多" }}</el-button
                  >
                  <el-button size="mini" plain @click="reset">重置</el-button>
                  <el-button size="mini" type="primary" @click="submit"
                    >搜索</el-button
                  >
                  <el-button size="mini" type="primary" @click="deleteApi"
                    >完成</el-button
                  >
                  <el-button
                    size="mini"
                    type="primary"
                    @click="dialogVisible = true"
                    >添加提醒事项</el-button
                  >
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form
          label-width="120px"
          v-show="toggleDownFlag"
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-row :style="{ width: '100%' }" :gutter="24">
            <el-col :span="5">
              <el-form-item label="截止日期: ">
                <el-date-picker
                  size="mini"
                  v-model="formInline.headerEndDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div
        class="contail"
        v-infinite-scroll="load"
        infinite-scroll-delay="500"
        :infinite-scroll-immediate="false"
      >
        <el-collapse value="activeNames">
          <el-checkbox-group v-model="checkedCities">
            <transition-group name="flip-list">
              <ListItem
                v-for="(itemElement, index) of this.noteData"
                :key="itemElement.noteId"
                :dataSource="itemElement"
                :index="index"
              />
            </transition-group>
          </el-checkbox-group>
        </el-collapse>
      </div>
    </el-card>
    <!-- 提醒弹框 -->
    <BacklogDialog
      :modal="true"
      :info="{}"
      :dialogVisible="dialogVisible"
      @callBack="callBack"
      @toggleFalse="dialogVisible = false"
    />
  </div>
</template>

<script>
import { getNoteList, editNotes } from "./api";
import ListItem from "./list-item.vue";
import { debounce } from "lodash-es";
import { handlerList } from "../project/api";
import BacklogDialog from "../components/backlog-dialog.vue";
export default {
  dicts: [],
  name: "BacklogList",
  components: {
    ListItem,
    BacklogDialog,
  },
  data() {
    return {
      noteData: [],
      activeNames: [],
      checkedCities: [],
      dialogVisible: false,
      formInline: {},
      handlerLoding: false,
      handlers: [],
      toggleDownFlag: false,
      loading: true,
      pageNum: 1,
      pageSize: 20,
      totalPage: 1,
    };
  },
  async created() {
    this.getHandlers();
    // 获取初始数据
    this.resetLoad();
  },
  methods: {
    async resetLoad() {
      const params = {
        pageNum: 1,
        pageSize: this.pageSize,
      };
      const { code, rows, total } = await getNoteList(params);
      if (code === 200) {
        this.loading = false;
        this.noteData = rows;
        this.pageNum = 1;
        // 初始计算最大页码
        this.totalPage = Math.ceil(total / 20);
        return true;
      }
      return this.$modal.msgError("接口错误");
    },
    async deleteApi() {
      if (this.checkedCities.length === 0) {
        return this.$modal.msgError("请至少选择一条数据");
      }
      const { code, msg = "操作错误" } = await editNotes(
        this.checkedCities.join(",")
      );
      if (code === 200) {
        this.checkedCities.forEach((element) => {
          const note = this.noteData.splice(
            this.noteData.findIndex(
              (item) => Number(item.noteId) === Number(element)
            ),
            1
          );
          // 查找未完成数据的第一条数据的索引
          const index = this.noteData.findIndex((item) => {
            return item.noteStatus === 1;
          });
          // 把完成的数据改一下noteStatus：1，放到完成的集合里面的最上面,如果当前页没有未完成的数据，那么则把数据放在最后一条
          this.noteData.splice(index < 0 ? this.noteData.length : index, 0, {
            ...note[0],
            noteStatus: 1,
          });
        });
        // 清空选中列表
        this.checkedCities = [];
        return true;
      }
      return this.$modal.msgSuccess(msg);
    },
    async callBack() {
      this.dialogVisible = false;
      // 获取初始数据
      this.resetLoad();
    },
    load() {
      // 如果是最后一页，并且不是第一页，则不请求数据
      if (this.totalPage <= this.pageNum) {
        this.totalPage !== 1 && this.$modal.msgError("没有更多了");
        return true;
      }
      // 触底分页参数累加
      this.pageNum += 1;
      this.submit("yesLoad");
    },
    async submit(type) {
      this.loading = true;
      if (this.formInline.headerEndDate) {
        this.formInline = {
          ...this.formInline,
          queryStartTime: this.dayjs(this.formInline.headerEndDate[0]).format(
            "YYYY-MM-DD"
          ),
          queryEndTime: this.dayjs(this.formInline.headerEndDate[1]).format(
            "YYYY-MM-DD"
          ),
        };
      } else {
        this.formInline = {
          ...this.formInline,
          queryStartTime: null,
          queryEndTime: null,
        };
      }
      // 每次搜索的时候重置分页参数, 如果是触底加载则不重置
      if (type !== "yesLoad") {
        this.pageNum = 1;
      }
      const params = {
        ...this.formInline,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      delete params.headerEndDate;
      const { code, rows, total } = await getNoteList(params);
      if (code === 200) {
        // 每次搜索都重新计算当前最大页码
        this.totalPage = Math.ceil(total / 20);
        // 接口请求太快，会闪屏，延迟500ms
        setTimeout(() => {
          this.loading = false;
        }, 500);
        // 如果是点击搜索，则直接赋值数据
        if (type !== "yesLoad") {
          document.getElementsByClassName("contail")[0].scrollTop =
            document.getElementsByClassName("contail")[0].scrollTop = 0;
          this.noteData = rows;
          rows.length === 0 && this.$modal.msgError("无数据");
          return true;
        }
        // 如果是下拉加载数据，则push追加数据
        this.noteData.push(...rows);
      }
    },
    reset() {
      this.formInline = {};
    },
    getHandlers: debounce(async function (value) {
      this.handlerLoding = true;
      const params = { pageNum: 1, pageSize: 100, nickName: value };
      const { rows } = await handlerList(params);
      this.handlers = [...rows];
      this.handlerLoding = false;
    }, 500),
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  // padding: 20px;
  .card {
    background-color: #f0f2f5;
    // overflow-y: scroll;
    form {
      display: flex;
      align-items: center;
      // background-color: #f8f8f9 !important;
      padding: 0 10px;
      .el-form-item {
        margin-bottom: 5px;
      }
    }
    ::v-deep .el-card__body {
      // height: calc(100vh - 170px);
      padding: 5px 0px 0px 5px !important;
    }
  }
}
.el-collapse {
  border: none !important;
}
.title-finish {
  border-radius: 5px;
}
.flip-list-move {
  transition: transform 1s;
}
.contail {
  overflow-y: scroll;
  height: 70vh;
  margin: 0 10px;
  background-color: #fff;
  box-shadow: 0 4px 17px 0 rgb(0 0 0 / 20%);
  padding: 10px;
}
.el-form-item {
  white-space: nowrap;
}
.form-container{
  padding: 15px 0 10px 0;
}
</style>
