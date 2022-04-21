import request from "@/utils/request";

// 获取月度计划列表
export const getCurrentMonthApi = (params) =>
  request({
    url: "/monthlyplan/monthlyplan/selectDeptPlanDetailList",
    method: "get",
    params,
  });

// 月度计划列表附件下载
export const exportDeptMonthlyPlanApi = "/monthlyplan/monthlyplan/exportDeptMonthlyPlan"
