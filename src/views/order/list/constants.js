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
    name: "总项目数：",
    content: (risk) => risk.totalProjectNum || 0,
  },
  {
    color: "#67c23a",
    name: "无风险项目：",
    content: (risk) => `${risk.noRiskProjectNum || 0} (${risk.noRiskProjectRate || 0}%)`,
  },
  {
    color: "#e6a23c",
    name: "中风险项目：",
    content: (risk) =>
      `${risk.mediumRiskProjectNum || 0} (${risk.mediumRiskProjectRate || 0}%)`,
  },
  {
    color: "#f56c6c",
    name: "高风险项目：",
    content: (risk) =>
      `${risk.highRiskProjectNum || 0} (${risk.highRiskProjectRate || 0}%)`,
  },
  {
    color: "#909399",
    name: "法务接管项目：",
    content: (risk) =>
      `${risk.lawsuitRiskProjectNum || 0} (${risk.lawsuitRiskProjectRate || 0}%)`,
  },
];
