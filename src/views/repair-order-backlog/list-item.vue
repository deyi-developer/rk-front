<!--  -->
<template>
  <div class="list-item">
    <div class="risk-color" :class="riskClass"></div>
    <el-tooltip class="item" effect="dark" content="关闭" placement="top">
      <el-link
        class="close-btn"
        :underline="false"
        @click="$emit('close', dataSource, pid)"
        ><i class="el-icon-close"></i
      ></el-link>
    </el-tooltip>

    <div class="item-line">
      <span style="margin-right: 5px">
        <el-tag type="warning" size="mini"
          >{{ dataSource.eventTypeName }}
        </el-tag>
      </span>
      <el-link :underline="false" @click="$emit('gotoWorkOrder', dataSource)">{{
        dataSource.eventHeaderCode
      }}</el-link>
    </div>
    <!-- <div class="item-line order-name">
      <span>工单名称: </span>
      <el-tooltip
        class="item"
        effect="dark"
        :content="dataSource.eventTitle"
        placement="top"
      >
        <span style="cursor: pointer">{{ dataSource.eventTitle }}</span>
      </el-tooltip>
    </div> -->
    <div class="item-line">
      <span style="font-weight: bold">涉及金额: </span>
      <span style="font-weight: bold">{{ dataSource.eventAmount }}</span>
    </div>

    <div class="ellipsis project-code">
      <span>项目编码: </span>
      <span>{{ dataSource.projectCode }}</span>
    </div>
    <div class="ellipsis project-name">
      <span>项目名称: </span>
      <el-tooltip
        class="item"
        effect="dark"
        :content="dataSource.projectName"
        placement="top"
      >
        <span>{{ dataSource.projectName }}</span>
      </el-tooltip>
    </div>
    <div class="item-amount">
      <div>
        <span>责任人: </span>
        <span>{{ dataSource.handlerName || "无" }}</span>
      </div>
    </div>

    <div class="end-date">
      <span v-if="type === 'overdueWeekData'" class="risk-red end-date-content">
        已超期{{ Math.abs(dataSource.overdueDay) }}天<span>
          ({{ dataSource.headerEndDate }})</span
        ></span
      >
      <span
        v-else-if="type === 'nowWeekData'"
        class="risk-orange end-date-content"
        >本周{{ dayjs(dataSource.headerEndDate).format("dd")
        }}<span> ({{ dataSource.headerEndDate }})</span></span
      >

      <span
        v-else-if="type === 'nextOneWeekData'"
        class="risk-primary end-date-content"
        >下周{{ dayjs(dataSource.headerEndDate).format("dd")
        }}<span> ({{ dataSource.headerEndDate }})</span></span
      >
      <span
        v-else-if="type === 'nextTwoWeekData'"
        class="risk-default end-date-content"
        >下下周{{ dayjs(dataSource.headerEndDate).format("dd")
        }}<span> ({{ dataSource.headerEndDate }})</span></span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    dataSource: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String
    },
    pid: {
      type: String | Number
    }
  },
  components: {},
  computed: {
    riskClass() {
      let type = "";
      switch (this.dataSource.eventUrgencyLevelName) {
        case "紧急":
          type = "risk-red";
          break;
        case "高":
          type = "risk-orange";
          break;
        case "中":
          type = "risk-yellow";
          break;
        case "低":
          type = "risk-default";
          break;
        default:
          type = "risk-default";
          break;
      }
      return type;
    }
  },
  methods: {
    fmtCalendar(t) {
      const { createTime, headerEndDate } = t;
      return (
        this.dayjs().calendar(this.dayjs(createTime)) +
        " - " +
        this.dayjs().calendar(this.dayjs(headerEndDate))
      );
    }
  },
  mounted() {},
  created() {}
};
</script>
<style lang="scss" scoped>
.list-item {
  position: relative;
  width: 100%;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 0px 0px 12px 5px;
  background-color: #fff;
  box-shadow: 0 0 8px 0 rgb(232 237 250 / 60%),
    0 2px 4px 0 rgb(232 237 250 / 50%);
  font-size: 14px;
  color: #333;
  // font-weight: 700;
  .item-line {
    line-height: 26px;
    width: 100%;
  }
  .project-name,
  .project-code {
    font-size: 10px;
    color: #808695;
  }
  .order-name {
    margin-bottom: 5px;
  }

  .item-amount {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #808695;
    margin-bottom: 8px;
  }

  .end-date {
    font-size: 12px;
    .end-date-content {
      border-radius: 3px;
      padding: 5px 10px;
    }
  }
}
.risk-color {
  position: absolute;
  left: 0;
  top: 0;
  width: 5px;
  height: 100%;
  border-radius: 5px 0 0 5px;
  z-index: 999;
}

.close-btn {
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 14px;
}

.risk-red {
  background-color: #ed4014;
  color: #fff;
}
.risk-orange {
  background-color: #f90;
  color: #fff;
}
.risk-primary {
  background-color: #2d8cf0;
  color: #fff;
}
.risk-default {
  background-color: #f7f7f7;
  color: #515a6e;
}
</style>
