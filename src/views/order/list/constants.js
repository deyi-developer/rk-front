// 过滤初始化参数
export const FILTER_PARAMS = () => {
  return {
    projectChargePeriod: null,
    projectChargePeriod: null,
    oneDeptId: null,
  };
};

// 项目数量和类型介绍
export const PROJECT_TYPEP = [
  {
    color: "#409eff",
    name: "总项目数",
    content: (risk) => risk.totalProjectNum || 0,
  },
  {
    color: "#67c23a",
    name: "无风险项目",
    content: (risk) =>
      `${risk.noRiskProjectNum || 0} (${risk.noRiskProjectRate || 0}%)`,
  },
  {
    color: "#e6a23c",
    name: "中风险项目",
    content: (risk) =>
      `${risk.mediumRiskProjectNum || 0} (${risk.mediumRiskProjectRate || 0}%)`,
  },
  {
    color: "#f56c6c",
    name: "高风险项目",
    content: (risk) =>
      `${risk.highRiskProjectNum || 0} (${risk.highRiskProjectRate || 0}%)`,
  },
  {
    color: "#909399",
    name: "法务接管项目：",
    content: (risk) =>
      `${risk.lawsuitRiskProjectNum || 0} (${
        risk.lawsuitRiskProjectRate || 0
      }%)`,
  },
];

// header自定义class
export const HEADER_CELL_CLASS_NAME = {
  totalShouldNotBillingMoney: "cell-block", // 超账期应开未开总额
  totalShouldNotReceiptsMoney: "cell-block", // 超账期应收未收总额
};

// context自定义class
export const CONTEXT_CELL_CLASS_NAME = (type, row) => {
  switch (type) {
    case "projectCode": // 项目编码
      // 获取全部状态，去最高级状态
      const status = [
        row["grossProfitRiskLevel"],
        row["invoicingRiskLevel"],
        row["receiveRiskLevel"],
        row["riskStatus"],
      ];

      if (status.includes("lawsuit")) return "cell-lawsuit";

      if (status.includes("Red")) return "cell-red";

      if (status.includes("Yellow")) return "cell-yellow";

      if (status.includes("Green")) return "cell-green";

    case "totalShouldNotBillingMoney": // 超账期应开未开总额
      return "cell-block";
    case "totalShouldNotReceiptsMoney": // 超账期应收未收总额
      return "cell-block";
    default:
      return "";
  }
};

// 根据状态动态获取标题
export const FILTER_TITLE = (filterType, dep) => {
  const label = filterType?.label
  if(label) {
    const oneDeptName = dep?.oneDeptName
    if(oneDeptName) {
      return `${oneDeptName}: ${label}项目`
    }else {
      return `${label}项目`
    }
  }else return "项目清单";
};
