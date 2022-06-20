<!--  -->
<template>
  <div class="quarteringPadd">
    <a class="close" @click="$emit('close', { itemElement })">关闭</a>
    <div>
      <span>工单编号: </span>
      <span style="font-size: 14px">{{ itemElement.eventHeaderCode }}</span>
    </div>
    <div>
      <span>工单名称: </span>
      <span style="font-size: 14px">{{ itemElement.eventTitle }}</span>
    </div>
    <div>
      <span>项目编码: </span>
      <span style="font-size: 14px">{{ itemElement.projectCode }}</span>
    </div>
    <div>
      <span>项目名称: </span>
      <span style="font-size: 14px">{{ itemElement.projectName }}</span>
    </div>
    <div>
      <span>工单内容: </span>
      <span style="font-size: 14px">{{ itemElement.eventContext }}</span>
    </div>
    <div>
      <span>责任人: </span>
      <span style="font-size: 14px"
        ><el-tag class="borderRad5" style="margin-left: 3px" size="small">{{
          itemElement.handlerName || "无"
        }}</el-tag></span
      >
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
        ></span
      >
    </div>
    <div>
      <span>工单类型: </span>
      <span style="font-size: 14px">
        <el-tag class="borderRad5" style="margin-left: 3px" size="small">{{
          itemElement.eventTypeName || "无"
        }}</el-tag></span
      >
    </div>
    <div>
      <span>涉及金额: </span>
      <span style="font-size: 14px">{{ itemElement.eventAmount }}</span>
    </div>
    <div>
      <span>提单日期: </span>
      <span style="font-size: 14px">{{ itemElement.createTime }}</span>
    </div>
    <div>
      <span>截止时间: </span>
      <span style="font-size: 14px">{{ itemElement.headerEndDate }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    itemElement: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  computed: {},
  methods: {},
  mounted() {},
  created() {}
};
</script>
<style lang="scss"></style>
