<!--  -->
<template>
  <div class="list-item" @click="$emit('gotoProject', dataSource)">
    <!-- <div class="risk-color" :class="riskClass"></div> -->
    <div class="item-line">
      <span style="margin-right: 5px">
        <el-tag type="warning" size="mini"
          >{{ dataSource.eventTypeName }}
        </el-tag>
      </span>
      {{
        dataSource.eventHeaderCode
      }}
    </div>
    <div class="item-line">
      <span style="font-weight: bold">涉及金额: </span>
      <span style="font-weight: bold">{{ dataSource.eventAmount }}</span>
    </div>

    <div class=" project-code">
      <span>项目编码: </span>
      <span>
        <a class="project-link">{{
          dataSource.projectCode
        }}</a></span
      >
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
import { checkRole } from "@/utils/permission"; // 权限判断函数

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
    checkRole,
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
  left: auto;
  cursor: pointer;
  position: relative;
  width: 95%;
  border-radius: 5px;
  padding: 10px 20px 10px 10px;
  margin: 3px 0px 12px 5px;
  background-color: #fff;
  box-shadow: 0 0 8px 0 #ccc,
    0 2px 4px 0 #ccc;
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
  .project-link {
    color: #808695;
    // &:hover {
    //   color: #2d8cf0;
    // }
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
/*滚动条整体样式,高宽分别对应横竖滚动条的尺寸*/
.list-content::-webkit-scrollbar {
  width: 12px;
  height: 2px;
  scrollbar-arrow-color: #898989;
}
/*滚动条里面小方块*/
.list-content::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 12px #f2f6fc;
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: #898989;
}
</style>
