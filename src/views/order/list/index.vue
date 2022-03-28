<template>
  <div class="project-list app-container">
    <el-card>
      <Tabs v-model="activeName" @on-click="handleClick">
        <TabPane label="项目基本信息" name="first"></TabPane>
        <TabPane label="项目开票信息" name="second"></TabPane>
        <TabPane label="项目收款信息" name="third"></TabPane>
        <TabPane label="项目计划" name="fourth"></TabPane>
        <TabPane label="其他指标" name="fifth"></TabPane>
        <template #extra>
          <el-button type="primary" size="small">全部保存</el-button>
        </template>
      </Tabs>

      <vxe-table
        ref="tableList"
        border
        align="center"
        max-height="550"
        show-overflow
        size="small"
        :data="state.tableData"
        :edit-config="{
          trigger: 'click',
          mode: 'cell',
          activeMethod: activeCellMethod
        }"
        @scroll="scrollHandle"
      >
        <vxe-column
          type="seq"
          fixed="left"
          title="序号"
          width="60"
        ></vxe-column>
        <!-- 项目基本信息 -->
        <vxe-column
          field="name"
          fixed="left"
          width="125"
          title="项目编码"
        ></vxe-column>
        <vxe-column
          field="name"
          fixed="left"
          width="125"
          title="项目名称"
        ></vxe-column>

        <vxe-colgroup title="项目基本信息">
          <vxe-column
            field="name"
            class-name="bg-base"
            width="125"
            title="项目类型"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-base"
            width="125"
            title="项目经理工号"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-base"
            width="125"
            title="项目经理姓名"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-base"
            width="125"
            title="一级部门"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-base"
            width="125"
            title="项目部门"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-base"
            width="125"
            title="项目创建日期"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-base"
            width="125"
            title="项目开始日期"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-base"
            width="125"
            title="项目结束日期"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-base"
            width="125"
            title="最终用户"
          ></vxe-column>
        </vxe-colgroup>

        <!-- 项目开票 -->
        <vxe-colgroup title="项目开票信息">
          <vxe-column
            class-name="bg-inv"
            field="name"
            width="125"
            title="总收入"
          ></vxe-column>
          <vxe-column
            class-name="bg-inv"
            field="name"
            width="125"
            title="结算周期"
          ></vxe-column>
          <vxe-column
            class-name="bg-inv"
            field="name"
            width="125"
            title="开票截止期间"
          ></vxe-column>
          <vxe-column
            class-name="bg-inv"
            field="name"
            width="125"
            title="应开总额"
          ></vxe-column>
          <vxe-column
            class-name="bg-inv"
            field="name"
            width="125"
            title="应开比例"
          ></vxe-column>
          <vxe-column
            class-name="bg-inv"
            field="name"
            width="125"
            title="已开总额"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-inv"
            width="125"
            title="相对总收入开票率"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-inv"
            width="125"
            title="相对应开开票率"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-inv"
            width="125"
            title="超账期应开未开总额"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-inv"
            width="125"
            title="超账期30天内应开未开"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-inv"
            width="125"
            title="超账期30-60天应开未开"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-inv"
            width="125"
            title="超账期60-90天应开未开"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-inv"
            width="125"
            title="超账期90天以上应开未开"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-inv"
            width="125"
            title="开票风险等级"
          ></vxe-column>
        </vxe-colgroup>

        <!-- 项目收款 -->
        <vxe-colgroup title="项目收款信息">
          <vxe-column
            field="name"
            width="125"
            class-name="bg-collection"
            title="已开总额"
          ></vxe-column>
          <vxe-column
            field="name"
            width="125"
            class-name="bg-collection"
            title="发票账期"
          ></vxe-column>
          <vxe-column
            field="name"
            width="125"
            class-name="bg-collection"
            title="收款截止日期"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-collection"
            width="125"
            title="账期内应收总额"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-collection"
            width="125"
            title="应收比例"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-collection"
            width="125"
            title="已收总额"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-collection"
            width="125"
            title="相对总收入收款率"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-collection"
            width="125"
            title="相对应收款率"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-collection"
            width="125"
            title="超账期应收未收总额"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-collection"
            width="125"
            title="超账期30天内应收未收"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-collection"
            width="125"
            title="超账期30-60天应收未收"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-collection"
            width="125"
            title="超账期60-90天应收未收"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-collection"
            width="125"
            title="超账期90天以上应收未收"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-collection"
            width="125"
            title="收款风险等级"
          ></vxe-column>
        </vxe-colgroup>

        <!-- 项目计划 -->
        <vxe-colgroup title="项目计划">
          <vxe-column
            field="name"
            class-name="bg-plan"
            width="125"
            title="超帐期应开未开总额"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-plan"
            width="125"
            title="本月计划开票额"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-plan"
            width="125"
            title="本月实开总额"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-plan"
            width="125"
            title="本月开票完成率"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-plan"
            width="125"
            title="超帐期应收未收总额"
          ></vxe-column>
          <vxe-column
            field="name"
            width="125"
            class-name="bg-plan"
            title="本月计划收款额"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-plan"
            width="125"
            title="本月实收总额"
          ></vxe-column>
          <vxe-column
            field="name"
            width="125"
            class-name="bg-plan"
            title="本月收款完成率"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-plan"
            width="125"
            title="备注"
          ></vxe-column>
        </vxe-colgroup>

        <!-- 其他指标 -->
        <vxe-colgroup title="其他指标">
          <vxe-column
            field="name"
            class-name="bg-other"
            width="125"
            title="毛利额"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-other"
            width="125"
            title="毛利率"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-other"
            width="125"
            title="平均月开票计划完成率"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-other"
            width="125"
            title="平均月收款计划完成率"
          ></vxe-column>
          <vxe-column
            field="name"
            class-name="bg-other"
            width="125"
            title="毛利风险等级"
          ></vxe-column>
        </vxe-colgroup>

        <!-- <vxe-column width="100" title="操作" fixed="right">
          <template #default="{ row }">
            <vxe-button
              icon="fa fa-save"
              type="text"
              status="primary"
              content="保存"
              @click="saveRowEvent(row)"
            ></vxe-button>
          </template>
        </vxe-column> -->
      </vxe-table>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "ProjectList"
};
</script>
<script setup>
import { Tabs, TabPane } from "view-design";
import { throttle } from "lodash-es";
import { reactive, ref, onBeforeMount } from "@vue/composition-api";

