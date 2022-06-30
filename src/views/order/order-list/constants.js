/**
 * 表格项
 * @param {string} customFiltering: 自定义筛选组件
 * @param {string} FilterPlaceholder：输入筛选提示文字: FilterPlaceholder：输入筛选提示文字
 */
export const COLUMN_LIST = [
  {
    width: "60px",
    title: "序号",
    align: "center",
    fixed: "left",
    type: "seq",
    field: "serialNumber"
  },
  {
    field: "eventHeaderCode",
    title: "工单编号",
    headerAlign: "center",
    align: "center",
    width: "240px",
    fixed: "left",
    filters: [{ data: "" }],
    customFiltering: true,
    FilterPlaceholder: "请输入工单编号"
  },
  {
    align: "center",
    title: "项目编码",
    field: "projectCode",
    width: "180",
    filters: [{ data: "" }],
    customFiltering: true,
    FilterPlaceholder: "输入项目编码"
  },
  {
    align: "center",
    title: "项目名称",
    field: "projectName",
    width: "180",
    filters: [{ data: "" }],
    customFiltering: true,
    FilterPlaceholder: "输入项目名称"
  },
  {
    align: "center",
    title: "父项目名称",
    field: "parentProjectName",
    width: "180"
  },
  {
    align: "center",
    title: "父项目编码",
    field: "parentProjectCode",
    width: "180"
  },
  {
    align: "center",
    title: "状态",
    field: "eventStatus",
    width: "100",
    filterMultiple: false,
    filters: [
      { label: "处理中", value: 0 },
      { label: "已关闭", value: 1 }
    ]
  },
  {
    align: "center",
    title: "工单名",
    field: "eventTitle",
    width: "180",
    customFiltering: true,
    FilterPlaceholder: "输入工单名",
    filters: [{ data: "" }]
  },
  {
    align: "center",
    title: "工单类型",
    field: "eventType",
    width: "180",
    filterMultiple: false,
    filters: []
  },
  {
    align: "center",
    title: "金额",
    field: "eventAmount",
    width: "100"
  },
  {
    align: "center",
    title: "创建人",
    field: "createName",
    width: "120"
  },
  {
    align: "center",
    title: "创建时间",
    field: "createTime",
    width: "180"
  },
  {
    align: "center",
    title: "截止时间",
    field: "eventHandleDate",
    width: "180"
  },
  {
    align: "center",
    title: "是否超期",
    field: "overdueDayType",
    width: "100"
  },
  {
    align: "center",
    title: "超期天数",
    field: "overdueDay",
    width: "100"
  },
  {
    align: "center",
    title: "责任人",
    field: "handlerName",
    width: "120",
    filters: [{ data: "" }],
    FilterPlaceholder: "输入责任人",
    customFiltering: true
  },
  {
    align: "center",
    title: "责任人部门",
    field: "handlerDeptName",
    width: "180"
  },
  {
    align: "center",
    title: "最后更新时间",
    field: "lastUpdateDate",
    width: "180"
  },
  {
    align: "center",
    title: "待办人",
    field: "eventLineHandler",
    width: "120"
  }
];

// 分页初始化数据
export const RESET_PAGING = () => {
  return {
    pageNum: 1,
    pageSize: 10
  };
};

// 获取标签类型
export const TAG_LIST = (type) => {
  return (name) =>
    ({
      0: {
        type: "success",
        name: "处理中"
      },
      1: {
        type: "info",
        name: "已关闭"
      }
    }[type][name]);
};
