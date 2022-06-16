<template>
  <div class="repair_order_backlog">
    <el-card class="space">
      <div class="quartering">
        <div class="quarteringFlex" v-for="(item, index) of list" :key="index">
          <!-- <div>{{ item.data.content }}</div> -->
          <h3 class="title">
            {{ item.title }}
            <span style="color: #909399; font-size: 10px">{{ index }}</span>
          </h3>

          <div
            v-for="(itemElement, index) of item"
            :key="index"
            class="quarteringBorder"
          >
            <a class="close" @click="close">关闭</a>
            <el-descriptions
              :labelStyle="{ ...labelStyle, ...contentStyle }"
              :contentStyle="contentStyle"
              class="margin-top"
              :column="1"
              direction="horizontal"
            >
              <el-descriptions-item label="工单编号"
                ><span style="font-size: 14px"
                  >kooriookami</span
                ></el-descriptions-item
              >
              <el-descriptions-item
                labelClassName="font-size-lable"
                label="工单名称"
                >这是个测试工单</el-descriptions-item
              >
              <el-descriptions-item label="项目编码"
                ><el-tag class="borderRad5" size="small"
                  >18100000000</el-tag
                ></el-descriptions-item
              >
              <el-descriptions-item
                :labelStyle="{ ...labelStyle, ...contentStyle }"
                :contentStyle="contentStyle"
                label="项目名称"
                :span="2"
                ><el-tooltip placement="top">
                  <div slot="content">内部项目名称</div>
                  <span class="flowClamp"
                    >内部项目名称内部项目名称内部项目名称内部项目名称内部项目名称内部项目名称</span
                  >
                </el-tooltip></el-descriptions-item
              >
              <el-descriptions-item label="工单内容">
                <el-tooltip placement="top">
                  <div slot="content">
                    工单内容工单内容工单内容工单内容工单内容工单内容
                  </div>
                  <span class="flowClamp"
                    >工单内容工单内容工单内容工单内容工单内容工单内容</span
                  >
                </el-tooltip>
              </el-descriptions-item>
            </el-descriptions>
            <el-descriptions
              class="margin-top"
              :labelStyle="{ ...labelStyle, ...contentStyle }"
              :contentStyle="contentStyle"
              :column="2"
              direction="horizontal"
            >
              <el-descriptions-item label="责任人" :labelStyle="threeStyle">
                <el-tag class="borderRad5" size="small">杨先生</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="优先级" :labelStyle="threeStyle">
                <el-tag class="borderRad5" size="small">高</el-tag>
                <el-tag
                  class="borderRad5"
                  style="margin-left: 3px"
                  type="danger"
                  size="small"
                  >紧急</el-tag
                >
              </el-descriptions-item>
              <el-descriptions-item label="工单类型">
                <el-tag class="borderRad5" size="small">无类型</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="涉及金额">
                <el-tag class="borderRad5" size="small">123</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="提单日期">
                2020/2/2
              </el-descriptions-item>
              <el-descriptions-item label="截止时间">
                2020/2/2
              </el-descriptions-item>
              <!-- <el-descriptions-item label="状态">
                <el-tag class="borderRad5" size="small">高</el-tag>
              </el-descriptions-item> -->
            </el-descriptions>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "repairOrderBacklog",
  data() {
    return {
      list: [
        {
          title: "超期",
          data: [
            {
              content:
                "这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据",
              orderNumber: "1223456456",
              orderNumberNeibu: "231231sdas23123123",
            },
          ],
        },
        {
          title: "本周",
          data: [
            {
              content:
                "这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据",
              orderNumber: "1223456456",
              orderNumberNeibu: "231231sdas23123123",
            },
          ],
        },
        {
          title: "未来一周",
          data: [
            {
              content:
                "这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据",
              orderNumber: "1223456456",
              orderNumberNeibu: "231231sdas23123123",
            },
          ],
        },
        {
          title: "未来两周",
          data: [
            {
              content:
                "这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据",
              orderNumber: "1223456456",
              orderNumberNeibu: "231231sdas23123123",
            },
          ],
        },
      ],
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
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.go(-1);
      }
    },
    close() {
      this.$alert("确认关闭该工单吗?", "", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `关闭成功!`,
          });
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
    > div {
    }
    .quartering {
      .el-tag--medium {
        border-radius: 10px;
      }
      display: flex;
      .quarteringFlex {
        overflow-y: scroll;
        outline: none;
        height: calc(100vh - 152px);
        align-items: flex-start;
        margin-top: 30px;
        margin-right: 5px;
        padding: 0 7px 5px 3px;
        border-radius: 5px;
        border-top: 5px solid #eee;
        background-color: transparent;
        &:nth-last-of-type(1) {
          margin-right: 0;
        }
      }
      .quarteringBorder {
        position: relative;
        background-color: #fff;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
        padding: 10px 15px;
        margin: 0px 0px 12px 5px;
        border-radius: 5px;
        .close {
          position: absolute;
          right: 5px;
        }
      }
    }
  }

  .flowClamp {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 180px;
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
    z-index: 9999;
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
}
</style>
