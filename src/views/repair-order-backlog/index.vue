<template>
  <div class="repair_order_backlog">
    <el-card class="space">
      <div class="quartering">
        <div class="quarteringFlex" v-for="(item, index) of list" :key="index">
          <!-- <div>{{ item.data.content }}</div> -->
          <h3 class="title">
            {{ item.title }}
            <span style="color: #909399; font-size: 10px">{{
              item.data.length
            }}</span>
          </h3>
          <div
            v-for="(itemElement, index) of item.data"
            :key="index"
            class="quarteringBorder"
          >
            <el-collapse-transition
              name="custom-classes-transition"
              leave-active-class="animated bounceOutRight"
            >
              <div class="quarteringPadd" v-if="!itemElement.show">
                <a
                  class="close"
                  @click="close({ itemElement, name: item.name, index })"
                  >关闭</a
                >
                <div>
                  <span>工单编号: </span>
                  <span style="font-size: 14px">{{
                    itemElement.eventHeaderCode
                  }}</span>
                </div>
                <div>
                  <span>工单名称: </span>
                  <span style="font-size: 14px">{{
                    itemElement.eventTitle
                  }}</span>
                </div>
                <div>
                  <span>项目编码: </span>
                  <span style="font-size: 14px">{{
                    itemElement.projectCode
                  }}</span>
                </div>
                <div>
                  <span>项目名称: </span>
                  <span style="font-size: 14px">{{
                    itemElement.projectName
                  }}</span>
                </div>
                <div>
                  <span>工单内容: </span>
                  <span style="font-size: 14px">{{
                    itemElement.eventContext
                  }}</span>
                </div>
                <div>
                  <span>责任人: </span>
                  <span style="font-size: 14px"><el-tag
                      class="borderRad5"
                      style="margin-left: 3px"
                      size="small"
                      >{{ itemElement.handlerName || "无" }}</el-tag
                    ></span>
                </div>
                <div>
                  <span>优先级/状态: </span>
                  <span style="font-size: 14px">
                    <el-tag class="borderRad5" size="small">{{
                      itemElement.eventUrgencyLevelName || "无"
                    }}</el-tag>
                    <el-tag
                      class="borderRad5"
                      style="margin-left: 3px"
                      type="danger"
                      size="small"
                      >{{ itemElement.eventStatus || "无" }}</el-tag
                    ></span>
                </div>
                <div>
                  <span>工单类型: </span>
                  <span style="font-size: 14px">
                  <el-tag
                      class="borderRad5"
                      style="margin-left: 3px"
                      size="small"
                      >{{ itemElement.eventTypeName || "无" }}</el-tag
                    ></span>
                </div>
                <div>
                  <span>涉及金额: </span>
                  <span style="font-size: 14px">{{
                    itemElement.eventAmount
                  }}</span>
                </div>
                <div>
                  <span>提单日期: </span>
                  <span style="font-size: 14px">{{
                    itemElement.createTime
                  }}</span>
                </div>
                <div>
                  <span>截止时间: </span>
                  <span style="font-size: 14px">{{
                    itemElement.headerEndDate
                  }}</span>
                </div>
              </div>
            </el-collapse-transition>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getCurrentMonthApi, edit } from "./api";
