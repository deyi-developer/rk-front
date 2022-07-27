<template>
  <div class="wrap page-bg">
    <el-card class="card">
      <ul class="infinite-list" style="overflow: auto">
        <li v-for="item in noteData" :key="item.noteId" class="infinite-list-item">{{ item.noteId }}</li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { getNoteList } from "./api";
export default {
  dicts: [],
  name: "BacklogList",
  components: {},
  data() {
    return {
      noteData: [],
    };
  },
  async created() {
    const { rows } = await getNoteList();
    this.noteData = rows;
    console.log(this.noteData)
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.wrap {
  padding: 20px;
  .card {
    ::v-deep .el-card__body {
      height: calc(100vh - 170px);
    }
  }
}
</style>
