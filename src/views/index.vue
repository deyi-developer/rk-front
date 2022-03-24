<template>
  <div class="app-container home">
    <PaneGroup />
    <BarChart />
    <LineChart />
    <PieChart />
    <RaddarChart />
  </div>
</template>

<script>
import PaneGroup from "./dashboard/PanelGroup.vue";
import BarChart from "./dashboard/BarChart";
import LineChart from "./dashboard/LineChart";
import PieChart from "./dashboard/PieChart";
import RaddarChart from "./dashboard/RaddarChart";
export default {
  name: "Index",
  data() {
    const nameValid = ({ cellValue }) => {
      if (cellValue && !/^\w+$/.test(cellValue)) {
        return new Error("名称格式不正确，必须字母或数字");
      }
    };
    return {
      // 版本号
      version: "3.8.1",
      tableData: [
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "0",
          age: 28,
          address: "test abc",
        },
        {
          id: 10002,
          name: "Test2",
          role: "Test",
          sex: "1",
          age: 22,
          address: "Guangzhou",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "0",
          age: 32,
          address: "Shanghai",
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "1",
          age: 23,
          address: "test abc",
        },
        {
          id: 10005,
          name: "Test5",
          role: "Develop",
          sex: "1",
          age: 30,
          address: "Shanghai",
        },
        {
          id: 10006,
          name: "Test6",
          role: "Designer",
          sex: "1",
          age: 21,
          address: "test abc",
        },
      ],
      validRules: {
        name: [{ validator: nameValid }],
        sex: [{ required: true, message: "性别必须填写" }],
        age: [
          {
            type: "number",
            min: 10,
            max: 100000,
            message: "输入 10 ~ 100000 范围",
          },
        ],
        date: [{ required: true, message: "日期必须填写" }],
      },
    };
  },
  methods: {
    async validAllEvent() {
      const $table = this.$refs.xTable;
      const errMap = await $table.validate(true).catch((errMap) => errMap);
      if (errMap) {
        VXETable.modal.message({ status: "error", message: "校验不通过！" });
      } else {
        VXETable.modal.message({ status: "success", message: "校验成功！" });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>
