// 表格项
export const COLUMN_LIST = [
  {
    prop: "serialNumber",
    label: "序号",
    minWidth: 50,
    fixed: "left",
    align: "center",
  },
  {
    prop: "projectCode",
    label: "得逸项目编码",
    filters: [{ value: "" }],
    minWidth: "200",
    fixed: "left",
    align: "center",
  },
  {
    prop: "projectName",
    label: "得逸项目名称",
    filters: [{ value: "" }],
    minWidth: "180",
    fixed: "left",
    align: "center",
  },
  {
    prop: "planBillingMoney",
    label: "本月计划开票金额",
    filters: [
      { label: "数据非空", value: 2 },
      { label: "数据为空", value: 1 },
    ],
    minWidth: "160",
    align: "center",
  },
  {
    prop: "billingThisMonth",
    label: "本月实际开票金额",
    filters: [
      { label: "数据非空", value: 2 },
      { label: "数据为空", value: 1 },
    ],
    minWidth: "160",
    align: "center",
  },
  {
    prop: "planReceiptsMoney",
    label: "本月计划收款金额",
    filters: [
      { label: "数据非空", value: 2 },
      { label: "数据为空", value: 1 },
    ],
    minWidth: "160",
    align: "center",
  },
  {
    prop: "receiptsThisMonth",
    label: "本月实际收款金额",
    filters: [
      { label: "数据非空", value: 2 },
      { label: "数据为空", value: 1 },
    ],
    minWidth: "160",
    align: "center",
  },
  {
    prop: "compleBillingThisMonth",
    label: "开票完成率",
    filters: [
      { label: "数据非空", value: 2 },
      { label: "数据为空", value: 1 },
    ],
    minWidth: "110",
    align: "center",
  },
  {
    prop: "compleReceiptsThisMonth",
    label: "收款完成率",
    filters: [
      { label: "数据非空", value: 2 },
      { label: "数据为空", value: 1 },
    ],
    minWidth: "110",
    align: "center",
  },
];

// 提示文案
export const INPUT_PLACEHOLDER = {
  projectCode: "输入项目编码",
  projectName: "请输入项目名称",
};

// 初始化筛选条件
export const FILTER_CONDITIONS = () => {
  return {
    projectCode: "", // 项目编码
    projectName: "", // 项目名称
    planBillingMoney: undefined, // 本月计划开票金额
    billingThisMonth: undefined, // 本月实际开票金额
    planReceiptsMoney: undefined, // 本月计划收款金额
    receiptsThisMonth: undefined, // 本月实际收款金额
    compleBillingThisMonth: undefined, // 开票完成率
    compleReceiptsThisMonth: undefined, // 收款完成率
  };
};
