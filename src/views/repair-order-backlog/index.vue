<template>
  <div class="repair_order_backlog">
    <div class="quartering">
      <div class="list-wrap" v-for="(item, pid) of list" :key="item.type">
        <h3 class="title">
          {{ item.title }}
          <span class="title-num">{{ item.data.length }}</span>
        </h3>
        <div class="list-content">
          <transition-group leave-active-class="animated bounceOutRight">
            <list-item
              v-for="itemElement of item.data"
              :key="itemElement.eventHeaderId"
              :dataSource="itemElement"
              :type="item.type"
              :pid="pid"
              @close="close"
              @gotoWorkOrder="gotoWorkOrder"
            />
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentMonthApi } from "./api";
import { edit } from "../order/order-list/api";
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
    getCurrentMonthApi({ weekType: null }).then((res) => {
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
    close(dataSource, pid, cid) {
      const { eventHeaderId } = dataSource;
      // 这两行调试用的
      // const newList = this.deleteItem(pid, eventHeaderId);
      // this.list[pid]["data"] = newList;
      this.$confirm("确认关闭该工单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async () => {
        const { code, msg } = await edit({
          eventHeaderId,
          eventStatus: 1
        });
        if (code === 200) {
          this.$modal.msgSuccess(msg);
          const newList = this.deleteItem(pid, eventHeaderId);
          this.list[pid]["data"] = newList;
        } else {
          this.$modal.msgError(msg);
        }
      });
    },
    // 根据pid cid找到数据，然后本地删除数据
    deleteItem(pid, cid) {
      const list = this.list[pid]["data"];
      const newList = list.filter((item) => item.eventHeaderId != cid);
      return newList;
    },
    gotoWorkOrder({ eventHeaderId }) {
      this.$router.push({
        path: `/work/details/${eventHeaderId}`,
        query: { id: eventHeaderId }
      });
    }
  }
};
</script>

<style lang="scss">
.repair_order_backlog {
  padding: 10px 20px 0 10px;
  background-color: #f8f8f9;
  .quartering {
    .el-tag--medium {
      border-radius: 10px;
    }
    .list-wrap {
      display: inline-block;
      width: 24.5%;
      .title {
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        font-weight: 700;
        font-size: 14px;
        .title-num {
          color: #c0c4cc;
          margin-left: 10px;
        }
      }
      .list-content {
        overflow-y: scroll;
        height: calc(100vh - 125px);
        padding: 0 7px 5px 3px;
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

  .borderRad5 {
    border-radius: 5px;
  }

  /*滚动条整体样式,高宽分别对应横竖滚动条的尺寸*/
  .list-content::-webkit-scrollbar {
    width: 6px;
    height: 2px;
    scrollbar-arrow-color: #898989;
  }
  /*滚动条里面小方块*/
  .list-content::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px #f2f6fc;
    background: rgba(0, 0, 0, 0.2);
    scrollbar-arrow-color: #898989;
  }
}
</style>
