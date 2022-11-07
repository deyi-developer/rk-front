<template>
  <div class="checkItem-list">
    <!-- 日期和导出 -->
    <!-- <CheckItemListHeader
      :yearMonth="yearMonth"
      @exportDataEvent="exportDataEvent"
    /> -->

    <!-- 表格 -->
    <vxe-grid v-bind="gridOptions1">
      <template #sontable_exp>
        <vxe-grid class="sontable" v-bind="gridOptions2">
          <template #open_box="{ row }">
            <a @click="handleOpenBox(row.name)">{{ row.name }}</a>
          </template>
        </vxe-grid>
      </template>
    </vxe-grid>

    <!-- 弹框 -->
    <el-drawer
      :title="boxName"
      :visible.sync="drawer"
      :direction="direction"
      size="40%"
    >
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
      gridOptions1: {
        border: true,
        resizable: true,
        showOverflow: true,
        loading: false,
        expandConfig: {
          lazy: true,
          loadMethod: this.loadContentMethod,
        },
        columns: [
          {
            type: "expand",
            width: 50,
            slots: {
              content: "sontable_exp",
            },
          },
          { type: "seq", title: "序号", width: 50 },
          { field: "name", title: "Name" },
          { field: "sex", title: "Sex", showHeaderOverflow: true },
          { field: "role", title: "Role" },
          { field: "address", title: "Address", showOverflow: true },
        ],
        data: [
          {
            id: 10001,
            name: "Test1",
            nickname: "T1",
            role: "Develop",
            sex: "Man",
            age: 28,
            address: "Shenzhen",
          },
          {
            id: 10002,
            name: "Test2",
            nickname: "T2",
            role: "Test",
            sex: "Women",
            age: 22,
            address: "Guangzhou",
          },
          {
            id: 10003,
            name: "Test3",
            nickname: "T3",
            role: "PM",
            sex: "Man",
            age: 32,
            address: "Shanghai",
          },
          {
            id: 10004,
            name: "Test4",
            nickname: "T4",
            role: "Designer",
            sex: "Women",
            age: 23,
            address: "Shenzhen",
          },
          {
            id: 10005,
            name: "Test5",
            nickname: "T5",
            role: "Develop",
            sex: "Women",
            age: 30,
            address: "Shanghai",
          },
          {
            id: 10006,
            name: "Test6",
            nickname: "T6",
            role: "Designer",
            sex: "Women",
            age: 21,
            address: "Shenzhen",
          },
          {
            id: 10007,
            name: "Test7",
            nickname: "T7",
            role: "Test",
            sex: "Man",
            age: 29,
            address: "Shenzhen",
          },
          {
            id: 10008,
            name: "Test8",
            nickname: "T8",
            role: "Develop",
            sex: "Man",
            age: 35,
            address: "Shenzhen",
          },
        ],
      },
      gridOptions2: {
        border: true,
        resizable: true,
        showOverflow: true,
        loading: false,
        expandConfig: {
          lazy: true,
          loadMethod: this.loadContentMethod,
        },
        columns: [
          { type: "seq", title: "序号", width: 50 },
          {
            field: "name",
            title: "Name",
            slots: {
              default: "open_box",
            },
          },
          { field: "sex", title: "Sex", showHeaderOverflow: true },
          { field: "role", title: "Role" },
          { field: "address", title: "Address", showOverflow: true },
        ],
        data: [
          {
            id: 10001,
            name: "Test1",
            nickname: "T1",
            role: "Develop",
            sex: "Man",
            age: 28,
            address: "Shenzhen",
          },
          {
            id: 10002,
            name: "Test2",
            nickname: "T2",
            role: "Test",
            sex: "Women",
            age: 22,
            address: "Guangzhou",
          },
          {
            id: 10003,
            name: "Test3",
            nickname: "T3",
            role: "PM",
            sex: "Man",
            age: 32,
            address: "Shanghai",
          },
          {
            id: 10004,
            name: "Test4",
            nickname: "T4",
            role: "Designer",
            sex: "Women",
            age: 23,
            address: "Shenzhen",
          },
          {
            id: 10005,
            name: "Test5",
            nickname: "T5",
            role: "Develop",
            sex: "Women",
            age: 30,
            address: "Shanghai",
          },
          {
            id: 10006,
            name: "Test6",
            nickname: "T6",
            role: "Designer",
            sex: "Women",
            age: 21,
            address: "Shenzhen",
          },
          {
            id: 10007,
            name: "Test7",
            nickname: "T7",
            role: "Test",
            sex: "Man",
            age: 29,
            address: "Shenzhen",
          },
          {
            id: 10008,
            name: "Test8",
            nickname: "T8",
            role: "Develop",
            sex: "Man",
            age: 35,
            address: "Shenzhen",
          },
        ],
      },
    };
  },
  components: {
    CheckItemListHeader,
  },
  created() {},
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
    padding-bottom: 15px;
  }
  .sontable {
    padding: 20px 80px;
  }
  .box {
    padding: 20px;
  }
  .vxe-grid--toolbar-wrapper {
    display: none;
  }
}
</style>
