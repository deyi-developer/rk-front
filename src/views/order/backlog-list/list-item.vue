<!--  -->
<template>
  <div
    class="list-item"
    @click="$emit('gotoProject', dataSource)"
    :style="{
      backgroundColor: dataSource.noteStatus === 1 ? '#EBEEF5' : '#fff',
    }"
  >
    <!-- 中划线 -->
    <div v-if="dataSource.noteStatus === 1" class="wire">
    </div>
    
    <div class="label-list-item">
      <el-checkbox
        :style="{ opacity: dataSource.noteStatus === 1 ? '0' : '1' }"
        :label="dataSource.noteId"
        :key="dataSource.noteId"
        ><a :style="{ display: 'none' }">占位</a></el-checkbox
      >
      <el-collapse-item
        :name="dataSource.noteId"
        :style="{
          backgroundColor: dataSource.noteStatus === 1 ? '#EBEEF5' : '#fff',
        }"
      >
        <template slot="title">
          <el-row :style="{ width: '100%' }" :gutter="24">
            <el-col :span="10">
              <div class="ellipsis title-font16 title-margin title-remind">
                <span class="fontW">提醒事项: </span>
                <el-tooltip
                  popper-class="item-tooltip"
                  effect="dark"
                  :content="dataSource.noteContext || '无'"
                  placement="top-start"
                >
                  <span class="detail">{{
                    dataSource.noteContext || "无"
                  }}</span>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="ellipsis title-font16 title-margin title-remind">
                <span class="fontW">工单编号: </span>
                <el-tooltip
                  popper-class="item-tooltip"
                  class="item"
                  effect="dark"
                  :content="dataSource.orderCode || '无'"
                  placement="top-start"
                >
                  <span class="detail">{{ dataSource.orderCode || "无" }}</span>
                </el-tooltip>
              </div>
            </el-col>
            <!-- 超期一天或者未完成则显示 -->
            <el-col :span="8">
              <div class="end-date">
                <span>截止日期: </span>
                <span :style="{ marginRight: '10px' }">{{
                  dataSource.headerEndDate
                }}</span>
                <span
                  v-show="
                    getDay(dataSource.headerEndDate) >= 1 &&
                    dataSource.noteStatus === 0
                  "
                  class="risk-red end-date-content"
                >
                  <!-- :style="{backgroundColor: dataSource.noteStatus === 1 ? '#F56C6C' : '#ed4014'}" -->
                  已超过截止日期{{ getDay(dataSource.headerEndDate) }}天
                  <!-- {{ dataSource.headerEndDate }} -->
                </span>
              </div>
              <!-- <div
                v-show="
                  !(
                    getDay(dataSource.headerEndDate) >= 1 &&
                    dataSource.noteStatus === 0
                  )
                "
                class="ellipsis project-name"
              >
                <span>截止日期: </span>
                <span>{{ dataSource.headerEndDate }}</span>
              </div> -->
            </el-col>
          </el-row>
        </template>
        <div class="ellipsis project-name">
          项目编号: {{ dataSource.projectCode || "无" }}
        </div>
        <!-- <div class="ellipsis project-name">
          <span>截止日期: </span>
          <span>{{ dataSource.headerEndDate }}</span>
        </div> -->
        <div class="ellipsis project-name">
          <div>
            <span>创建人: </span>
            <span>{{ dataSource.createUserName || "无" }}</span>
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
  // background-color: #fff;
  box-shadow: 0 0 2px 0 #dcdfe6, 0 2px 2px 0 #dcdfe6;
  font-size: 14px;
  color: #333;
  // font-weight: 700;
  .wire {
    width: 95%;
    height: 2px;
    border-top: 2px solid #ccc;
    position: absolute;
    top: 30px;
  }
  ::v-deep .el-collapse-item__header {
    border: none !important;
    background-color: transparent;
  }
  ::v-deep .el-collapse-item__content {
    padding: 0 !important;
  }
  ::v-deep .el-collapse-item__wrap {
    border: none !important;
    background-color: transparent;
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
    white-space: nowrap;
    .end-date-content {
      border-radius: 3px;
      padding: 5px 10px;
      white-space: nowrap;
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

.title-margin {
  margin-right: 50px;
  // width: 300px;
}

// 提醒事项换行
.detail {
  white-space: break-spaces;
  font-size: 14px;
  color: #303133;    
  // max-width: 500px;
  // display: inline-block;
}
.fontW {
  font-weight: 550;
}
/*滚动条里面小方块*/
.list-content::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 12px #f2f6fc;
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: #898989;
}
.transition-box {
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.title-remind {
  max-width: 500px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.item-tooltip{
  max-width:30% !important
}
</style>
