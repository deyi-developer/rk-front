<template>
  <div class="checkItem-list">
    <CheckItemListHeader
      :yearMonth="yearMonth"
      @exportDataEvent="exportDataEvent"
    />
    <vxe-table
      border
      ref="checkItemlist1"
      :data="tableData"
      :expand-config="{ lazy: true, loadMethod: loadContentMethod }"
    >
      <vxe-column type="expand" width="80">
        <template #content="{ row }">
          <vxe-table
            border
            ref="checkItemlist2"
            :data="row.detailList"
            class="sontable"
          >
            <vxe-column type="seq" title="序号" width="60"></vxe-column>
            <vxe-column field="name" title="部门名称">
              <template>
                <a href="##" @click="handleOpenBox(row.name)">{{ row.name }}</a>
              </template>
            </vxe-column>
            <vxe-column field="wcs" title="完成数"></vxe-column>
            <vxe-column field="zs" title="总数"></vxe-column>
            <vxe-column field="wcl" title="完成率"></vxe-column>
          </vxe-table>
        </template>
      </vxe-column>
      <vxe-column type="seq" title="序号" width="60"></vxe-column>
      <vxe-column field="name" title="部门名称"></vxe-column>
      <vxe-column field="wcs" title="完成数"></vxe-column>
      <vxe-column field="zs" title="总数"></vxe-column>
      <vxe-column field="wcl" title="完成率"></vxe-column>
    </vxe-table>
    <el-drawer :title="boxName" :visible.sync="drawer" :direction="direction" size="40%">
      <div class="box">
        <CheckItemListHeader
          :yearMonth="yearMonth"
          @exportDataEvent="exportDataEvent"
        />
      </div>
    </el-drawer>
  </div>
</template>
<script>
import XEUtils from "xe-utils";
import CheckItemListHeader from "./components/CheckItemListHeader.vue";
export default {
  name: "monthly-checkItem",
  data() {
    return {
      yearMonth: "",
      boxName: "",
      drawer: false,
      direction: "rtl",
      tableData: [
        { name: "Develop", wcs: 20, zs: "女", detailList: [] },
        { name: "Develop", wcs: 22, zs: "女", detailList: [] },
        { name: "Develop", wcs: 24, zs: "男", detailList: [] },
        { name: "Develop", wcs: 26, zs: "女", detailList: [] },
      ],
    };
  },
  components: {
    CheckItemListHeader,
  },
  methods: {
    loadContentMethod({ row }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const detailList = XEUtils.sample(
            [
              { name: "Develop", wcs: 20, zs: "女" },
              { name: "Develop", wcs: 22, zs: "女" },
              { name: "Develop", wcs: 24, zs: "男" },
              { name: "Develop", wcs: 26, zs: "女" },
              { name: "Develop", wcs: 28, zs: "男" },
              { name: "Develop", wcs: 30, zs: "男" },
            ],
            XEUtils.random(1, 5)
          );
          row.detailList = detailList;
          resolve();
        }, 500);
      });
    },
    exportDataEvent() {
      this.$refs.checkItemlist1.exportData({ type: "csv" });
    },
    handleOpenBox(name) {
      this.boxName = name;
      this.drawer = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.checkItem-list {
  padding: 20px;
  .checkItem-header {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
  }
  .sontable {
    padding: 20px 80px;
  }
  .box {
    padding: 20px;
  }
}
</style>