// 获取数据
onBeforeMount(() => {
  const arr = [];
  for (let index = 0; index < 30; index++) {
    arr[index] = {
      id: index,
      name: `长文本测试长文本测试长文本测试${index}`
    };
  }
  state.tableData = arr;
});
// tab逻辑
const activeName = ref("first");
const handleClick = (name) => {
  console.log(name);
  // tableList.value.scrollToColumn("date");
};

//表格实例
const tableList = ref(null);

const state = reactive({
  tableData: []
});

const saveRowEvent = (row) => {
  console.log(row);
};

const activeCellMethod = ({ columnIndex }) => {
  if (columnIndex === 1) {
    return false;
  }
  return true;
};

const scrollHandle = throttle(({ isX, bodyWidth, scrollLeft, scrollWidth }) => {
  /* 每列宽度125
    前面3列固定
    项目基本信息 12个字段
    项目开票 14个字段
    项目收款 15个字段
    项目计划 9个字段
    其他指标 5个字段
   */
  // 列宽度
  const fixedWidth = 125 * 3 + 60; //固定列
  const firstWidth = 125 * 12 - 60 - fixedWidth;
  const secondWidth = 125 * 14;
  const thirdWidth = 125 * 15;
  const fourthWidth = 125 * 9;
  const fifthWidth = 125 * 5;
  //列   距离
  const firstLeft = 0;
  const secondLeft = firstWidth;
  const thirdLeft = firstWidth + secondWidth;
  const fourthLeft = firstWidth + secondWidth + thirdWidth;
  const fifthLeft =
    fixedWidth + firstWidth + secondWidth + thirdWidth + fourthWidth;

  if (isX) {
    console.log(bodyWidth, scrollLeft, scrollWidth);
    if (scrollLeft >= firstLeft && scrollLeft <= firstLeft + firstWidth) {
      activeName.value = "first";
    } else if (
      scrollLeft >= secondLeft &&
      scrollLeft <= secondLeft + secondWidth
    ) {
      activeName.value = "second";
    } else if (
      scrollLeft >= thirdLeft &&
      scrollLeft <= thirdLeft + thirdWidth
    ) {
      activeName.value = "third";
    } else if (
      scrollLeft >= fourthLeft &&
      scrollLeft <= fourthLeft + fourthWidth
    ) {
      activeName.value = "fourth";
    } else if (
      scrollLeft >= fifthLeft &&
      scrollLeft <= fifthLeft + fifthWidth
    ) {
      activeName.value = "fifth";
    }

    if (scrollLeft + bodyWidth == scrollWidth) {
      activeName.value = "fifth";
    }
  }
}, 100);
</script>
<style lang="scss">
.bg-base {
  background-color: #ecf5ff;
}
.bg-inv {
  background-color: #f0f9eb;
}
.bg-collection {
  background-color: #fdf6ec;
}
.bg-plan {
  background-color: #fef0f0;
}
.bg-other {
  background-color: #f4f4f5;
}
</style>
