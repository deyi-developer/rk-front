<template>
  <vxe-table
    border
    show-overflow
    :data="tableData"
    :edit-config="{
      trigger: 'click',
      mode: 'cell',
      activeMethod: activeCellMethod
    }"
  >
    <vxe-column type="seq" width="60"></vxe-column>
    <vxe-column
      field="name"
      title="Name"
      :edit-render="{ autofocus: '.myinput' }"
    >
      <template #edit="{ row }">
        <vxe-input v-model="row.name" class="myinput"></vxe-input>
      </template>
    </vxe-column>
    <vxe-column field="sex" title="Sex" :edit-render="{}">
      <template #default="{ row }">
        <span>{{ formatSex(row.sex) }}</span>
      </template>
      <template #edit="{ row }">
        <vxe-select v-model="row.sex" transfer>
          <vxe-option
            v-for="item in sexList"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></vxe-option>
        </vxe-select>
      </template>
    </vxe-column>
    <vxe-column field="date" title="Date" :edit-render="{}">
      <template #edit="{ row }">
        <vxe-input
          v-model="row.date"
          type="week"
          placeholder="请选择日期"
          transfer
        ></vxe-input>
      </template>
    </vxe-column>
  </vxe-table>
</template>
<script>
export default {
  name: "ProjectList"
};
</script>
<script setup>
import { reactive } from "@vue/composition-api";
const tableData = reactive([
  {
    id: 10001,
    name: "Test1",
    nickname: "T1",
    role: "Develop",
    sex: "0",
    sex2: ["0"],
    num1: 40,
    age: 28,
    address: "Shenzhen",
    date12: "",
    date13: ""
  },
  {
    id: 10002,
    name: "Test2",
    nickname: "T2",
    role: "Designer",
    sex: "1",
    sex2: ["0", "1"],
    num1: 44,
    age: 22,
    address: "Guangzhou",
    date12: "",
    date13: "2020-08-20"
  },
  {
    id: 10003,
    name: "Test3",
    nickname: "T3",
    role: "Test",
    sex: "0",
    sex2: ["1"],
    num1: 200,
    age: 32,
    address: "Shanghai",
    date12: "2020-09-10",
    date13: ""
  },
  {
    id: 10004,
    name: "Test4",
    nickname: "T4",
    role: "Designer",
    sex: "1",
    sex2: ["1"],
    num1: 30,
    age: 23,
    address: "Shenzhen",
    date12: "",
    date13: "2020-12-04"
  },
  {
    id: 10005,
    name: "Test5",
    nickname: "T5",
    role: "Develop",
    sex: "0",
    sex2: ["1", "0"],
    num1: 20,
    age: 30,
    address: "Shanghai",
    date12: "2020-09-20",
    date13: ""
  },
  {
    id: 10006,
    name: "Test6",
    nickname: "T6",
    role: "Designer",
    sex: "1",
    sex2: ["0"],
    num1: 10,
    age: 21,
    address: "Shenzhen",
    date12: "",
    date13: ""
  },
  {
    id: 10007,
    name: "Test7",
    nickname: "T7",
    role: "Develop",
    sex: "0",
    sex2: ["0"],
    num1: 5,
    age: 29,
    address: "Shenzhen",
    date12: "2020-01-02",
    date13: "2020-09-20"
  },
  {
    id: 10008,
    name: "Test8",
    nickname: "T8",
    role: "PM",
    sex: "1",
    sex2: ["0"],
    num1: 2,
    age: 35,
    address: "Shenzhen",
    date12: "",
    date13: ""
  }
]);

const sexList = reactive([
  { label: "男", value: "1" },
  { label: "女", value: "0" }
]);

const formatSex = (value) => {
  if (value === "1") {
    return "男";
  }
  if (value === "0") {
    return "女";
  }
  return "";
};
const activeCellMethod = ({ columnIndex }) => {
  if (columnIndex === 1) {
    return false;
  }
  return true;
};
setTimeout(() => {
  tableData.push({
    id: 10003,
    name: "Test112312",
    nickname: "T1",
    role: "Develop",
    sex: "0",
    sex2: ["0"],
    num1: 40,
    age: 28,
    address: "Shenzhen",
    date12: "",
    date13: ""
  });
}, 5000);
</script>
