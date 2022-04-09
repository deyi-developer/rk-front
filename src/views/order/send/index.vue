<template>
  <div class="work-order page-bg">
    <header>
      <h1 style="font-weight: 500; color: #000;">{{ info.eventHeaderCode }} {{ info.eventTitle }}</h1>
      <ul class="order-info">
        <li class="order-item">
          <label class="space">状态:</label>
          <span class="value">{{ info.eventStatus ? '已关闭' : '未完成' }}</span>
        </li>
        <li class="order-item">
          <label class="space">优先级:</label>
          <span
            class="value"
          >{{ selectDictLabel(dict.type.event_urgency_level, info.eventUrgencyLevel) }}</span>
        </li>
        <li class="order-item">
          <label class="space">提出人:</label>
          <span class="value">{{ info.createName }}</span>
        </li>
        <li class="order-item">
          <label class="space">提单时间:</label>
          <span class="value">{{ info.createTime }}</span>
        </li>
      </ul>
      <el-row style="padding-top: 0;">
        <el-col>
          <div class="content">
            <span v-html="info.eventContext"></span>
          </div>
        </el-col>
      </el-row>
      <div
        style="display: flex; align-items: center; cursor: pointer;"
        @click="editorVisible = !editorVisible"
      >
        <span :class="[editorVisible ? 'triangle-up' : 'triangle-down']"></span>沟通历史
      </div>
    </header>
    <div v-show="editorVisible" style="margin: 12px 0">
      <span>交接人：</span>
      <el-select
        style="width: 30%; margin-bottom: 12px;"
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
        ></el-option>
      </el-select>
      <editor v-model="info.eventMsg" placeholder="请输入回复内容" :height="200"></editor>
      <el-button style="margin: 12px 0" type="primary" size="small" @click="submit">发 布</el-button>
      <ul class="list">
        <li class="item" v-for="(item, index) in replyList" :key="index">
          <div class="top">
            <img class="avatar" :src="env + item.avatar" v-if="item.avatar" />
            <div class="default-avatar" v-else>{{ item.nameOfRespondent.substr(0, 1) }}</div>
            <p class="name">{{ item.nameOfRespondent }}</p>
            <p class="time">{{ formatDate(item.createDate) }}</p>
            <!-- <p class="reply" @click="editorVisible = !editorVisible">回复</p> -->
            <div style="margin-left: auto;" v-if="!item.eventCompleteStutas && item.showFlagButton">
              <el-button size="mini" @click="edit(item, 1)">已完成</el-button>
              <el-button size="mini" @click="edit(item, 3)">未完成</el-button>
            </div>
            <div style="margin-left: auto;" v-else>
              <label>状态：</label>
              <span>{{ item.eventCompleteStutas === 1 ? '已完成' : '未完成' }}</span>
            </div>
          </div>
          <div class="bottom" v-html="item.eventMsg"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/utils'
import { mapActions } from 'vuex'
import { detail, reply, replyList, update } from './api'
import { mapGetters } from 'vuex'
import { handlerList } from "../project/api"
import { debounce } from "lodash-es";
import editor from "@/components/Editor"
export default {
  components: {
    editor
  },
  dicts: ["event_type", "event_urgency_level"],

  data() {
    return {
      info: {},
      replyList: [],
      editorVisible: true,
      eventHandler: '',
      handlers: [],
      handlerLoding: false,
      formatDate
    }
  },

  watch: {
    '$route'() {
      const { query: { id } } = this.$route
      this.getDetailInfo(id)
      this.Messages()
    }
  },

  computed: {
    ...mapGetters(['usersInfo']),
    avatar() {
      return process.env.VUE_APP_BASE_API + this.usersInfo.avatar
    },
    env() {
      return process.env.VUE_APP_BASE_API
    }
  },

  created() {
    const { query: { id } } = this.$route
    if (id) {
      this.getDetailInfo(id)
      this.Messages()
    }
    this.getHandlers()
  },

  methods: {
    ...mapActions(['Messages']),

    /** 获取详情数据 */
    async getDetailInfo(id) {
      const { data } = await detail(id)
      this.info = data
      this.info.eventHandler = this.usersInfo.userId // 默认自己能搞定不转接
      this.info.forwardFlag = 0
      this.getReplyList(id)
    },

    /** 回复 */
    async submit() {
      this.info.eventHandler = this.eventHandler // 选择了交接人
      this.info.forwardFlag = 1
      const { code, msg } = await reply(this.info)
      if (code === 200) {
        this.$modal.msgSuccess(msg);
        this.getReplyList(this.$route.query.id)
        // this.info = {}
        this.info.eventMsg = ''
        this.eventHandler = ''
      } else {
        this.$modal.msgError(msg);
      }
    },

    /** 获取回复列表 */
    async getReplyList(id) {
      const { rows } = await replyList({ eventHeaderId: id })
      this.replyList = rows || []
    },

    /** 修改 */
    edit(item, id) {
      this.$modal.confirm(`确定标记为${id === 1 ? '已完成' : '未完成'}吗？`).then(async () => {
        const params = {
          eventHeaderId: item.eventHeaderId,
          eventLineId: item.eventLineId,
          eventCompleteStutas: id
        }
        const { code, msg } = await update(params)
        if (code === 200) {
          this.$modal.msgSuccess(msg);
          this.getReplyList(this.$route.query.id)
        } else {
          this.$modal.msgError(msg);
        }
      }).catch(() => {
        console.log('catch')
      })
    },

    getHandlers: debounce(async function (value) {
      this.handlerLoding = true
      const params = { pageNum: 1, pageSize: 100, nickName: value }
      const { rows } = await handlerList(params)
      this.handlers = rows
      this.handlerLoding = false
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.work-order {
  padding: 20px;
  background: #fff;
  .el-row {
    padding: 16px 0;
  }
  .el-divider__text {
    font-weight: bold;
  }
  .order-info {
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 16px 0;
    .order-item {
      list-style: none;
      .space {
        display: inline-block;
        // min-width: 60px;
        margin-right: 6px;
        font-weight: 400;
      }
      .value {
        color: #000;
      }
    }
  }
  .content {
    padding: 16px 0px;
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
  }
  .list {
    .item {
      padding: 12px;
      list-style: none;
      border: 1px solid #e4e8f1;
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