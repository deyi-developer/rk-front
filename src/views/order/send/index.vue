<template>
  <div class="work-order page-bg">
    <header>
      <h1 style="font-weight: 500;">{{ info.eventTitle }}</h1>
      <el-row>
        <el-col :span="12">
          <label class="space">项目编码:</label>
          <span>{{ info.projectCode }}</span>
        </el-col>
        <el-col :span="12">
          <label class="space">工单类型:</label>

          <span>{{ selectDictLabel(dict.type.event_type, info.eventType) }}</span>
        </el-col>
      </el-row>
      <el-divider content-position="left">内容</el-divider>
      <!-- <el-row>
        <el-col :span="12">
          <label class="space">服务目录:</label>
          <span>万里悲秋常作客</span>
        </el-col>
        <el-col :span="12">
          <label class="space">状态:</label>
          <span>百年多病独登台</span>
        </el-col>
      </el-row>-->
      <el-row style="padding-top: 0;">
        <el-col>
          <!-- <label class="space">内容</label> -->
          <div class="content">
            <span v-html="info.eventContext"></span>
          </div>
        </el-col>
      </el-row>
      <el-divider content-position="left">回复</el-divider>
    </header>
    <ul class="list">
      <li class="item" v-for="(item, index) in replyList" :key="index">
        <div class="top">
          <img class="avatar" :src="avatar" />
          <p class="name">{{ usersInfo.userName }}</p>
          <p class="time">2019-07-11 18:44:44</p>
          <p class="reply" @click="editorVisible = !editorVisible">回复</p>
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
    <el-card v-show="editorVisible" style="margin: 12px 0">
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
      <editor
        v-model="info.eventMsg"
        style="margin-bottom: 12px"
        placeholder="请输入回复内容"
        :height="200"
      ></editor>
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </el-card>
    <!-- <el-divider content-position="left">解决方案</el-divider>
    <el-row>
      <el-col>
        <label class="space">解决方案</label>
        <el-input type="textarea"></el-input>
      </el-col>
    </el-row>-->
  </div>
</template>
<script>

import { mapActions } from 'vuex'
import { debounce } from "lodash-es";
import { detail, reply, replyList, update } from './api'
import { mapGetters } from 'vuex'
import editor from "@/components/Editor"
export default {
  components: {
    editor
  },
  dicts: ["event_type"],

  data() {
    return {
      info: {},
      replyList: [],
      editorVisible: true,
      eventHandler: ''
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
    }
  },

  created() {
    const { query: { id } } = this.$route
    if (id) {
      this.getDetailInfo(id)
      this.Messages()
    }
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
      this.$modal.confirm('确定吗？').then(async () => {
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
    }
  }
}
</script>
<script setup>
import { handlerList } from "../project/api"
import { ref } from "@vue/composition-api";

let handlers = ref([])
let handlerLoding = ref(false)
const getHandlers = debounce(async (value) => {
  handlerLoding.value = true
  const params = {
    pageNum: 1,
    pageSize: 10, // 只显示十条，如果用户找不到会输入更详细名称
    nickName: value
  }
  const { rows } = await handlerList(params)
  handlers.value = rows || []
  handlerLoding.value = false
}, 500)

</script>

<style lang="scss" scoped>
.work-order {
  margin: 20px;
  padding: 24px;
  background: #fff;
  .el-row {
    padding: 16px 0;
  }
  .el-divider__text {
    font-weight: bold;
  }
  .space {
    display: inline-block;
    min-width: 60px;
    margin-right: 80px;
    font-weight: 400;
  }
  .content {
    padding: 16px 12px;
    border: 1px solid #ddd;
  }
  .item {
    padding: 16px 0;
    padding-bottom: 0;
    list-style: none;
    .top {
      display: flex;
      align-items: center;
      .avatar {
        align-self: flex-start;
        width: 32px;
        height: 32px;
        color: #fff;
        text-align: center;
        line-height: 32px;
        border-radius: 50%;
        background: rgb(4, 80, 143);
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
      padding-bottom: 16px;
      margin-left: 40px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>