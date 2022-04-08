<template>
  <div class="page-bg">
    <div class="project-list app-container">
      <div class="ds-flex title">
        <h1>项目清单</h1>
        <div class="fx-1 content">
          <span>{{ `总项目数：${risk.totalProjectNum} ` }}</span>
          <span class="pointer">
            {{
              `无风险项目：${risk.noRiskProjectNum} (${risk.noRiskProjectRate}%)`
            }}
          </span>
          <span class="pointer">
            {{
              `中风险项目：${risk.mediumRiskProjectNum} (${risk.mediumRiskProjectRate}%)`
            }}
          </span>

          <span class="pointer">
            {{
              `高风险项目：${risk.highRiskProjectNum} (${risk.highRiskProjectRate}%)`
            }}
          </span>
          <span class="pointer">
            {{
              `法务接管项目：${risk.lawsuitRiskProjectNum} (${risk.lawsuitRiskProjectRate}%)`
            }}</span
          >
        </div>
        <el-select
          v-model="filterParams.oneDeptId"
          clearable
          size="small"
          placeholder="请选择部门"
          @change="oneDeptIdChange"
        >
          <el-option
            v-for="dict in deptList"
            :key="dict.oneDeptId"
            :value="dict.oneDeptId"
            :label="dict.oneDeptName"
          ></el-option>
        </el-select>
      </div>

      <el-card>
        <!-- <filterForm @search="fetchData" ref="form" /> -->
        <Tabs v-model="activeName" @on-click="handleClick">
          <TabPane label="项目基本信息" name="first"></TabPane>
          <TabPane label="项目开票信息" name="second"></TabPane>
          <TabPane label="项目收款信息" name="third"></TabPane>
          <TabPane label="项目计划" name="fourth"></TabPane>
          <TabPane label="其他指标" name="fifth"></TabPane>
          <template #extra>
            <el-button plain size="small" @click="reset">重置筛选</el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="此功能会校验数据必填项"
              placement="top-start"
            >
              <el-button
                plain
                v-hasPermi="['order:list:valid']"
                type="primary"
                size="small"
                @click="validAllEvent"
                >整页提交</el-button
              >
            </el-tooltip>
            <el-button
              plain
              v-hasPermi="['order:list:init']"
              type="danger"
              size="small"
              @click="initData"
              >数据重算</el-button
            >
          </template>
        </Tabs>

        <vxe-table
          ref="xTable"
          border
          align="center"
          :height="height"
          show-overflow
          keep-source
          size="small"
          :cell-class-name="cellClass"
          id="projectCode"
          :data="dataSource"
          :loading="tableLodaing"
          :scroll-y="{ enabled: false, gt: 100 }"
          :scroll-x="{ enabled: false, gt: 10 }"
          :edit-config="{
            trigger: 'click',
            mode: 'cell',
            showStatus: true,
            activeMethod: activeCellMethod
          }"
          :column-config="{
            width: 200
          }"
          :edit-rules="validRules"
          :filter-config="{
            remote: true
          }"
          @scroll="scrollHandle"
          @edit-disabled="editDisabledEvent"
          @filter-change="filterChangeEvent"
        >
          <!-- <vxe-column
          type="seq"
          field="seq"
          fixed="left"
          title="序号"
          width="60"
        ></vxe-column>-->
          <!-- 项目基本信息 -->
          <vxe-column
            field="projectCode"
            fixed="left"
            title="项目编码"
            :filters="[{ data: '' }]"
            class-name="link-color"
          >
            <template #filter="{ $panel, column }">
              <template v-for="(option, index) in column.filters">
                <vxe-input
                  class="filter-input"
                  :key="index"
                  style="width: 200px"
                  v-model="option.data"
                  @input="$panel.changeOption($event, !!option.data, option)"
                  placeholder="输入完整编码"
                  size="mini"
                ></vxe-input>
              </template>
            </template>
            <template #default="{ row }">
              <el-link
                style="font-size: 12px"
                @click="gotoDetail(row)"
                type="primary"
                >{{ row.projectCode }}</el-link
              >
            </template>
          </vxe-column>

          <vxe-column
            field="projectName"
            fixed="left"
            title="项目名称"
            :filters="[{ data: '' }]"
          >
            <template #filter="{ $panel, column }">
              <template v-for="(option, index) in column.filters">
                <vxe-input
                  class="filter-input"
                  :key="index"
                  style="width: 200px"
                  v-model="option.data"
                  @input="$panel.changeOption($event, !!option.data, option)"
                  placeholder="支持模糊搜索"
                  size="mini"
                ></vxe-input>
              </template>
            </template>
          </vxe-column>

          <vxe-colgroup title="项目基本信息">
            <vxe-column
              field="projectChargeType"
              class-name="bg-base"
              title="项目类型"
            ></vxe-column>
            <vxe-column
              field="parentProjectCode"
              class-name="bg-base"
              title="对外项目编码"
            ></vxe-column>
            <vxe-column
              field="parentProjectName"
              class-name="bg-base"
              title="对外项目名称"
            ></vxe-column>
            <vxe-column
              field="projectManagerEmpNum"
              class-name="bg-base"
              title="项目经理工号"
            ></vxe-column>
            <vxe-column
              field="pmName"
              class-name="bg-base"
              title="项目经理姓名"
              :filters="[{ data: '' }]"
            >
              <template #filter="{ $panel, column }">
                <template v-for="(option, index) in column.filters">
                  <vxe-input
                    class="filter-input"
                    :key="index"
                    style="width: 200px"
                    v-model="option.data"
                    @input="$panel.changeOption($event, !!option.data, option)"
                    placeholder="支持模糊搜索"
                    size="mini"
                  ></vxe-input>
                </template>
              </template>
            </vxe-column>

            <vxe-column
              field="oneDeptName"
              class-name="bg-base"
              title="一级部门"
            ></vxe-column>
            <vxe-column
              field="deptName"
              class-name="bg-base"
              title="项目部门"
            ></vxe-column>
            <vxe-column
              field="projectCreateDate"
              class-name="bg-base"
              title="项目创建日期"
            ></vxe-column>
            <vxe-column
              field="projectStartDate"
              class-name="bg-base"
              title="项目开始日期"
            ></vxe-column>
            <vxe-column
              field="projectEndDate"
              class-name="bg-base"
              title="项目结束日期"
            ></vxe-column>
            <vxe-column
              field="customName"
              class-name="bg-base"
              title="最终用户"
            ></vxe-column>
          </vxe-colgroup>

          <vxe-colgroup title="项目开票信息">
            <vxe-column
              class-name="bg-inv"
              field="pjtdTotalMoney"
              title="总收入"
              align="right"
            >
              <template #default="{ row }">
                {{ row.pjtdTotalMoney | currency }}
              </template>
            </vxe-column>
            <vxe-column
              class-name="bg-inv"
              field="projectChargePeriod"
              title="结算周期（月）"
              :filters="[
                { label: '数据非空', value: 2 },
                { label: '数据为空', value: 1 }
              ]"
              :filter-multiple="false"
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
              title="开票截止期间"
            ></vxe-column>
            <vxe-column
              class-name="bg-inv"
              field="totalShouldBillingMoney"
              title="应开总额"
              align="right"
            >
              <template #default="{ row }">
                {{ row.totalShouldBillingMoney | currency }}
              </template>
            </vxe-column>
            <vxe-column
              class-name="bg-inv"
              field="billingRate"
              title="应开比率"
            >
              <template #default="{ row }">
                {{ row.billingRate | percent }}
              </template>
            </vxe-column>
            <vxe-column
              class-name="bg-inv"
              field="totalAlreadyBillingMoney"
              title="已开总额"
              align="right"
            >
              <template #default="{ row }">
                {{ row.totalAlreadyBillingMoney | currency }}
              </template></vxe-column
            >
            <vxe-column
              field="billingRateOfTotalPjtd"
              class-name="bg-inv"
              title="相对总收入开票率"
            >
              <template #default="{ row }">
                {{ row.billingRateOfTotalPjtd | percent }}
              </template>
            </vxe-column>
            <vxe-column
              field="correspondingBillingRate"
              class-name="bg-inv"
              title="相对应开开票率"
            >
              <template #default="{ row }">
                {{ row.correspondingBillingRate | percent }}
              </template>
            </vxe-column>
            <vxe-column
              field="totalShouldNotBillingMoney"
              class-name="bg-inv"
              title="超账期应开未开总额"
              align="right"
            >
              <template #default="{ row }">
                {{ row.totalShouldNotBillingMoney | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="billingMoney30Day"
              class-name="bg-inv"
              title="超账期30天内应开未开"
              align="right"
            >
              <template #default="{ row }">
                {{ row.billingMoney30Day | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="billingMoney30to60Day"
              class-name="bg-inv"
              title="超账期30-60天应开未开"
              align="right"
            >
              <template #default="{ row }">
                {{ row.billingMoney30to60Day | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="billingMoney60to90Day"
              class-name="bg-inv"
              title="超账期60-90天应开未开"
              align="right"
            >
              <template #default="{ row }">
                {{ row.billingMoney60to90Day | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="billingMoney90Day"
              class-name="bg-inv"
              title="超账期90天以上应开未开"
              align="right"
            >
              <template #default="{ row }">
                {{ row.billingMoney90Day | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="invoicingRiskLevel"
              class-name="bg-inv"
              title="开票风险等级"
              :filters="riskLevelFilter"
              :filter-multiple="false"
              :edit-render="{}"
            >
              <template #default="{ row }">
                <span>
                  {{
                    selectDictLabel(
                      dict.type.risk_level,
                      row.invoicingRiskLevel
                    )
                  }}
                </span>
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
              class-name="bg-collection"
              title="已开总额"
              align="right"
            >
              <template #default="{ row }">
                {{ row.totalAlreadyBillingMoney | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="projectInvoicePeriod"
              class-name="bg-collection"
              title="发票账期（天）"
              :filters="[
                { label: '数据非空', value: 2 },
                { label: '数据为空', value: 1 }
              ]"
              :filter-multiple="false"
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
              class-name="bg-collection"
              title="收款截止日期"
            ></vxe-column>
            <vxe-column
              field="totalShouldReceiptsMoney"
              class-name="bg-collection"
              title="账期内应收总额"
              align="right"
            >
              <template #default="{ row }">
                {{ row.totalShouldReceiptsMoney | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="shouldReceiverRate"
              class-name="bg-collection"
              title="应收比率"
            >
              <template #default="{ row }">
                {{ row.shouldReceiverRate | percent }}
              </template>
            </vxe-column>
            <vxe-column
              field="totalReceiptssMoney"
              class-name="bg-collection"
              title="已收总额"
              align="right"
            >
              <template #default="{ row }">
                {{ row.totalReceiptssMoney | currency }}
              </template></vxe-column
            >
            <vxe-column
              field="receivedRateOfTotalPjtd"
              class-name="bg-collection"
              title="相对总收入收款率"
            >
              <template #default="{ row }">
                {{ row.receivedRateOfTotalPjtd | percent }}
              </template>
            </vxe-column>
            <vxe-column
              field="relativeReceivableRate"
              class-name="bg-collection"
              title="相对应收款率"
            >
              <template #default="{ row }">
                {{ row.relativeReceivableRate | percent }}
              </template>
            </vxe-column>
            <vxe-column
              field="totalShouldNotReceiptsMoney"
              class-name="bg-collection"
              title="超账期应收未收总额"
              align="right"
            >
              <template #default="{ row }">
                {{ row.totalShouldNotReceiptsMoney | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="receiptsMoney30Day"
              class-name="bg-collection"
              title="超账期30天内应收未收"
              align="right"
            >
              <template #default="{ row }">
                {{ row.receiptsMoney30Day | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="receiptsMoney30to60Day"
              class-name="bg-collection"
              title="超账期30-60天应收未收"
              align="right"
            >
              <template #default="{ row }">
                {{ row.receiptsMoney30to60Day | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="receiptsMoney60to90Day"
              class-name="bg-collection"
              title="超账期60-90天应收未收"
              align="right"
            >
              <template #default="{ row }">
                {{ row.receiptsMoney60to90Day | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="receiptsMoney90Day"
              class-name="bg-collection"
              title="超账期90天以上应收未收"
              align="right"
            >
              <template #default="{ row }">
                {{ row.receiptsMoney90Day | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="receiveRiskLevel"
              class-name="bg-collection"
              title="收款风险等级"
              :edit-render="{}"
              :filters="riskLevelFilter"
              :filter-multiple="false"
            >
              <template #default="{ row }">
                <span>
                  {{
                    selectDictLabel(dict.type.risk_level, row.receiveRiskLevel)
                  }}
                </span>
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
              title="超帐期应开未开总额"
              align="right"
            >
              <template #default="{ row }">
                {{ row.totalShouldNotBillingMoney | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="planBillingMoney"
              class-name="bg-plan"
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
              title="本月实开总额"
              align="right"
            >
              <template #default="{ row }">
                {{ row.billingThisMonth | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="compleBillingThisMonth"
              class-name="bg-plan"
              title="本月开票完成率"
            >
              <template #default="{ row }">
                {{ row.compleBillingThisMonth | percent }}
              </template></vxe-column
            >
            <vxe-column
              field="totalShouldNotReceiptsMoney"
              class-name="bg-plan"
              title="超帐期应收未收总额"
              align="right"
            >
              <template #default="{ row }">
                {{ row.totalShouldNotReceiptsMoney | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="planReceiptsMoney"
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
              title="本月实收总额"
              align="right"
            >
              <template #default="{ row }">
                {{ row.receiptsThisMonth | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="compleReceiptsThisMonth"
              class-name="bg-plan"
              title="本月收款完成率"
            >
              <template #default="{ row }">
                {{ row.compleReceiptsThisMonth | percent }}
              </template>
            </vxe-column>
            <vxe-column
              field="planRemark"
              class-name="bg-plan"
              title="备注"
              :edit-render="{}"
            >
              <template #edit="{ row }">
                <vxe-input
                  v-model="row.planRemark"
                  type="text"
                  placeholder="请输入备注信息"
                ></vxe-input>
              </template>
            </vxe-column>
          </vxe-colgroup>

          <vxe-colgroup title="其他指标">
            <vxe-column
              field="grossProfit"
              class-name="bg-other"
              title="毛利额"
            >
              <template #default="{ row }">
                {{ row.grossProfit | currency }}
              </template>
            </vxe-column>
            <vxe-column
              field="grossProfitRate"
              class-name="bg-other"
              title="毛利率"
            >
              <template #default="{ row }">
                {{ row.grossProfitRate | percent }}
              </template>
            </vxe-column>

            <vxe-column
              field="grossProfitRiskLevel"
              class-name="bg-other"
              title="毛利风险等级"
              :edit-render="{}"
              :filters="riskLevelFilter"
              :filter-multiple="false"
            >
              <template #default="{ row }">
                <span>
                  {{
                    selectDictLabel(
                      dict.type.risk_level,
                      row.grossProfitRiskLevel
                    )
                  }}
                </span>
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
            <vxe-column
              field="riskStatus"
              class-name="bg-other"
              :edit-render="{}"
              title="项目风险状态"
            >
              <template #default="{ row }">
                <span>
                  {{ selectDictLabel(dict.type.risk_status, row.riskStatus) }}
                </span>
              </template>
              <template #edit="{ row }">
                <vxe-select v-model="row.riskStatus" transfer>
                  <vxe-option
                    v-for="dict in dict.type.risk_status"
                    :key="dict.value"
                    :value="dict.value"
                    :label="dict.label"
                  ></vxe-option>
                </vxe-select>
              </template>
            </vxe-column>
          </vxe-colgroup>

          <vxe-column
            field="openStatus"
            class-name="bg-other"
            width="100"
            title="风控永久关闭"
          >
            <template #default="{ row }">
              <vxe-switch
                :disabled="!checkRole(['risker'])"
                :open-value="1"
                :close-value="0"
                v-model="row.openStatus"
                @change="openStatusChange(row)"
              ></vxe-switch>
            </template>
          </vxe-column>

          <vxe-column
            v-if="checkPermi(['order:list:save'])"
            width="100"
            title="操作"
          >
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
        ></vxe-pager>
      </el-card>
      <!-- <ChartsGroup /> -->
    </div>
  </div>
</template>
<script>
import { Tabs, TabPane } from "view-design";
import { throttle, debounce } from "lodash-es";
import filterForm from "./filterForm.vue";
import { getDeptList } from "@/api/common";
import { getList, saveData, getRiskNum, initData, toggle } from "./api";
import ChartsGroup from "@/views/dashboard/ChartsGroup.vue";

import { checkPermi, checkRole } from "@/utils/permission"; // 权限判断函数
/* 每列宽度200
    前面2列固定
    项目基本信息 12个字段
    项目开票 14个字段
    项目收款 15个字段
    项目计划 9个字段
    其他指标 4个字段
    操作字段 2个
   */

const w = 200; // 列宽度
const fixedWidth = w * 2; //固定列
const firstWidth = w * 11;
const secondWidth = w * 14;
const thirdWidth = w * 14;
const fourthWidth = w * 9;
const fifthWidth = w * 5;
//列   距离
const firstLeft = 0;
const secondLeft = firstWidth;
const thirdLeft = firstWidth + secondWidth;
const fourthLeft = firstWidth + secondWidth + thirdWidth;
const fifthLeft = firstWidth + secondWidth + thirdWidth + fourthWidth;

export default {
  dicts: ["risk_level", "risk_status"],
  name: "List",
  components: { Tabs, TabPane, filterForm, ChartsGroup },
  data() {
    return {
      deptList: [],
      riskLevelFilter: [
        {
          label: "高风险",
          value: "Red"
        },
        {
          label: "中风险",
          value: "Yellow"
        },
        {
          label: "无风险",
          value: "Green"
        }
      ],
      activeName: "first",
      tableLodaing: true,
      dataSource: [],
      height: document.body.clientHeight - 310,
      risk: {
        highRiskProjectNum: 0,
        highRiskProjectRate: 0,
        mediumRiskProjectNum: 0,
        mediumRiskProjectRate: 0,
        noRiskProjectNum: 0,
        noRiskProjectRate: 0,
        totalProjectNum: 827
      },
      //表头筛选项
      filterParams: {
        projectChargePeriod: null,
        projectChargePeriod: null,
        oneDeptId: null
      },
      page: {
        pageSize: 20,
        pageNum: 1,
        total: 0
      },
      validRules: {
        // grossProfitRiskLevel: [
        //   { required: true, message: "风险级别必须填写" }],
        // invoicingRiskLevel: [{ required: true, message: "风险级别必须填写" }],
        // receiveRiskLevel: [{ required: true, message: "风险级别必须填写" }],
        projectChargePeriod: [{ required: true, message: "必须填写" }],
        projectInvoicePeriod: [{ required: true, message: "必须填写" }],
        planBillingMoney: [{ required: true, message: "必须填写" }],
        planReceiptsMoney: [{ required: true, message: "必须填写" }]
      }
    };
  },
  async created() {
    const res = await getDeptList();
    if (res.code == 200) {
      this.deptList = res.rows;
    }
  },
  mounted() {
    this.fetchData();
  },
  activated() {
    this.fetchData();
  },
  methods: {
    checkPermi,
    checkRole,

    // 获取数据
    async fetchData(page) {
      this.tableLodaing = true;
      const filterParams = this.filterParams;
      const formVal = {}; //this.$refs.form.queryParams ;
      const params = { ...formVal, ...filterParams, ...this.page, ...page };
      //获取列表
      const res = await getList(params);
      this.page.total = res.total;
      this.page.pageNum = res.pageNum;
      this.page.pageSize = res.pageSize;
      this.dataSource = res.rows;
      this.tableLodaing = false;
      // 获取顶部风险项目
      const risk = await getRiskNum(params);
      if (risk) {
        this.risk = risk;
      }
      this.$nextTick(() => {
        // pm角色 更新数据后 要提醒他填写数据
        if (checkRole(["pm"])) {
          const $table = this.$refs.xTable;
          $table.validate(true).catch((errMap) => errMap);
        }
      });
    },

    //重算按钮
    initData() {
      initData().then((res) => {
        this.$message.warning("初始化完成，请刷新页面");
      });
    },
    oneDeptIdChange(val) {
      console.log(val);
      this.filterParams["oneDeptId"] = val;
      // 重新请求
      this.fetchData({ pageNum: 1 });
    },
    //筛选
    filterChangeEvent({ property, values, datas, column }) {
      console.log(property, values, datas, column);
      // 自定义的筛选数据是在datas里面
      const val = values[0] || datas[0];
      if (val) {
        this.filterParams[property] = val;
      } else {
        this.filterParams[property] = null;
      }

      // 重新请求
      this.fetchData({ pageNum: 1 });
    },
    //重置筛选
    reset() {
      const $table = this.$refs.xTable;
      this.filterParams = {};
      $table.clearFilter();
      // 重新请求
      this.fetchData({ pageNum: 1 });
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
        if (res.code == "200") {
          this.$modal.notifySuccess(res.msg);
          this.fetchData();
        }
      });
    },
    // 项目开关
    openStatusChange: debounce(({ openStatus, projectCode }) => {
      toggle({ openStatus, projectCode })
        .then(() => {})
        .finaly(() => this.fetchData());
      console.log(openStatus, projectCode);
    }, 500),
    //table 点击事件
    gotoDetail(row) {
      const { projectCode } = row;
      // const { field } = column;
      this.$router.push({
        path: "/order/details",
        query: {
          projectCode
        }
      });
      // if (field == "projectCode") {

      // }
    },
    //提交全部
    async validAllEvent() {
      const $table = this.$refs.xTable;

      const errMap = await $table.validate(true).catch((errMap) => errMap);
      // 有必填项未填 且为pm身份就提示报错
      if (errMap && checkRole(["pm"])) {
        this.$notify({
          type: "warning",
          message: "请检查数据是否填写完整！"
        });
      } else {
        const data = $table.getData();

        saveData(data).then((res) => {
          if (res.code == "200") {
            this.$modal.notifySuccess(res.msg);
            this.fetchData();
          }
        });
      }
    },
    //页码更新
    pageChange({ currentPage: pageNum, pageSize }) {
      const $table = this.$refs.xTable;
      const updateRecords = $table.getUpdateRecords();

      if (updateRecords.length > 0) {
        let msg = "以下项目有修改但未提交数据：<br/>";

        for (let index = 0; index < updateRecords.length; index++) {
          const item = updateRecords[index];
          msg = msg + item.projectName + "，<br/>";
        }
        this.$confirm(msg + "是否放弃填写?", "提示", {
          dangerouslyUseHTMLString: true
        })
          .then(() => {
            this.fetchData({ pageNum, pageSize });
          })
          .then(() => {})
          .catch(() => {});
      } else {
        this.fetchData({ pageNum, pageSize });
      }
    },
    cellClass({ row, column }) {
      const { field } = column;
      const val = row[field];
      let className = "";

      switch (val) {
        case "lawsuit":
          className = "cell-lawsuit";
          break;
        case "Red":
          className = "cell-red";
          break;
        case "Yellow":
          className = "cell-yellow";
          break;
        case "Green":
          className = "cell-green";
          break;
      }

      return className;
    },

    // 设置填写权限
    activeCellMethod({ column }) {
      const { field } = column;
      // boss不能编辑
      if (checkRole(["boss"])) {
        return false;
      }
      // pm不能编辑这个字段
      if (checkRole(["pm"])) {
        if (
          [
            "grossProfitRiskLevel",
            "invoicingRiskLevel",
            "receiveRiskLevel",
            "riskStatus"
          ].includes(field)
        ) {
          return false;
        }
      }
      // 风控不能编辑这个字段
      if (checkRole(["risker"])) {
        if (
          [
            "projectChargePeriod",
            "projectInvoicePeriod",
            "planBillingMoney",
            "planReceiptsMoney"
          ].includes(field)
        ) {
          return false;
        }
      }
      return true;
    },
    editDisabledEvent() {
      this.$message.error("您的角色没有编辑此字段权限");
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
  .pointer {
    cursor: pointer;
  }
  .filter-input {
    margin: 5px;
  }
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
  .cell-red {
    background-color: #f56c6c !important;
    color: #f0f9eb;
  }
  .cell-lawsuit {
    background-color: #f56c6c !important;
    color: #f0f9eb;
  }
  .cell-yellow {
    background-color: #e6a23c !important;
    color: #f0f9eb;
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
