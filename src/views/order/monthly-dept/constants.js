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
    filters: [{ value: "projectCode", data: "" }],
    minWidth: "200",
    fixed: "left",
    align: "center",
  },
  {
    prop: "projectName",
    label: "得逸项目名称",
    filters: [{ value: "projectName", data: "" }],
    minWidth: "180",
    fixed: "left",
    align: "center",
  },
  {
    prop: "planBillingMoney",
    label: "本月计划开票金额",
    filters: [{ label: "隐藏无效数据", value: "planBillingMoney" }],
    minWidth: "160",
    align: "center",
  },
  {
    prop: "billingThisMonth",
    label: "本月实际开票金额",
    filters: [{ label: "隐藏无效数据", value: "billingThisMonth" }],
    minWidth: "160",
    align: "center",
  },
  {
    prop: "planReceiptsMoney",
    label: "本月计划收款金额",
    filters: [{ label: "隐藏无效数据", value: "planReceiptsMoney" }],
    minWidth: "160",
    align: "center",
  },
  {
    prop: "receiptsThisMonth",
    label: "本月实际收款金额",
    filters: [{ label: "隐藏无效数据", value: "receiptsThisMonth" }],
    minWidth: "160",
    align: "center",
  },
  {
    prop: "compleBillingThisMonth",
    label: "开票完成率",
    filters: [{ label: "隐藏无效数据", value: "compleBillingThisMonth" }],
    minWidth: "110",
    align: "center",
  },
  {
    prop: "compleReceiptsThisMonth",
    label: "收款完成率",
    filters: [{ label: "隐藏无效数据", value: "compleReceiptsThisMonth" }],
    minWidth: "110",
    align: "center",
  },
];

// 数据筛选
export const FILTER_HANDLER = (key) => {
  if (key !== "projectCode" && key !== "projectName") key = "defaultValue";
  return {
    projectCode: (validData, data, row) => {
      if (validData.includes(data)) return row;
    }, // 项目代码筛选
    projectName: (validData, data, row) => {
      if (validData.includes(data)) return row;
    }, // 项目名称筛选
    defaultValue: (validData, _, row) => {
      if (validData && validData != "0.00") return row;
    }, // 默认筛选
  }[key];
};

// 提示文案
export const INPUT_PLACEHOLDER = {
  projectCode: "输入项目编码",
  projectName: "请输入项目名称",
};
