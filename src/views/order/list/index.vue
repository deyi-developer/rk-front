<template>
  <div class="page-bg">
    <div class="project-list app-container">
      <!-- header -->
      <div class="ds-flex header">
        <div class="title">
          <!-- title -->
          <h1>项目清单</h1>

          <!-- 项目信息 -->
          <div class="fx-1 content">
            <span
              :style="{ color: item.color }"
              v-for="item in projectType"
              :key="item.name"
              @click="projectTypeNav(item)"
            >
              {{ item.name }}: {{ item.content(risk) }}
            </span>
          </div>
        </div>

        <!-- 部门选择器 -->
        <el-select
          v-if="!checkRole(['pm'])"
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
        <!-- :cell-class-name="cellClassName" -->
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

            <el-dropdown v-if="checkRole(['risker'])" @command="handleCommand">
              <el-button
                style="margin-left: 10px"
                plain
                type="danger"
                size="small"
                >风控操作<i class="el-icon-arrow-down el-icon--right"></i
              ></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="initData">数据重算</el-dropdown-item>

                <el-dropdown-item
                  v-for="dict in dict.type.deyi_project_amount_type"
                  :key="dict.value"
                  :command="dict.value"
                  :label="dict.label"
                  >清空{{ dict.label }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 计划是否可编辑 -->
            <el-button
              style="margin: 0 10px"
              v-if="checkRole(['risker'])"
              plain
              size="small"
              :type="risk.planEditEnable ? 'success' : 'warning'"
              @click="() => checkoutPlanEdit(!risk.planEditEnable)"
            >
              {{ risk.planEditEnable ? "允许计划编辑" : "禁止计划编辑" }}
            </el-button>

            <!-- 当前表格导出 -->
            <el-button
              @click="downloadFile"
              type="primary"
              icon="el-icon-download"
              size="small"
            >
              导出
            </el-button>
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
          id="projectCode"
          :data="dataSource"
          :loading="tableLodaing"
          :scroll-y="{ enabled: false, gt: 100 }"
          :scroll-x="{ enabled: false, gt: 10 }"
          :edit-config="{
            trigger: 'click',
            mode: 'cell',
            showStatus: true,
            activeMethod: activeCellMethod,
          }"
          :column-config="{
            width: 200,
          }"
          :edit-rules="validRules"
          :filter-config="{
            remote: true,
          }"
          @scroll="scrollHandle"
          @edit-disabled="editDisabledEvent"
          @filter-change="filterChangeEvent"
          :cell-class-name="cellClass"
          :header-cell-class-name="headerCellClassName"
        >
          <vxe-column field="billNum" fixed="left" title="状态" width="50">
            <template
              #default="{
                row: { billNum = {}, alertList = '无', projectCode },
              }"
            >
              <el-tooltip effect="dark" placement="right">
                <div slot="content" v-html="alertList" />
                <span
                  @click="() => navPrderList(projectCode, billNum)"
                  :style="{
                    cursor: 'default',
                    color: billNum.color || '',
                    cursor: billNum.count ? 'pointer' : 'default',
                  }"
                  >{{ billNum.count || "-" }}</span
                >
              </el-tooltip>
            </template>
          </vxe-column>

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
                <el-link
                  style="font-size: 12px"
                  @click="
                    $router.push({
                      path: `/project/item/${row.id}?projectCode=${row.projectCode}&name=${row.projectName}&type=1`,
                    })
                  "
                  type="primary"
                  >{{ row.pjtdTotalMoney | currency }}</el-link
                ></template
              >
            </vxe-column>
            <vxe-column
              class-name="bg-inv"
              field="projectChargePeriod"
              title="结算周期（月）"
              :filters="[
                { label: '数据非空', value: 2 },
                { label: '数据为空', value: 1 },
              ]"
              :filter-multiple="false"
              :edit-render="{}"
            >
              <template #edit="{ row }">
                <vxe-input
                  :min="0"
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
              <template #default="{ row }">{{
                row.totalShouldBillingMoney | currency
              }}</template>
            </vxe-column>
            <vxe-column
              class-name="bg-inv"
              field="billingRate"
              title="应开比率"
            >
              <template #default="{ row }">{{
                row.billingRate | percent
              }}</template>
            </vxe-column>
            <vxe-column
              class-name="bg-inv"
              field="totalAlreadyBillingMoney"
              title="已开总额"
              align="right"
            >
              <template #default="{ row }">
                <el-link
                  style="font-size: 12px"
                  @click="
                    $router.push({
                      path: `/project/item/${row.id}?projectCode=${row.projectCode}&name=${row.projectName}&type=2`,
                    })
                  "
                  type="primary"
                  >{{ row.totalAlreadyBillingMoney | currency }}</el-link
                ></template
              >
            </vxe-column>
            <vxe-column
              field="billingRateOfTotalPjtd"
              class-name="bg-inv"
              title="相对总收入开票率"
            >
              <template #default="{ row }">{{
                row.billingRateOfTotalPjtd | percent
              }}</template>
            </vxe-column>
            <vxe-column
              field="correspondingBillingRate"
              class-name="bg-inv"
              title="相对应开开票率"
            >
              <template #default="{ row }">{{
                row.correspondingBillingRate | percent
              }}</template>
            </vxe-column>
            <vxe-column
              field="totalShouldNotBillingMoney"
              class-name="bg-inv"
              title="超账期应开未开总额"
              align="right"
              :filter-multiple="false"
              :filters="[
                { label: '数据非空', value: 2 },
                { label: '数据为空', value: 1 },
              ]"
            >
              <template #default="{ row }">{{
                row.totalShouldNotBillingMoney | currency
              }}</template>
            </vxe-column>
            <vxe-column
              field="billingMoney30Day"
              class-name="bg-inv"
              title="超账期30天内应开未开"
              align="right"
              :filter-multiple="false"
              :filters="[
                { label: '数据非空', value: 2 },
                { label: '数据为空', value: 1 },
              ]"
            >
              <template #default="{ row }">{{
                row.billingMoney30Day | currency
              }}</template>
            </vxe-column>
            <vxe-column
              field="billingMoney30to60Day"
              class-name="bg-inv"
              title="超账期30-60天应开未开"
              align="right"
              :filter-multiple="false"
              :filters="[
                { label: '数据非空', value: 2 },
                { label: '数据为空', value: 1 },
              ]"
            >
              <template #default="{ row }">{{
                row.billingMoney30to60Day | currency
              }}</template>
            </vxe-column>
            <vxe-column
              field="billingMoney60to90Day"
              class-name="bg-inv"
              title="超账期60-90天应开未开"
              align="right"
              :filter-multiple="false"
              :filters="[
                { label: '数据非空', value: 2 },
                { label: '数据为空', value: 1 },
              ]"
            >
              <template #default="{ row }">{{
                row.billingMoney60to90Day | currency
              }}</template>
            </vxe-column>
            <vxe-column
              field="billingMoney90Day"
              class-name="bg-inv"
              title="超账期90天以上应开未开"
              align="right"
              :filter-multiple="false"
              :filters="[
                { label: '数据非空', value: 2 },
                { label: '数据为空', value: 1 },
              ]"
            >
              <template #default="{ row }">{{
                row.billingMoney90Day | currency
              }}</template>
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
                <el-link
                  style="font-size: 12px"
                  @click="
                    $router.push({
                      path: `/project/item/${row.id}?projectCode=${row.projectCode}&name=${row.projectName}&type=2`,
                    })
                  "
                  type="primary"
                  >{{ row.totalAlreadyBillingMoney | currency }}</el-link
                ></template
              >
            </vxe-column>
            <vxe-column
              field="projectInvoicePeriod"
              class-name="bg-collection"
              title="发票账期（天）"
              :filters="[
                { label: '数据非空', value: 2 },
                { label: '数据为空', value: 1 },
              ]"
              :filter-multiple="false"
              :edit-render="{}"
            >
              <template #edit="{ row }">
                <vxe-input
                  :min="0"
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
              <template #default="{ row }">{{
                row.totalShouldReceiptsMoney | currency
              }}</template>
            </vxe-column>
            <vxe-column
              field="shouldReceiverRate"
              class-name="bg-collection"
              title="应收比率"
            >
              <template #default="{ row }">{{
                row.shouldReceiverRate | percent
              }}</template>
            </vxe-column>
            <vxe-column
              field="totalReceiptssMoney"
              class-name="bg-collection"
              title="已收总额"
              align="right"
            >
              <template #default="{ row }">
                <el-link
                  style="font-size: 12px"
                  @click="
                    $router.push({
                      path: `/project/item/${row.id}?projectCode=${row.projectCode}&name=${row.projectName}&type=3`,
                    })
                  "
                  type="primary"
                  >{{ row.totalReceiptssMoney | currency }}</el-link
                ></template
              >
            </vxe-column>
            <vxe-column
              field="receivedRateOfTotalPjtd"
              class-name="bg-collection"
              title="相对总收入收款率"
            >
              <template #default="{ row }">{{
                row.receivedRateOfTotalPjtd | percent
              }}</template>
            </vxe-column>
            <vxe-column
              field="relativeReceivableRate"
              class-name="bg-collection"
              title="相对应收款率"
            >
              <template #default="{ row }">{{
                row.relativeReceivableRate | percent
              }}</template>
            </vxe-column>
            <vxe-column
              field="totalShouldNotReceiptsMoney"
              class-name="bg-collection"
              title="超账期应收未收总额"
              align="right"
              :filter-multiple="false"
              :filters="[
                { label: '数据非空', value: 2 },
                { label: '数据为空', value: 1 },
              ]"
            >
              <template #default="{ row }">{{
                row.totalShouldNotReceiptsMoney | currency
              }}</template>
            </vxe-column>
            <vxe-column
              field="receiptsMoney30Day"
              class-name="bg-collection"
              title="超账期30天内应收未收"
              align="right"
              :filter-multiple="false"
              :filters="[
                { label: '数据非空', value: 2 },
                { label: '数据为空', value: 1 },
              ]"
            >
              <template #default="{ row }">{{
                row.receiptsMoney30Day | currency
              }}</template>
            </vxe-column>
            <vxe-column
              field="receiptsMoney30to60Day"
              class-name="bg-collection"
              title="超账期30-60天应收未收"
              align="right"
              :filter-multiple="false"
              :filters="[
                { label: '数据非空', value: 2 },
                { label: '数据为空', value: 1 },
              ]"
            >
              <template #default="{ row }">{{
                row.receiptsMoney30to60Day | currency
              }}</template>
            </vxe-column>
            <vxe-column
              field="receiptsMoney60to90Day"
              class-name="bg-collection"
              title="超账期60-90天应收未收"
              align="right"
              :filter-multiple="false"
              :filters="[
                { label: '数据非空', value: 2 },
                { label: '数据为空', value: 1 },
              ]"
            >
              <template #default="{ row }">{{
                row.receiptsMoney60to90Day | currency
              }}</template>
            </vxe-column>
            <vxe-column
              field="receiptsMoney90Day"
              class-name="bg-collection"
              title="超账期90天以上应收未收"
              align="right"
              :filter-multiple="false"
              :filters="[
                { label: '数据非空', value: 2 },
                { label: '数据为空', value: 1 },
              ]"
            >
              <template #default="{ row }">{{
                row.receiptsMoney90Day | currency
              }}</template>
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
              field="totalShouldNotBillingMoneys"
              class-name="bg-plan"
              title="超帐期应开未开总额"
              align="right"
            >
              <template #default="{ row }">{{
                row.totalShouldNotBillingMoney | currency
              }}</template>
            </vxe-column>
            <vxe-column
              field="planBillingMoney"
              class-name="bg-plan"
              title="本月计划开票额"
              :formatter="currency"
              :edit-render="{}"
            >
              <template #edit="{ row }">
                <vxe-input
                  :disabled="risk.planEditEnable"
                  v-model="row.planBillingMoney"
                  type="text"
                  @change="valiNum(row, 'planBillingMoney')"
                  placeholder="请输入数值"
                ></vxe-input>
              </template>
            </vxe-column>
            <!-- 新增字段 -->
            <vxe-column
              field="billRemark"
              class-name="bg-plan"
              title="开票备注"
              :edit-render="{}"
            >
              <template #edit="{ row }">
                <vxe-input
                  :disabled="risk.planEditEnable"
                  v-model="row.billRemark"
                  type="text"
                ></vxe-input>
              </template>
            </vxe-column>
            <vxe-column
              field="billingThisMonth"
              class-name="bg-plan"
              title="本月实开总额"
              align="right"
            >
              <template #default="{ row }">{{
                row.billingThisMonth | currency
              }}</template>
            </vxe-column>
            <vxe-column
              field="compleBillingThisMonth"
              class-name="bg-plan"
              title="本月开票完成率"
            >
              <template #default="{ row }">{{
                row.compleBillingThisMonth | percent
              }}</template>
            </vxe-column>
            <vxe-column
              field="totalShouldNotReceiptsMoneys"
              class-name="bg-plan"
              title="超帐期应收未收总额"
              align="right"
            >
              <template #default="{ row }">{{
                row.totalShouldNotReceiptsMoney | currency
              }}</template>
            </vxe-column>
            <vxe-column
              field="planReceiptsMoney"
              class-name="bg-plan"
              title="本月计划收款额"
              :formatter="currency"
              :edit-render="{}"
            >
              <template #edit="{ row }">
                <vxe-input
                  :disabled="risk.planEditEnable"
                  v-model="row.planReceiptsMoney"
                  @change="valiNum(row, 'planReceiptsMoney')"
                  placeholder="请输入数值"
                ></vxe-input>
              </template>
            </vxe-column>
            <!-- 新增字段 -->
            <vxe-column
              field="receiptRemark"
              class-name="bg-plan"
              title="收款备注"
              :edit-render="{}"
            >
              <template #edit="{ row }">
                <vxe-input
                  :disabled="risk.planEditEnable"
                  v-model="row.receiptRemark"
                  placeholder="请输入备注信息"
                ></vxe-input>
              </template>
            </vxe-column>
            <vxe-column
              field="receiptsThisMonth"
              class-name="bg-plan"
              title="本月实收总额"
              align="right"
            >
              <template #default="{ row }">{{
                row.receiptsThisMonth | currency
              }}</template>
            </vxe-column>
            <vxe-column
              field="compleReceiptsThisMonth"
              class-name="bg-plan"
              title="本月收款完成率"
            >
              <template #default="{ row }">{{
                row.compleReceiptsThisMonth | percent
              }}</template>
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
              <template #default="{ row }">{{
                row.grossProfit | currency
              }}</template>
            </vxe-column>
            <vxe-column
              field="grossProfitRate"
              class-name="bg-other"
              title="毛利率"
            >
              <template #default="{ row }">{{
                row.grossProfitRate | percent
              }}</template>
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
              :filters="riskStatusFilter"
              :filter-multiple="false"
            >
              <template #default="{ row }">
                <span>{{
                  selectDictLabel(dict.type.risk_status, row.riskStatus)
                }}</span>
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

          <!-- <vxe-column
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
          </vxe-column> -->

          <vxe-column
            v-if="checkPermi(['order:list:save'])"
            width="120"
            title="操作"
            fixed="right"
          >
            <template #default="{ row }">
              <vxe-switch
                :disabled="!checkRole(['risker'])"
                :open-value="1"
                :close-value="0"
                v-model="row.openStatus"
                @change="openStatusChange(row)"
              ></vxe-switch>
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
            'Total',
          ]"
        ></vxe-pager>
      </el-card>
    </div>

    <!-- 风控操作按钮提示 -->
    <el-dialog title="清选择日期" :visible.sync="dialogVisible" width="40%">
      <div class="risk-operation-class">
        <!-- <el-date-picker
          v-model="riskOperation.year"
          type="year"
          placeholder="选择年"
          :end-placeholder="new Date()"
        /> -->

        <el-date-picker
          v-model="riskOperation.date"
          :clearable="false"
          type="month"
          placeholder="选择月"
          :picker-options="pickerOptions"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Tabs, TabPane } from "view-design";
