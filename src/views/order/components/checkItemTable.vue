<template>
  <div>
    <slot name="tableBtn"></slot>
    <el-table
      :data="tableDataList"
      :border="column[0].border"
      style="width: 100%"
      v-loading="tableLoading || Loading"
    >
      <el-table-column
        v-for="(tableEl, index) in column[0].files"
        :key="tableEl.id || index"
        :align="tableEl.align"
        :type="tableEl.type"
        :label="tableEl.label"
        :prop="tableEl.prop"
      />
      <el-table-column align="center" label="是否已完成" v-if="!finishSlot">
        <template slot-scope="scope">
          <el-switch
            v-if="tableType !== 'string'"
            v-model="scope.row.finish"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchChange(scope.row)"
          >
          </el-switch>
          <div v-else>
            {{ scope.row.finish ? "已完成" : "未完成" }}
          </div>
        </template>
      </el-table-column>
      <slot name="finishSlot" v-else></slot>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        v-if="!operateSlot"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="Editor(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="Delete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <slot name="operateSlot" v-else></slot>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "CheckItemTable",
  data() {
    return {
      tableDataList: [],
      Loading: false,
    };
  },
  props: {
    tableData: {
      type: [Array],
      default: () => [],
    },
    tableType: {
      type: [String],
      default: "",
    },
    operateSlot: {
      type: [Boolean],
      default: false,
    },
    finishSlot: {
      type: [Boolean],
      default: false,
    },
    tableLoading: {
      type: [Boolean],
    },
    column: {
      type: [Array],
      default: () => [
        {
          border: true,
          files: [
            {
              label: "序号",
              type: "index",
            },
            {
              label: "Checkitem",
              prop: "checkItemName",
              align: "center",
            },
            {
              label: "描述",
              prop: "checkItemDescribe",
              align: "center",
            },
            {
              label: "完成截止时间",
              prop: "checkItemEndTime",
              align: "center",
            },
            {
              label: "Checkitem角色",
              prop: "checkItemRoleCodeName",
              align: "center",
            },
          ],
        },
      ],
    },
  },
  watch: {
    tableData: {
      handler: function (newValue) {
        // 外部不控制loading 就内部走
        if (!this.tableLoading) {
          this.Loading = true;
        }
        this.tableDataList = newValue;
        this.Loading = false;
      },
      deep: true, // 深度监听
      immediate: true, // 首次监听
    },
  },
  created() {},
  methods: {
    Delete(row) {
      this.$emit("tableDelete", row);
    },
    Editor(row) {
      this.$emit("tableEditor", row);
    },
    switchChange(row) {
      this.$emit("switchChange", row);
    },
  },
};
</script>
<style scoped lang="scss"></style>
