<!--  -->
<template>
  <div class="list-item" @click="$emit('gotoProject', dataSource)">
    <div class="label-list-item">
      <el-checkbox :label="dataSource.noteId" :key="dataSource.noteId"
        ><a :style="{ display: 'none' }">占位</a></el-checkbox
      >
      <el-collapse-item :name="dataSource.noteId">
        <template slot="title">
          <div class="ellipsis title-font16" :style="{ marginRight: '50px' }">
            工单编号标题: {{ dataSource.orderCode || "无" }}
          </div>
          <div v-show="getDay(dataSource.headerEndDate) >= 1" class="end-date">
            <span class="risk-red end-date-content">
              已超过截止日期{{ getDay(dataSource.headerEndDate) }}天 {{ dataSource.headerEndDate }}
            </span>
          </div>
        </template>
        <div class="ellipsis project-name">
          项目编号标题: {{ dataSource.projectCode || "无" }}
        </div>
        <div class="ellipsis project-name">
          <span>截止日期: </span>
          <span>{{ dataSource.headerEndDate }}</span>
        </div>
        <div class="ellipsis project-name">
          <div>
            <span>创建人: </span>
            <span>{{ dataSource.createUserName || "无" }}</span>
          </div>
        </div>
        <div class="ellipsis project-name">
          <div class="title-font14">
            <span>提醒事项: </span>
            <span class="detail">{{ dataSource.noteContext || "无" }}</span>
          </div>
        </div>
      </el-collapse-item>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkeds: [],
    };
  },
  props: {
    dataSource: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
    },
  },
  components: {},
  methods: {
    // 获取已超期天数
    getDay(date) {
      return Math.floor(
        (new Date().getTime() - new Date(date).getTime()) / 1000 / 60 / 60 / 24
      );
    },
  },
  mounted() {},
  created() {},
};
</script>
<style lang="scss" scoped>
.list-item {
  left: auto;
  position: relative;
  border-radius: 5px;
  padding: 5px 20px 5px 10px;
  margin: 3px 10px 12px 5px;
  background-color: #fff;
  box-shadow: 0 0 2px 0 #dcdfe6, 0 2px 2px 0 #dcdfe6;
  font-size: 14px;
  color: #333;
  // font-weight: 700;
  ::v-deep .el-collapse-item__header {
    border: none !important;
  }
  ::v-deep .el-collapse-item__content {
    padding: 0 !important;
  }
  ::v-deep .el-collapse-item__wrap {
    border: none !important;
  }
  .item-line {
    line-height: 26px;
    width: 100%;
  }
  .title-font16 {
    font-size: 14px;
    font-weight: 500;
  }
  .title-font14 {
    font-size: 14px;
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
.label-list-item {
  display: flex;
  .el-checkbox {
    line-height: 47px;
    margin-right: 5px;
    // ::v-deep .el-checkbox__inner{
    //   width: 18px;
    //   height: 18px;
    // }
  }
  > div {
    width: 100%;
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
  height: 30px;
  line-height: 30px;
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

// 提醒事项换行
.detail {
  white-space: break-spaces;
}
/*滚动条里面小方块*/
.list-content::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 12px #f2f6fc;
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: #898989;
}
</style>
