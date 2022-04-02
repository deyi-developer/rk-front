<template>
  <div class="page-bg" v-loading.fullscreen.lock="loading">
    <div class="app-container home">
      <div class="dept-select">
        当前数据范围：
        <el-popover
          v-model="visible"
          placement="bottom"
          width="200"
          @click="visible = true"
        >
          <el-select
            :disabled="checkRole(['pm'])"
            v-model="oneDeptId"
            size="small"
            placeholder="请选择部门"
          >
            <el-option
              v-for="dict in deptList"
              :key="dict.oneDeptId"
              :value="dict.oneDeptId"
              :label="dict.oneDeptName"
            ></el-option>
          </el-select>
          <p style="margin-top: 10px; text-align: right">
            <el-link type="primary" @click="selectDept">确认</el-link>
          </p>

          <span slot="reference" class="dept-select-name">
            {{ oneDeptName }} <i class="el-icon-arrow-down"></i
          ></span>
        </el-popover>
      </div>
      <PanelGroup :risk="risk" />
      <TableDesc :summary="summary" />
      <ChartsGroup :oneDeptId="oneDeptId" />
    </div>
  </div>
</template>
<script>
import { getSummary, getRiskNum } from "./dashboard/api";
import { getDeptList } from "@/api/common";
import { checkRole } from "@/utils/permission"; // 权限判断函数
import ChartsGroup from "./dashboard/ChartsGroup.vue";
import PanelGroup from "./dashboard/PanelGroup.vue";
import TableDesc from "./dashboard/TableDesc.vue";
export default {
  name: "Index",
  components: { PanelGroup, TableDesc, ChartsGroup },
  data() {
    return {
      oneDeptId: "",
      oneDeptName: "默认",
      selectDeptName: "",
      deptList: [],
      visible: false,
      loading: true,
      risk: {
        highRiskProjectNum: 0,
        highRiskProjectRate: 0,
        mediumRiskProjectNum: 0,
        mediumRiskProjectRate: 0,
        noRiskProjectNum: 0,
        noRiskProjectRate: 0,
        totalProjectNum: 0
      },
      summary: {
        billingMoney30Day: 0,
        billingMoney30to60Day: 0,
        billingMoney60to90Day: 0,
        billingMoney90Day: 0,
        billingRateOfTotalPjtd: 0,
        correspondingBillingRate: 0,
        pjtdTotalMoney: 0,
        receiptsMoney30Day: 0,
        receiptsMoney30to60Day: 0,
        receiptsMoney60to90Day: 0,
        receiptsMoney90Day: 0,
        receivedRateOfTotalPjtd: 0,
        relativeReceivableRate: 0,
        totalAlreadyBillingMoney: 0,
        totalBilling: 0,
        totalReceipts: 0,
        totalReceiptssMoney: 0,
        totalShouldBillingMoney: 0,
        totalShouldNotBillingMoney: 0,
        totalShouldNotReceiptsBilling: 0,
        totalShouldNotReceiptsMoney: 0,
        totalShouldReceiptsMoney: 0
      }
    };
  },
  created() {
    this.getData();
    getDeptList().then((res) => {
      if (res.code == 200) {
        this.deptList = res.rows;
        this.deptList = [
          {
            oneDeptId: "",
            oneDeptName: "默认"
          },
          ...this.deptList
        ];
      }
    });
  },
  activated() {
    this.getData();
  },
  methods: {
    checkRole,
    selectDept() {
      const obj = this.deptList.find(
        (item) => item.oneDeptId == this.oneDeptId
      );
      if (obj) {
        this.oneDeptName = obj.oneDeptName;
      }
      this.visible = false;
      this.getData();
    },

    async getData() {
      this.loading = true;
      const params = {
        oneDeptId: this.oneDeptId
      };
      await getRiskNum(params).then((res) => {
        if (res) {
          this.risk = res;
        }
      });
      await getSummary(params).then((res) => {
        if (res) {
          this.summary = res;
        }
      });
      this.loading = false;
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  padding: 5px 20px;
  .dept-select {
    text-align: right;
    font-size: 10px;
    margin-bottom: 5px;
    .dept-select-name {
      cursor: pointer;
      &:hover {
        color: lightskyblue;
      }
    }
  }
  .box-card {
    margin-bottom: 10px;
  }
  .echarts-panel {
    background: #fff;
    padding: 20px;
  }
}
</style>
