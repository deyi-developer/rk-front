<template>
  <div class="work-order">
    <header>
      <h1>登高</h1>
      <el-row>
        <el-col span="12">
          <label class="space">项目</label>
          <span>无边落木萧萧下</span>
        </el-col>
        <el-col span="12">
          <label class="space">单据类型</label>
          <span>不尽长江滚滚来</span>
        </el-col>
      </el-row>
      <el-divider content-position="left">详情</el-divider>
      <el-row>
        <el-col span="12">
          <label class="space">服务目录</label>
          <span>万里悲秋常作客</span>
        </el-col>
        <el-col span="12">
          <label class="space">状态</label>
          <span>百年多病独登台</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <label class="space">描述</label>
          <el-input type="textarea"></el-input>
        </el-col>
      </el-row>
      <el-divider content-position="left">回复</el-divider>
    </header>
    <ul class="list">
      <li class="item" v-for="(item, index) in 1" :key="index">
        <div class="top">
          <div class="avatar">象</div>
          <p class="name">客服</p>
          <p class="time">2019-07-11 18:44:44</p>
          <p class="reply" @click="() => (choose = index)">回复</p>
        </div>
        <div class="bottom">小楼一夜听风雨,深巷明朝卖杏花</div>
        <editor
          style="margin-top: 12px"
          v-show="choose === index"
          height="200"
          @on-change="handleChange"
        ></editor>
      </li>
    </ul>
    <el-divider content-position="left">解决方案</el-divider>
    <el-row>
      <el-col>
        <label class="space">解决方案</label>
        <el-input type="textarea"></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import editor from "@/components/Editor";
export default {
  components: {
    editor,
  },
  data() {
    return {
      choose: -1,
    };
  },
  methods: {
    handleChange(value) {
      console.log("value", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.work-order {
  padding: 12px;
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