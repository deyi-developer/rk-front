<template>
  <div class="wrap page-bg">
    <el-card class="card">
      <div class="title-finish">
        <el-button size="mini" type="primary" @click="deleteApi"
          >完成</el-button
        >
        <el-button
          size="mini"
          type="primary"
          plain
          @click="dialogVisible = true"
          >添加提醒事项</el-button
        >
      </div>
      <el-collapse value="activeNames">
        <el-checkbox-group v-model="checkedCities">
          <transition-group name="flip-list">
            <ListItem
              v-for="(itemElement, index) of this.noteData"
              :key="itemElement.noteId"
              :dataSource="itemElement"
              :index="index"
            />
            <ListItem
              v-for="(itemElement, index) of this.unfinishedNoteData"
              :key="itemElement.noteId"
              :dataSource="itemElement"
              :index="index"
            />
          </transition-group>
        </el-checkbox-group>
      </el-collapse>
    </el-card>
    <!-- 提醒弹框 -->
    <BacklogDialog :modal="true" :info="{}" :dialogVisible="dialogVisible" @callBack="callBack" @toggleFalse="dialogVisible = false" />
  </div>
</template>

<script>
import { getNoteList, editNotes } from "./api";
import ListItem from "./list-item.vue";
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
      unfinishedNoteData: [],
      dialogVisible: false,
    };
  },
  async created() {
    // 获取未完成列表数据
    const { rows } = await getNoteList("0");
    this.noteData = rows;
    // 获取已完成列表数据
    const unfinishedData = await getNoteList("1");
    this.unfinishedNoteData = unfinishedData.rows;
  },
  methods: {
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
          // 把完成的数据改一下字段，放到完成的集合里面去
          this.unfinishedNoteData.splice(0, 0, { ...note[0], noteStatus: 1 });
          console.log(this.unfinishedNoteData);
        });
        // 清空选中列表
        this.checkedCities = [];
        return true;
      }
      return this.$modal.msgSuccess(msg);
    },
    async callBack(){
      this.dialogVisible = false
      // 获取未完成列表数据
      const { rows } = await getNoteList("0");
      this.noteData = rows;
    }
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  // padding: 20px;
  background-color: #f8f8f9;
  .card {
    // overflow-y: scroll;
    background-color: #f8f8f9 !important;
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
  padding: 5px 20px 5px 3px;
  margin: 3px 10px 5px 0px;
  border-radius: 5px;
}
.flip-list-move {
  transition: transform 1s;
}
</style>
