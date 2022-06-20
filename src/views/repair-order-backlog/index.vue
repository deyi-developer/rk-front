<template>
  <div class="repair_order_backlog">
    <el-card class="space">
      <div class="quartering">
        <div class="quarteringFlex" v-for="item of list" :key="item.type">
          <!-- <div>{{ item.data.content }}</div> -->
          <h3 class="title">
            {{ item.title }}
            <span style="color: #909399; font-size: 10px">{{
              item.data.length
            }}</span>
          </h3>
          <div
            v-for="(itemElement, index) of item.data"
            class="quarteringBorder"
          >
            <transition name="el-fade-in-linear">
              <list-item
                :itemElement="itemElement"
                :type="item.type"
                :key="index"
                @close="close"
              />
            </transition>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getCurrentMonthApi, edit } from "./api";
import ListItem from "./list-item.vue";
export default {
  name: "repairOrderBacklog",
  components: { ListItem },
  data() {
    return {
      list: [
        {
          title: "超期",
          type: "overdueWeekData",
          data: []
        },
        {
          title: "本周",
          type: "nowWeekData",
          data: []
        },
        {
          title: "未来一周",
          type: "nextOneWeekData",
          data: []
        },
        {
          title: "未来两周",
          type: "nextTwoWeekData",
          data: []
        }
      ]
    };
  },
  created() {
    // 初始加载所有数据  ----接口功能问题，weekType暂时传，获取全部数据传null或不传
    getCurrentMonthApi({ weekType: 1 }).then((res) => {
      // 处理数据
      const newData = this.list.map((o) => {
        const type = o.type;
        const data = res[type]?.rows || [];
        return { ...o, data };
      });
      this.list = newData;
    });
  },
  methods: {
    close(params) {
      this.$alert("确认关闭该工单吗?", "", {
        confirmButtonText: "确定",
        callback: async (action) => {
          // eventHeaderId没有值，等接口好了之后放开注释代码即可
          // const res = await edit({
          //   eventHeaderId: params.itemElement.eventHeaderId,
          //   eventStatus: 1,
          // });
          // if (res.code === 200) {
          //   this.$modal.msgSuccess("删除成功!");
          // 静态删除选择的工单  -----params.index点击的是哪一条数据    ----用于动画处理，列表用 show 字段来处理
          // this.$set(this.list[index].data[params.index], "show", true);
          //   return true;
          // }
          // this.$modal.msgSuccess(res.msg || "删除失败!");
        }
      });
    }
  }
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
