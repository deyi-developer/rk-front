import request from "@/utils/request";

// 获取月度计划列表
export const getCurrentMonthApi = (params) =>
  request({
    url: "/monthlyplan/monthlyplan/selectDeptPlanDetailList",
    method: "get",
    params,
  });

// 月度计划列表导出
export const exportDeptMonthlyPlanApi = "/monthlyplan/monthlyplan/exportDeptMonthlyPlan"
