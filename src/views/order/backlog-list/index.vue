<template>
  <div class="wrap page-bg">
    <el-card class="card">
      <div class="title-finish">
        <el-button type="primary" @click="deleteApi">完成</el-button>
      </div>
      <el-collapse value="activeNames">
        <el-checkbox-group v-model="checkedCities">
          <transition-group leave-active-class="animated bounceOutRight">
            <ListItem
              v-for="(itemElement, index) of this.noteData"
              :key="itemElement.noteId"
              :dataSource="itemElement"
              :index="index"
            />
          </transition-group>
        </el-checkbox-group>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import { getNoteList, editNotes } from "./api";
import ListItem from "./list-item.vue";
export default {
  dicts: [],
  name: "BacklogList",
  components: {
    ListItem,
  },
  data() {
    return {
      noteData: [],
      activeNames: [],
      checkedCities: [],
    };
  },
  async created() {
    // 获取列表数据
    const { rows } = await getNoteList();
    this.noteData = rows;
  },
  methods: {
    async deleteApi() {
      if (this.checkedCities.length === 0) {
        return this.$modal.msgError("请至少选择一条数据");
      }
      const { code, msg = '操作错误' } = await editNotes(this.checkedCities.join(","));
      if (code === 200) {
        this.checkedCities.forEach((element) => {
          this.noteData.splice(
            this.noteData.findIndex(
              (item) => Number(item.noteId) === Number(element)
            ),
            1
          );
        });
        // 清空选中列表
        this.checkedCities = []
        return true
      }
      return this.$modal.msgSuccess(msg);
    },
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
</style>