import { throttle, debounce } from "lodash-es";
import filterForm from "./filterForm.vue";
import { getDeptList } from "@/api/common";
import {
  getList,
  saveData,
  getRiskNum,
  initDataApi,
  toggle,
  rkPlanEdit,
  reportdataExort, // 文件导出
} from "./api";
import currency from "currency.js";

// 权限判断函数
import { checkPermi, checkRole } from "@/utils/permission";

// 常量
import {
  FILTER_PARAMS,
  PROJECT_TYPEP,
  HEADER_CELL_CLASS_NAME,
  CONTEXT_CELL_CLASS_NAME,
  FILTER_TITLE,
} from "./constants";

// 缓存过滤参数
let QUERY_STORE = "[]";

// 部门筛选
let ONE_DEPTID = "";

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
import { deleteCurrentMonth } from "./api";
export default {
  dicts: ["risk_level", "risk_status", "deyi_project_amount_type"],
  name: "List",
  components: { Tabs, TabPane, filterForm },
  data() {
    return {
      projectType: PROJECT_TYPEP, // 项目数量以及类型信息
      dialogVisible: false,
      dialogVisibleValue: "",
      deptList: [],
      riskLevelFilter: [
        {
          label: "高风险",
          value: "Red",
        },
        {
          label: "中风险",
          value: "Yellow",
        },
        {
          label: "无风险",
          value: "Green",
        },
      ],
      riskStatusFilter: [
        {
          label: "法务接管",
          value: "lawsuit",
        },
        {
          label: "高风险",
          value: "Red",
        },
        {
          label: "中风险",
          value: "Yellow",
        },
        {
          label: "无风险",
          value: "Green",
        },
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
        totalProjectNum: 827,
        planEditEnable: false, // 计划是否可编辑
      },
      //表头筛选项
      filterParams: {},
      page: {
        pageSize: 20,
        pageNum: 1,
        total: 0,
      },
      validRules: {
        // grossProfitRiskLevel: [
        //   { required: true, message: "风险级别必须填写" }],
        // invoicingRiskLevel: [{ required: true, message: "风险级别必须填写" }],
        // receiveRiskLevel: [{ required: true, message: "风险级别必须填写" }],
        projectChargePeriod: [{ required: true, message: "必须填写" }],
        projectInvoicePeriod: [{ required: true, message: "必须填写" }],
        planBillingMoney: [{ required: true, message: "必须填写" }],
        planReceiptsMoney: [{ required: true, message: "必须填写" }],
      },
      // 风控操作弹框对象
      riskOperation: {
        date: new Date(),
      },
      // 时间选择器设置
      pickerOptions: {
        disabledDate(time) {
          return time > new Date();
        },
      },
    };
  },
  async created() {
    const res = await getDeptList();
    if (res.code == 200) {
      this.deptList = res.rows;
    }
    this.initHandle("mounted");
  },
  watch: {
    $route({ path }) {
      console.log("qqqqq");
      // 进入的是项目清单, 过滤初始化
      if (path === "/order/list") this.initHandle("watch");
    },
  },
  methods: {
    checkPermi,
    checkRole,
    currency({ cellValue }) {
      return currency(cellValue, { symbol: "", separator: "," }).format();
    },
    valiNum(row, key) {
      const val = currency(row[key]).value;
      row[key] = val;
    },
    // 初始化处理
    initHandle(type) {
      this.$nextTick(() => {
        const {
          query,
          params: { projectType, oneDeptId }, // 状态， 部门id
        } = this.$route;
        const filter = query.filter || "[]";

        // 参数一样并且不是初始化,走缓存
        if (
          filter === QUERY_STORE &&
          oneDeptId === ONE_DEPTID &&
          type !== "mounted"
        )
          return;

        // 记录上一次的筛选数据
        QUERY_STORE = filter;
        ONE_DEPTID = oneDeptId;

        // 初始化过滤条件
        this.filterParams = FILTER_PARAMS();

        // 部门赋值
        if (Number(oneDeptId)) this.filterParams.oneDeptId = Number(oneDeptId);

        // 获取筛选数据
        const filterData = JSON.parse(filter);

        if (filterData[0] || projectType) {
          this.handleFilter(filterData, projectType, Number(oneDeptId));
        }

        // 重新请求
        this.fetchData({ pageNum: 1 });
      });
    },

    // 获取数据
    async fetchData(page) {
      this.tableLodaing = true;
      const filterParams = this.filterParams;
      const formVal = {}; //this.$refs.form.queryParams ;
      console.log(filterParams);
      console.log(formVal);
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
      //this.$nextTick(() => {
      // pm角色 更新数据后 要提醒他填写数据
      // if (checkRole(["pm"])) {
      //   const $table = this.$refs.xTable;
      //   $table.validate(true).catch((errMap) => errMap);
      // }
      // });
    },
    // 下拉菜单事件触发
    handleCommand(command) {
      this.dialogVisible = true;
      this.dialogVisibleValue = command;
    },
    confirm() {
      this.dialogVisible = false;
      if (this.dialogVisibleValue == "initData") {
        this.initData();
      } else {
        this.otherButtom(this.dialogVisibleValue);
      }
    },
    // 处理初始化过滤条件
    handleFilter(filterData, projectType, oneDeptId) {
      const $table = this.$refs.xTable;

      // 清空筛选
      $table.clearFilter();

      filterData.forEach((element) => {
        // 从项目概括点击柱状图，走默认不为空筛选
        this.filterParams[element] = 2;

        // 操控表格添加筛选条件
        $table.getColumnByField(element).filters[0].checked = true;
      });

      // 获取匹配的状态
      const filterType = this.riskStatusFilter.filter(
        ({ value }) => value === projectType
      )[0];

      const dep = this.deptList.filter((res) => res.oneDeptId === oneDeptId);

      // 动态设置tab拦
      this.$tab.updatePage(
        Object.assign({}, this.$route, {
          title: FILTER_TITLE(filterType, dep[0]),
        })
      );

      // 有项目状态，进行控制
      if (filterType) {
        // 操控表格添加筛选条件
        $table.getColumnByField("riskStatus").filters.map((res) => {
          if (res.label === filterType.label) res.checked = true;
        });

        // 设置筛选
        this.filterParams.riskStatus = projectType;
      }

      // 修改条件之后，需要手动调用 updateData 处理表格数据
      $table.updateData();
    },

    //重算按钮
    async initData() {
      const loading = this.$loading({
        lock: true,
        text: "重算中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      // 重算接口调用
      const { code, msg } = await initDataApi();

      if (code !== 200) return;
      this.dialogVisibleValue = "";
      loading.close();

      this.$message({
        message: msg,
        type: "success",
      });
    },
    async otherButtom(command) {
      const res = await deleteCurrentMonth({
        command,
        month: this.riskOperation.date.getMonth() + 1,
        year: this.riskOperation.date.getFullYear(),
      });
      if (res.code == "200") {
        this.$modal.notifySuccess(res.msg);
      }
      this.dialogVisibleValue = "";
    },
    oneDeptIdChange(val) {
      this.filterParams["oneDeptId"] = val;
      // 重新请求
      this.fetchData({ pageNum: 1 });
    },
    //筛选
    filterChangeEvent({ property, values, datas }) {
      // 自定义的筛选数据是在datas里面
      let val = datas[0];
      if (values[0] == 0 || values[0]) {
        val = values[0];
      }
      if (val !== null || val !== undefined || val !== "") {
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
      const $table = this.$refs.xTable;

      if (checkRole(["pm"])) {
        const errMap = await $table.validate(row).catch((errMap) => errMap);
        if (errMap) {
          console.log(errMap);
          this.$notify({
            type: "warning",
            message: "请检查数据是否填写完整！",
          });
          return;
        }
      }

      saveData([row]).then((res) => {
        if (res.code == "200") {
          this.$modal.notifySuccess(res.msg);
          // this.fetchData();
        }
      });
    },
    // 项目开关
    openStatusChange: debounce(async function ({ openStatus, projectCode }) {
      await toggle({ openStatus, projectCode });

      this.fetchData();
    }, 500),
    //table 点击事件
    gotoDetail(row) {
      const { id, projectCode } = row;
      this.$router.push({
        path: `/order/details/${id}?projectCode=${projectCode}`,
      });
    },
    //提交全部
    async validAllEvent() {
      const $table = this.$refs.xTable;

      if (checkRole(["pm"])) {
        // 有必填项未填 且为pm身份就提示报错
        const errMap = await $table.validate(true).catch((errMap) => errMap);
        if (errMap) {
          this.$notify({
            type: "warning",
            message: "请检查数据是否填写完整！",
          });
          return;
        }
      }

      const data = $table.getData();

      saveData(data).then((res) => {
        if (res.code == "200") {
          this.$modal.notifySuccess(res.msg);
          this.fetchData();
        }
      });
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
          dangerouslyUseHTMLString: true,
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

    // 设置填写权限
    activeCellMethod({ column }) {
      const { field } = column;
      // boss不能编辑
      // if (checkRole(["boss"])) {
      //   return false;
      // }
      // pm boss不能编辑这个字段 、
      if (checkRole(["pm", "boss"])) {
        if (
          [
            "grossProfitRiskLevel",
            "invoicingRiskLevel",
            "receiveRiskLevel",
            "riskStatus",
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
            "planReceiptsMoney",
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
    // 切换计划编辑状态
    async checkoutPlanEdit(data) {
      this.risk.planEditEnable = data;
      const res = await rkPlanEdit(data);
      if (res.code == "200") {
        this.$modal.notifySuccess(res.msg);
      }
      //重新获取数据
      this.fetchData();
    },
    // 导出
    async downloadFile() {
      const params = { ...this.filterParams, ...this.page };
      console.log(params);
      this.download(
        reportdataExort,
        params,
        `月计划列表_${new Date().getTime()}.xlsx`
      );
    },
    // 滚动事件
    scrollHandle: throttle(function ({
      isX,
      bodyWidth,
      scrollLeft,
      scrollWidth,
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
    150),

    // 表格选择性context样式
    cellClass({ row, column: { field } }) {
      return CONTEXT_CELL_CLASS_NAME(field, row);
    },

    // 表格选择性header样式
    headerCellClassName({ column: { property } }) {
      return HEADER_CELL_CLASS_NAME[property];
    },

    // 根据状态跳转新的tab-项目清单页
    projectTypeNav({ name }) {
      // 获取匹配的状态
      const projectType = this.riskStatusFilter.filter(({ label }) =>
        name.includes(label)
      )[0];

      // 没有匹配的不需要跳转
      if (!projectType?.value) return;

      // 同一个类型，不需要跳转
      if (projectType.value === this.$route.params.projectType) return;

      // 不同类型打开不同标签
      this.$router.push({
        path: `/order/list2/${projectType.value}/${
          this.filterParams?.oneDeptId || 0
        }`,
      });
    },

    // 跳转工单列表
    navPrderList(projectCode, billNum) {
      if (!billNum.count) return;
      this.$router.push({
        name: "Order-list",
        params: { projectCode },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.project-list {
  .filter-input {
    margin: 5px;
  }
  // 头部信息
  .header {
    height: 31px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    .title {
      display: flex;
      justify-content: flex-start;
    }
    .content {
      height: 100%;
      padding-top: 10px;
      span {
        padding-left: 15px;
        cursor: pointer;
        letter-spacing: 0;
        height: 31px;
        font-size: 12px;
      }
    }
  }

  // 法务接管
  .cell-lawsuit {
    background-color: #fef0f0 !important;
    a {
      color: #f56c6c !important;
      &::after {
        border-color: #f56c6c !important;
      }
    }
  }

  // 高风险
  .cell-red {
    background-color: #fef0f0 !important;
    a {
      color: #f56c6c !important;
      &::after {
        border-color: #f56c6c !important;
      }
    }
  }

  // 中风险
  .cell-yellow {
    background-color: #fdf6ec !important;
    a {
      color: #e6a23c !important;
      &::after {
        border-color: #e6a23c !important;
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

  // 超账期应收未收总额和超账期应开未开总额加粗
  ::v-deep .cell-block {
    font-weight: bold;
    color: #000;
  }
}
// 风控操作弹框样式
.risk-operation-class {
  display: flex;
  justify-content: space-around;
}
</style>