export default {
  name: "repairOrderBacklog",
  data() {
    return {
      list: [
        {
          title: "超期",
          data: [],
        },
        {
          title: "本周",
          data: [],
        },
        {
          title: "未来一周",
          data: [],
        },
        {
          title: "未来两周",
          data: [],
        },
      ],
      titles: {
        overdueWeekData: "超期",
        nowWeekData: "本周",
        nextOneWeekData: "未来一周",
        nextTwoWeekData: "未来两周",
      },
      labelStyle: {
        color: "#909399",
        display: "flex",
        alignItems: "center",
      },
      contentStyle: {
        fontSize: "12px",
        fontFamily:
          "LarkHackSafariFont,LarkEmojiFont,LarkChineseQuote,-apple-system,BlinkMacSystemFont,Helvetica Neue,Tahoma,PingFang SC,Microsoft Yahei,Arial,Hiragino Sans GB,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
      },
      threeStyle: {
        paddingLeft: "12px",
        marginTop: "4px",
        color: "rgb(144, 147, 153)",
        fontSize: "12px",
      },
    };
  },
  created() {
    // 初始加载所有数据
    getCurrentMonthApi({ weekType: 1 }).then((res) => {
      // 根据字段来匹配顺序
      const resKeys = Object.keys(this.titles);
      // 处理数据
      const resData = resKeys.map((item) => {
        return {
          data: res[item] ? res[item].rows : [],
          title: this.titles[item],
          name: item,
        };
      });
      this.list = resData;
    });
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.go(-1);
      }
    },
    close(params) {
      this.$alert("确认关闭该工单吗?", "", {
        confirmButtonText: "确定",
        callback: async (action) => {
          // 获取需要关闭的是哪一个页签
          const index = Object.keys(this.titles).indexOf(params.name);
          if (index < 0) {
            this.$modal.msgError("程序错误!");
          }
          // eventHeaderId没有值，等接口好了之后放开注释代码即可
          // const res = await edit({
          //   eventHeaderId: params.itemElement.eventHeaderId,
          //   eventStatus: 1,
          // });
          // if (res.code === 200) {
          //   this.$modal.msgSuccess("删除成功!");
            // 静态删除选择的工单  -----params.index点击的是哪一条数据    ----用于动画处理，列表用 show 字段来处理
            this.$set(this.list[index].data[params.index], "show", true);
          //   return true;
          // }
          // this.$modal.msgSuccess(res.msg || "删除失败!");
        },
      });
    },
  },
};
</script>

<style lang="scss">
.repair_order_backlog {
  background: #eee;
  // padding: 20px;
  min-height: calc(100vh - 84px);
  font-size: 12px;
  .space {
    min-height: calc(100vh - 124px);
    background-color: #eee;
    box-shadow: none;
    .quartering {
      .el-tag--medium {
        border-radius: 10px;
      }
      display: flex;
      .quarteringFlex {
        overflow-y: scroll;
        outline: none;
        height: calc(100vh - 152px);
        flex: 1 1 0;
        margin-top: 30px;
        margin-right: 5px;
        padding: 0 7px 5px 3px;
        border-radius: 5px;
        border-top: 5px solid #eee;
        background-color: transparent;
        transition: all 3s ease;
        &:nth-last-of-type(1) {
          margin-right: 0;
        }
      }
      .quarteringBorder {
        width: 100%;
        position: relative;
        background-color: #fff;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        transition: all 3s ease;
        .close {
          position: absolute;
          right: 5px;
        }
      }
      .quarteringPadd {
        padding: 10px 15px;
        margin: 0px 0px 12px 5px;
      }
    }
  }

  .flowClamp {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 250px;
    display: inline-block;
    margin-top: 4px;
  }

  .title {
    position: fixed;
    margin-left: 5px;
    margin-top: -35px;
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    background-color: #ccc;
    font-weight: 700;
    font-size: 14px;
    border-radius: 3px;
    z-index: 99;
  }

  .borderRad5 {
    border-radius: 5px;
  }

  .font {
    font-size: 12px;
    color: red;
  }
  /*滚动条整体样式,高宽分别对应横竖滚动条的尺寸*/
  .quarteringFlex::-webkit-scrollbar {
    width: 6px;
    height: 2px;
    scrollbar-arrow-color: #898989;
  }
  /*滚动条里面小方块*/
  .quarteringFlex::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px #f2f6fc;
    background: rgba(0, 0, 0, 0.2);
    scrollbar-arrow-color: #898989;
  }
  /*滚动条里面轨道*/
  .quarteringFlex::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px #eee;
    border-radius: 0;
    background: #eee;
  }

  .divdiv {
    width: 50px;
    transition: all 3s ease;
    background-color: red;
  }
  .divdiv:hover {
    width: 300px;
  }
}
</style>
