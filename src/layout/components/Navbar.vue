<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
      v-if="!topNav"
    />
    <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <search id="header-search" class="right-menu-item" />
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <Badge class="right-menu-item" :count="unread" :overflow-count="100">
          <Icon
            style="cursor: pointer"
            size="22"
            type="ios-notifications-outline"
            @click="$router.push({ path: '/order/message-list' })"
          ></Icon>
        </Badge>
      </template>

      <!-- <el-dropdown class="msg-menu-wrapper right-menu-item hover-effect" trigger="click">
        <span style="line-height: 20px; height: 20px"></span>
        <el-dropdown-menu slot="dropdown">
          <div class="msg-drop-menu">
            <Tabs size="small">
              <TabPane label="站内消息">
                <ul class="msg-list">
                  <li
                    class="msg-list-item"
                    v-for="(item, index) in messages"
                    :key="index"
                    @click="
                      $router.push({
                        path: '/order/send',
                        query: { id: item.busiKey }
                      })
                    " 
                  >
                    <span>{{ item.messageContent }}</span>
                    <span class="spot" v-show="!item.readFlag"></span>
                  </li>
                </ul>
              </TabPane>
            </Tabs>
          </div>
        </el-dropdown-menu>
      </el-dropdown>-->

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <span class="user-name">{{ $store.state.user.user.nickName }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>
              <span> <i class="el-icon-user"></i>个人中心 </span>
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="setting = true">
            <span> <i class="el-icon-setting"></i>布局设置 </span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span> <i class="el-icon-switch-button"></i>退出登录 </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { Badge, Icon, Tabs, TabPane } from "view-design"
import Breadcrumb from "@/components/Breadcrumb"
import TopNav from "@/components/TopNav"
import Hamburger from "@/components/Hamburger"
import Screenfull from "@/components/Screenfull"
import SizeSelect from "@/components/SizeSelect"
import Search from "@/components/HeaderSearch"
import RuoYiGit from "@/components/RuoYi/Git"
import RuoYiDoc from "@/components/RuoYi/Doc"

export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    Badge,
    Icon,
    RuoYiDoc,
    Tabs,
    TabPane,
  },
  data() {
    return {
      messageList: [],
    }
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device", "messages", "unread"]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val,
        })
      },
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      },
    },
  },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions(["Messages"]),

    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar")
    },

    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 清空页签
          this.$tab.closeAllPage()
          this.$store.dispatch("LogOut").then(() => {
            this.$router.replace("/login")
            window.location.reload(true)
          })
        })
        .catch(() => {})
    },
    /**
     * 消息列表
     */
    getList() {
      const params = {
        readFlag: 0, // 未读
      }
      this.Messages(params)
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .message-wrapper {
      i {
        cursor: pointer;
        font-size: 18px;
        vertical-align: middle;
      }
    }

    .avatar-container {
      margin-right: 15px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-name {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          font-size: 12px;
          text-align: center;
          vertical-align: top;
          margin-left: 5px;
        }
        .user-avatar {
          vertical-align: top;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        i {
          vertical-align: text-top;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.msg-drop-menu {
  padding: 0px 10px;
  font-size: 12px;
  .msg-list {
    max-width: 500px;
    li.msg-list-item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding: 5px 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
      .spot {
        display: inline-block;
        margin-left: 8px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgb(237, 10, 10);
      }
    }
  }
}
.nbsp {
  width: 14px;
}
.ivu-badge-count {
  top: 2px;
  right: 6px;
}
</style>
