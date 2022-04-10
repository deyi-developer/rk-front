<template>
  <div class="work-order page-bg">
    <header>
      <div class="order-title">
        <span>{{ info.eventHeaderCode }}</span>
        <span>{{ info.eventTitle }}</span>
        <span
          v-if="userRolse.includes('risker')"
          class="close-btn"
          style="float: right"
        >
          <el-button
            :disabled="info.eventStatus == 1"
            size="mini"
            type="danger"
            plain
            @click="closeOrder"
            >关闭工单</el-button
          >
        </span>
      </div>
      <ul class="order-info">
        <li class="order-item">
          <label class="space">状态:</label>
          <span class="value">
            <Badge v-if="info.eventStatus" status="default" text="已关闭" />
            <Badge v-else status="success" text="处理中" />
          </span>
        </li>
        <li class="order-item">
          <label class="space">优先级:</label>
          <span class="value">
            <Tag :color="color">
              {{
                selectDictLabel(
                  dict.type.event_urgency_level,
                  info.eventUrgencyLevel
                )
              }}
            </Tag>
          </span>
        </li>
        <li class="order-item">
          <label class="space">提出人:</label>
          <span class="value">
            <Icon type="md-person" color="#6B7285;" />{{
              info.createName
            }}</span
          >
        </li>
        <li class="order-item">
          <label class="space">提单时间:</label>
          <span class="value">
            <Icon type="ios-alarm" color="#6B7285;" />
            {{ info.createTime }}
          </span>
        </li>
      </ul>
      <el-row style="padding-top: 0">
        <el-col>
          <div class="content">
            <span v-html="info.eventContext"></span>
          </div>
        </el-col>
      </el-row>
      <div
        style="
          display: flex;
          align-items: center;
          cursor: pointer;
          font-weight: bold;
        "
        @click="editorVisible = !editorVisible"
      >
        <span :class="[editorVisible ? 'triangle-up' : 'triangle-down']"></span
        >沟通历史
      </div>
    </header>
    <div v-show="editorVisible" style="margin: 18px 0">
      <div v-if="info.eventStatus == 0">
        <span>交接人：</span>
        <el-select
          style="width: 20%; margin-bottom: 12px; margin-right: 24px"
          size="mini"
          v-model="eventHandler"
          filterable
          placeholder="请选择工单交接人"
          :filter-method="getHandlers"
          :loading="handlerLoding"
          clearable
        >
          <el-option
            v-for="item in handlers"
            :key="item.userId"
            :label="item.nickName"
            :value="item.userId"
          >
            <span style="float: left">{{ item.nickName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">
              {{ item.userId }}
            </span>
          </el-option>
        </el-select>
        <editor
          v-model="info.eventMsg"
          placeholder="请输入回复内容"
          :height="150"
        ></editor>
        <el-button
          style="margin: 12px 0"
          type="primary"
          size="small"
          @click="submit"
          >发 布</el-button
        >
      </div>

      <!-- <span>工单处理截止日期：</span>
      <el-date-picker
        style="width: 20%; margin-bottom: 12px"
        size="mini"
        v-model="time"
        type="date"
        placeholder="选择日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
      ></el-date-picker>-->

      <ul class="list">
        <li class="item" v-for="(item, index) in replyList" :key="index">
          <div class="top">
            <img class="avatar" :src="getAvatar(item.avatar)" />

            <p class="name">{{ item.nameOfRespondent }}</p>
            <p class="time">{{ formatDate(item.createDate) }}</p>
            <!-- <p class="reply" @click="editorVisible = !editorVisible">回复</p> -->
            <!-- item.eventCompleteStutas && item.showFlagButton -->

            <!-- 按钮的判段是后端showFlagButton+风控身份+工单为处理中 -->
            <div
              style="margin-left: auto"
              v-if="item.showFlagButton && checkRole(['risker'])"
            >
              <el-button type="success" plain size="mini" @click="edit(item, 1)"
                >已完成</el-button
              >
              <el-button plain type="danger" size="mini" @click="edit(item, 3)"
                >未完成</el-button
              >
            </div>

            <div style="margin-left: auto" v-if="item.showCompleteStutas">
              <span
                style="color: #67c23a; font-size: 12px"
                v-if="item.eventCompleteStutas == 1"
              >
                <i class="el-icon-check"></i> 已完成
              </span>
              <span v-else style="color: #f56c6c; font-size: 12px">
                <i class="el-icon-close"></i> 未完成
              </span>
            </div>
          </div>
          <div class="bottom" v-html="item.eventMsg"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/utils";
import { mapActions, mapGetters } from "vuex";
import { detail, reply, replyList, update } from "./api";
import { handlerList } from "../project/api";
import { edit } from "../order-list/api";
import { debounce } from "lodash-es";
import editor from "@/components/Editor";
import { Tag, Icon, Badge } from "view-design";
import defaultImg from "@/assets/images/avatar.png";
import { checkPermi, checkRole } from "@/utils/permission"; // 权限判断函数

export default {
  name: "Send",
  components: {
    editor,
    Badge,
    Tag,
    Icon
  },
  dicts: ["event_type", "event_urgency_level"],

  data() {
    return {
      defaultImg,
      errorAvatar: "this.src = '" + require("@/assets/images/avatar.png") + "'",
      info: {},
      replyList: [],
      editorVisible: true,
      eventHandler: "",
      handlers: [],
      handlerLoding: false,
      formatDate,
      time: ""
    };
  },

  // watch: {
  //   $route() {
  //     const {
  //       query: { id }
  //     } = this.$route;
  //     this.getDetailInfo(id);
  //     this.Messages();
  //   }
  // },

  computed: {
    ...mapGetters(["usersInfo", "userRolse"]),
    avatar() {
      return process.env.VUE_APP_BASE_API + this.usersInfo.avatar;
    },
    env() {
      return process.env.VUE_APP_BASE_API;
    },
    color() {
      let type = "";

      switch (this.info.eventUrgencyLevel) {
        case 1:
          type = "red";
          break;
        case 2:
          type = "orange";
          break;
        case 3:
          type = "yellow";
          break;
        case 4:
          type = "default";
          break;
        default:
          type = "default";
          break;
      }
      return type;
    }
  },

  async created() {
    const {
      query: { id }
    } = this.$route;
    if (id) {
      await this.getDetailInfo(id);

      //请求详情后再刷新消息列表
      await this.Messages();
    }
    this.getHandlers();
  },

  methods: {
    ...mapActions(["Messages"]),
    checkPermi,
    checkRole,
    getAvatar(url) {
      return url ? process.env.VUE_APP_BASE_API + url : defaultImg;
    },
    /** 获取详情数据 */
    async getDetailInfo(id) {
      const { data } = await detail({ eventHeaderId: id });
      this.info = data;
      this.info.eventHandler = this.usersInfo.userId; // 默认自己能搞定不转接
      this.info.forwardFlag = 0;
      this.getReplyList(id);
      const obj = Object.assign({}, this.$route, {
        title: "工单：" + data.eventTitle
      });
      this.$tab.updatePage(obj);
    },

    closeOrder() {
      this.$modal.confirm(`确定关闭此工单吗？`).then(async () => {
        const { eventHeaderId } = this.info;
        const { code, msg } = await edit({ eventHeaderId, eventStatus: 1 });
        if (code === 200) {
          this.$modal.msgSuccess(msg);
          this.getDetailInfo(this.$route.query.id);
          // this.getList()
        } else {
          this.$modal.msgError(msg);
        }
      });
    },

    /** 回复 */
    async submit() {
      console.log(this.eventHandler);
      if (this.eventHandler) {
        // 选择了交接人
        this.info.eventHandler = this.eventHandler;
        // if (!this.time) return this.$modal.msgError('请选择工单截止日期')
        // this.info.time = this.time
      } else {
        this.info.eventHandler = null;
      }
      this.info.forwardFlag = 1;
      const { code, msg } = await reply(this.info);
      if (code === 200) {
        this.$modal.msgSuccess(msg);
        this.getReplyList(this.$route.query.id);
      } else {
        this.$modal.msgError(msg);
      }

      this.clear();
    },

    /** 清空已选择的数据 */
    clear() {
      this.info.eventMsg = "";
      this.eventHandler = "";
      this.time = "";
    },

    /** 获取回复列表 */
    async getReplyList(id) {
      const { rows } = await replyList({ eventHeaderId: id });
      this.replyList = rows || [];
    },

    /** 修改 */
    edit(item, id) {
      this.$modal
        .confirm(`确定标记为${id === 1 ? "已完成" : "未完成"}吗？`)
        .then(async () => {
          const params = {
            eventHeaderId: item.eventHeaderId,
            eventLineId: item.eventLineId,
            eventCompleteStutas: id
          };
          const { code, msg } = await update(params);
          if (code === 200) {
            this.$modal.msgSuccess(msg);
            this.getReplyList(this.$route.query.id);
          } else {
            this.$modal.msgError(msg);
          }
        })
        .catch(() => {
          console.log("catch");
        });
    },

    getHandlers: debounce(async function (value) {
      this.handlerLoding = true;
      const params = { pageNum: 1, pageSize: 100, nickName: value };
      const { rows } = await handlerList(params);
      this.handlers = rows;
      this.handlerLoding = false;
    }, 500)
  }
};
</script>

<style lang="scss" scoped>
.work-order {
  padding: 20px;
  background: #fff;
  color: #606266;
  font-family: "Monospaced Number", "Chinese Quote", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  .order-title {
    span {
      margin-right: 15px;
      font-size: 20px;
      font-weight: 500;
      color: #262626;
      line-height: 28px;
      margin-bottom: 12px;
      word-break: break-all;
    }
    .close-btn {
      float: right;
      line-height: 20px;
    }
  }
  .avatar {
    border-radius: 50%;
  }
  .el-row {
    padding: 16px 0;
  }
  .el-divider__text {
    font-weight: bold;
  }
  .order-info {
    color: #909399;
    font-size: 12px;
    margin: 15px 0;
    .order-item {
      display: inline-block;
      list-style: none;
      margin-right: 30px;
      .space {
        display: inline-block;
        // min-width: 60px;
        margin-right: 6px;
        font-weight: 400;
      }
      .value {
        // color: #909399;
        font-size: 14px;
        font-weight: 400;
        color: #2b2d38;
      }
    }
  }
  .content {
    padding: 15px 0px 30px 0;
    border: 1px solid #e8eaec;
    border-left: none;
    border-right: none;
    color: #2b2d38;
    font-weight: 400;
  }
  .list {
    .item {
      padding: 12px;
      list-style: none;
      border: 1px solid #e8eaec;
      border-radius: 4px;
      margin-bottom: 12px;
      .top {
        display: flex;
        align-items: center;
        .avatar {
          align-self: flex-start;
          width: 24px;
          height: 24px;
        }
        .default-avatar {
          align-self: flex-start;
          width: 24px;
          height: 24px;
          line-height: 24px;
          background: rgb(4, 80, 143);
          border-radius: 50%;
          text-align: center;
          color: #fff;
        }
        .name {
          margin: 0 8px;
          color: #303133;
        }
        .reply,
        .time {
          color: rgb(194, 189, 189);
        }
        .reply {
          display: none;
          margin-left: 8px;
          cursor: pointer;
        }
        &:hover {
          .reply {
            display: block;
          }
        }
      }
      .bottom {
        margin-left: 32px;
        padding: 15px 0;
        font-size: 12px;
      }
    }
  }
  .triangle-down,
  .triangle-up {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    margin-right: 4px;
  }
  .triangle-up {
    border-bottom: 8px solid #000;
  }
  .triangle-down {
    border-top: 8px solid #000;
  }
}
</style>
