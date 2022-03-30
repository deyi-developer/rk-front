<template>
  <div class="project-list app-container">
    <div class="ds-flex title">
      <h1>项目列表</h1>
      <div class="fx-1 content">
        <span>总项目数：121</span>
        <span>无风险：121</span>
        <span>中风险：121</span>
        <span>高风险：121</span>
        <span>法务接管：121</span>
      </div>
    </div>
    <el-card>
      <filterForm @search="fetchData" ref="form" />
      <Tabs v-model="activeName" @on-click="handleClick">
        <TabPane label="项目基本信息" name="first"></TabPane>
        <TabPane label="项目开票信息" name="second"></TabPane>
        <TabPane label="项目收款信息" name="third"></TabPane>
        <TabPane label="项目计划" name="fourth"></TabPane>
        <TabPane label="其他指标" name="fifth"></TabPane>
        <template #extra>
          <el-button type="primary" size="small" @click="validAllEvent"
            >整页提交</el-button
          >
        </template>
      </Tabs>

      <vxe-table
        ref="xTable"
        border
        align="center"
        max-height="550"
        show-overflow
        keep-source
        size="small"
        id="projectCode"
        :data="dataSource"
        :loading="tableLodaing"
        :scroll-y="{ enabled: false, gt: 100 }"
        :scroll-x="{ enabled: false, gt: 10 }"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
        :edit-rules="validRules"
        @cell-click="gotoDetail"
        @scroll="scrollHandle"
      >
        <!-- <vxe-column
          type="seq"
          field="seq"
          fixed="left"
          title="序号"
          width="60"
        ></vxe-column> -->
        <!-- 项目基本信息 -->
        <vxe-column
          field="projectCode"
          fixed="left"
          width="150"
          title="项目编码"
          class-name="link-color"
        >
        </vxe-column>
        <vxe-column
          field="projectName"
          fixed="left"
          width="150"
          title="项目名称"
        >
        </vxe-column>

        <vxe-colgroup title="项目基本信息">
          <vxe-column
            field="projectChargeType"
            class-name="bg-base"
            width="150"
            title="项目类型"
          ></vxe-column>
          <vxe-column
            field="parentProjectCode"
            class-name="bg-base"
            width="150"
            title="对外项目编码"
          ></vxe-column>
          <vxe-column
            field="parentProjectName"
            class-name="bg-base"
            width="150"
            title="对外项目名称"
          ></vxe-column>
          <vxe-column
            field="projectManagerEmpNum"
            class-name="bg-base"
            width="150"
            title="项目经理工号"
          ></vxe-column>
          <vxe-column
            field="pmName"
            class-name="bg-base"
            width="150"
            title="项目经理姓名"
          ></vxe-column>
          <vxe-column
            field="oneDeptName"
            class-name="bg-base"
            width="150"
            title="一级部门"
          ></vxe-column>
          <vxe-column
            field="deptName"
            class-name="bg-base"
            width="150"
            title="项目部门"
          ></vxe-column>
          <vxe-column
            field="projectCreateDate"
            class-name="bg-base"
            width="150"
            title="项目创建日期"
          ></vxe-column>
          <vxe-column
            field="projectStartDate"
            class-name="bg-base"
            width="150"
            title="项目开始日期"
          ></vxe-column>
          <vxe-column
            field="projectEndDate"
            class-name="bg-base"
            width="150"
            title="项目结束日期"
          ></vxe-column>
          <vxe-column
            field="customName"
            class-name="bg-base"
            width="150"
            title="最终用户"
          ></vxe-column>
        </vxe-colgroup>

        <vxe-colgroup title="项目开票信息">
          <vxe-column
            class-name="bg-inv"
            field="pjtdTotalMoney"
            width="150"
            title="总收入"
          ></vxe-column>
          <vxe-column
            class-name="bg-inv"
            field="projectChargePeriod"
            width="150"
            title="结算周期（月）"
            :edit-render="{}"
          >
            <template #edit="{ row }">
              <vxe-input
                v-model="row.projectChargePeriod"
                type="number"
                placeholder="请输入数值"
              ></vxe-input>
            </template>
          </vxe-column>
          <vxe-column
            class-name="bg-inv"
            field="billingDeadline"
            width="150"
            title="开票截止期间"
          ></vxe-column>
          <vxe-column
            class-name="bg-inv"
            field="totalShouldBillingMoney"
            width="150"
            title="应开总额"
          ></vxe-column>
          <vxe-column
            class-name="bg-inv"
            field="billingRate"
            width="150"
            title="应开比例"
          ></vxe-column>
          <vxe-column
            class-name="bg-inv"
            field="totalAlreadyBillingMoney"
            width="150"
            title="已开总额"
          ></vxe-column>
          <vxe-column
            field="billingRateOfTotalPjtd"
            class-name="bg-inv"
            width="150"
            title="相对总收入开票率"
          ></vxe-column>
          <vxe-column
            field="correspondingBillingRate"
            class-name="bg-inv"
            width="150"
            title="相对应开开票率"
          ></vxe-column>
          <vxe-column
            field="totalShouldNotBillingMoney"
            class-name="bg-inv"
            width="150"
            title="超账期应开未开总额"
          ></vxe-column>
          <vxe-column
            field="billingMoney30Day"
            class-name="bg-inv"
            width="150"
            title="超账期30天内应开未开"
          ></vxe-column>
          <vxe-column
            field="billingMoney30to60Day"
            class-name="bg-inv"
            width="150"
            title="超账期30-60天应开未开"
          ></vxe-column>
          <vxe-column
            field="billingMoney60to90Day"
            class-name="bg-inv"
            width="150"
            title="超账期60-90天应开未开"
          ></vxe-column>
          <vxe-column
            field="billingMoney90Day"
            class-name="bg-inv"
            width="150"
            title="超账期90天以上应开未开"
          ></vxe-column>
          <vxe-column
            field="invoicingRiskLevel"
            class-name="bg-inv"
            width="150"
            title="开票风险等级"
            :edit-render="{}"
          >
            <template #default="{ row }">
              <span>{{
                selectDictLabel(dict.type.risk_level, row.invoicingRiskLevel)
              }}</span>
            </template>
            <template #edit="{ row }">
              <vxe-select v-model="row.invoicingRiskLevel" transfer>
                <vxe-option
                  v-for="dict in dict.type.risk_level"
                  :key="dict.value"
                  :value="dict.value"
                  :label="dict.label"
                ></vxe-option>
              </vxe-select>
            </template>
          </vxe-column>
        </vxe-colgroup>

        <vxe-colgroup title="项目收款信息">
          <vxe-column
            field="totalAlreadyBillingMoney"
            width="150"
            class-name="bg-collection"
            title="已开总额"
          ></vxe-column>
          <vxe-column
            field="projectInvoicePeriod"
            width="150"
            class-name="bg-collection"
            title="发票账期（天）"
            :edit-render="{}"
          >
            <template #edit="{ row }">
              <vxe-input
                v-model="row.projectInvoicePeriod"
                type="number"
                placeholder="请输入数值"
              ></vxe-input>
            </template>
          </vxe-column>
          <vxe-column
            field="receivedEndTime"
            width="150"
            class-name="bg-collection"
            title="收款截止日期"
          ></vxe-column>
          <vxe-column
            field="totalShouldReceiptsMoney"
            class-name="bg-collection"
            width="150"
            title="账期内应收总额"
          ></vxe-column>
          <vxe-column
            field="shouldReceiverRate"
            class-name="bg-collection"
            width="150"
            title="应收比例"
          ></vxe-column>
          <vxe-column
            field="totalReceiptssMoney"
            class-name="bg-collection"
            width="150"
            title="已收总额"
          ></vxe-column>
          <vxe-column
            field="receivedRateOfTotalPjtd"
            class-name="bg-collection"
            width="150"
            title="相对总收入收款率"
          ></vxe-column>
          <vxe-column
            field="relativeReceivableRate"
            class-name="bg-collection"
            width="150"
            title="相对应收款率"
          ></vxe-column>
          <vxe-column
            field="totalShouldNotReceiptsMoney"
            class-name="bg-collection"
            width="150"
            title="超账期应收未收总额"
          ></vxe-column>
          <vxe-column
            field="receiptsMoney30Day"
            class-name="bg-collection"
            width="150"
            title="超账期30天内应收未收"
          ></vxe-column>
          <vxe-column
            field="receiptsMoney30to60Day"
            class-name="bg-collection"
            width="150"
            title="超账期30-60天应收未收"
          ></vxe-column>
          <vxe-column
            field="receiptsMoney60to90Day"
            class-name="bg-collection"
            width="150"
            title="超账期60-90天应收未收"
          ></vxe-column>
          <vxe-column
            field="receiptsMoney90Day"
            class-name="bg-collection"
            width="150"
            title="超账期90天以上应收未收"
          ></vxe-column>
          <vxe-column
            field="receiveRiskLevel"
            class-name="bg-collection"
            width="150"
            title="收款风险等级"
            :edit-render="{}"
          >
            <template #default="{ row }">
              <span>{{
                selectDictLabel(dict.type.risk_level, row.receiveRiskLevel)
              }}</span>
            </template>
            <template #edit="{ row }">
              <vxe-select v-model="row.receiveRiskLevel" transfer>
                <vxe-option
                  v-for="dict in dict.type.risk_level"
                  :key="dict.value"
                  :value="dict.value"
                  :label="dict.label"
                ></vxe-option>
              </vxe-select>
            </template>
          </vxe-column>
        </vxe-colgroup>

        <vxe-colgroup title="项目计划">
          <vxe-column
            field="totalShouldNotBillingMoney"
            class-name="bg-plan"
            width="150"
            title="超帐期应开未开总额"
          ></vxe-column>
          <vxe-column
            field="planBillingMoney"
            class-name="bg-plan"
            width="150"
            title="本月计划开票额"
            :edit-render="{}"
          >
            <template #edit="{ row }">
              <vxe-input
                v-model="row.planBillingMoney"
                type="number"
                placeholder="请输入数值"
              ></vxe-input>
            </template>
          </vxe-column>
          <vxe-column
            field="billingThisMonth"
            class-name="bg-plan"
            width="150"
            title="本月实开总额"
          ></vxe-column>
          <vxe-column
            field="compleBillingThisMonth"
            class-name="bg-plan"
            width="150"
            title="本月开票完成率"
          ></vxe-column>
          <vxe-column
            field="totalShouldNotReceiptsMoney"
            class-name="bg-plan"
            width="150"
            title="超帐期应收未收总额"
          ></vxe-column>
          <vxe-column
            field="planReceiptsMoney"
            width="150"
            class-name="bg-plan"
            title="本月计划收款额"
            :edit-render="{}"
          >
            <template #edit="{ row }">
              <vxe-input
                v-model="row.planReceiptsMoney"
                type="number"
                placeholder="请输入数值"
              ></vxe-input>
            </template>
          </vxe-column>
          <vxe-column
            field="receiptsThisMonth"
            class-name="bg-plan"
            width="150"
            title="本月实收总额"
          ></vxe-column>
          <vxe-column
            field="compleReceiptsThisMonth"
            width="150"
            class-name="bg-plan"
            title="本月收款完成率"
          ></vxe-column>
          <vxe-column
            field="planRemark"
            class-name="bg-plan"
            width="150"
            title="备注"
            :edit-render="{}"
          >
            <template #edit="{ row }">
              <vxe-input
                v-model="row.planRemark"
                type="text"
                placeholder="请输入数值"
              ></vxe-input>
            </template>
          </vxe-column>
        </vxe-colgroup>

        <vxe-colgroup title="其他指标">
          <vxe-column
            field="grossProfit"
            class-name="bg-other"
            width="150"
            title="毛利额"
          ></vxe-column>
          <vxe-column
            field="grossProfitRate"
            class-name="bg-other"
            width="150"
            title="毛利率"
          ></vxe-column>

          <vxe-column
            field="grossProfitRiskLevel"
            class-name="bg-other"
            width="150"
            title="毛利风险等级"
            :edit-render="{}"
          >
            <template #default="{ row }">
              <span>{{
                selectDictLabel(dict.type.risk_level, row.grossProfitRiskLevel)
              }}</span>
            </template>
            <template #edit="{ row }">
              <vxe-select v-model="row.grossProfitRiskLevel" transfer>
                <vxe-option
                  v-for="dict in dict.type.risk_level"
                  :key="dict.value"
                  :value="dict.value"
                  :label="dict.label"
                ></vxe-option>
              </vxe-select>
            </template>
          </vxe-column>
        </vxe-colgroup>

        <vxe-column width="100" title="操作" fixed="right">
          <template #default="{ row }">
            <vxe-button
              icon="fa fa-save"
              type="text"
              status="primary"
              content="提交"
              @click="saveRowEvent(row)"
            ></vxe-button>
          </template>
        </vxe-column>
      </vxe-table>
      <vxe-pager
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        :total="page.total"
        @page-change="pageChange"
        :layouts="[
          'PrevJump',
          'PrevPage',
          'Number',
          'NextPage',
          'NextJump',
          'Sizes',
          'FullJump',
          'Total'
        ]"
      >
      </vxe-pager>
    </el-card>
  </div>
</template>
<script>
import { Tabs, TabPane } from "view-design";
import { throttle } from "lodash-es";
import filterForm from "./filterForm.vue";
import { getList, saveData } from "./api";

/* 每列宽度125
    前面3列固定
    项目基本信息 12个字段
    项目开票 14个字段
    项目收款 15个字段
    项目计划 9个字段
    其他指标 3个字段
   */

const w = 150; // 列宽度
const fixedWidth = w * 2; //固定列
const firstWidth = w * 11;
const secondWidth = w * 14;
const thirdWidth = w * 14;
const fourthWidth = w * 9;
const fifthWidth = w * 3;
//列   距离
const firstLeft = 0;
const secondLeft = firstWidth;
const thirdLeft = firstWidth + secondWidth;
const fourthLeft = firstWidth + secondWidth + thirdWidth;
const fifthLeft =
  fixedWidth + firstWidth + secondWidth + thirdWidth + fourthWidth;

export default {
  dicts: ["risk_level"],
  name: "ProjectList",
  components: { Tabs, TabPane, filterForm },
  data() {
    return {
      activeName: "first",
      tableLodaing: true,
      dataSource: [],
      page: {
        pageSize: 20,
        pageNum: 1,
        total: 0
      },
      validRules: {
        grossProfitRiskLevel: [{ required: true, message: "风险级别必须填写" }],
        invoicingRiskLevel: [{ required: true, message: "风险级别必须填写" }],
        receiveRiskLevel: [{ required: true, message: "风险级别必须填写" }],
        projectChargePeriod: [{ required: true, message: "必须填写" }],
        projectInvoicePeriod: [{ required: true, message: "必须填写" }],
        planBillingMoney: [{ required: true, message: "必须填写" }],
        planReceiptsMoney: [{ required: true, message: "必须填写" }]
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData(page) {
      this.tableLodaing = true;
      const formVal = this.$refs.form.queryParams;
      const params = { ...formVal, ...this.page, ...page };
      const res = await getList(params);
      this.page.total = res.total;
      this.page.pageNum = res.pageNum;
      this.page.pageSize = res.pageSize;
      this.dataSource = res.rows;
      this.tableLodaing = false;
      this.$nextTick(() => {
        const $table = this.$refs.xTable;
        $table.validate(true).catch((errMap) => errMap);
      });
    },
    // 点击tab 滚动列表
    handleClick(name) {
      const $table = this.$refs.xTable;
      let left = 0;
      switch (name) {
        case "first":
          left = firstLeft;
          break;
        case "second":
          left = secondLeft;
          break;
        case "third":
          left = thirdLeft;
          break;
        case "fourth":
          left = fourthLeft;
          break;
        case "fifth":
          left = fifthLeft;
          break;
      }
      $table.scrollTo(left + 5);
    },

    // 提交行
    async saveRowEvent(row) {
      saveData([row]).then((res) => {
        this.$modal.notifySuccess(res.msg);
      });
    },
    //table 点击事件
    gotoDetail({ row, column }) {
      const { projectCode } = row;
      const { field } = column;
      if (field == "projectCode") {
        this.$router.push({
          name: "details",
          query: {
            projectCode
          }
        });
      }
    },
    //提交全部
    async validAllEvent() {
      const $table = this.$refs.xTable;
      const errMap = await $table.validate(true).catch((errMap) => errMap);
      if (errMap) {
        console.log("不通过");
      } else {
        saveData(this.dataSource).then((res) => {
          this.$modal.notifySuccess(res.msg);
        });
      }
    },
    //页码更新
    pageChange({ currentPage: pageNum, pageSize }) {
      const $table = this.$refs.xTable;
      const updateRecords = $table.getUpdateRecords();
      if (updateRecords.length > 0) {
        this.$modal
          .confirm("有修改未提交数据，是否放弃填写")
          .then(() => {
            this.fetchData({ pageNum, pageSize });
          })
          .then(() => {})
          .catch(() => {});
      } else {
        this.fetchData({ pageNum, pageSize });
      }
    },
    // 滚动事件
    scrollHandle: throttle(function ({
      isX,
      bodyWidth,
      scrollLeft,
      scrollWidth
    }) {
      if (isX) {
        if (scrollLeft >= firstLeft && scrollLeft <= firstLeft + firstWidth) {
          this.activeName = "first";
        } else if (
          scrollLeft >= secondLeft &&
          scrollLeft <= secondLeft + secondWidth
        ) {
          this.activeName = "second";
        } else if (
          scrollLeft >= thirdLeft &&
          scrollLeft <= thirdLeft + thirdWidth
        ) {
          this.activeName = "third";
        } else if (
          scrollLeft >= fourthLeft &&
          scrollLeft <= fourthLeft + fourthWidth
        ) {
          this.activeName = "fourth";
        } else if (
          scrollLeft >= fifthLeft &&
          scrollLeft <= fifthLeft + fifthWidth
        ) {
          this.activeName = "fifth";
        }

        if (scrollLeft + bodyWidth == scrollWidth) {
          this.activeName = "fifth";
        }
      }
    },
    150)
  }
};
</script>

<style lang="scss">
.project-list {
  .title {
    height: 31px;
    margin-bottom: 15px;
  }
  .content {
    height: 100%;
    margin-left: 20px;
    span {
      padding-left: 20px;
      display: table-cell;
      vertical-align: bottom;
      height: 31px;
      &:nth-of-type(1) {
        color: #409eff;
      }
      &:nth-of-type(2) {
        color: #67c23a;
      }
      &:nth-of-type(3) {
        color: #e6a23c;
      }
      &:nth-of-type(4) {
        color: #f56c6c;
      }
      &:nth-of-type(5) {
        color: #909399;
      }
    }
  }
  .link-color {
    color: #409eff;
  }
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
}
</style>
