import request from "@/utils/request";

// 获取月度计划列表
export const getCurrentMonthApi = (params) =>
  request({
    url: "/monthlyplan/monthlyplan/list",
    method: "get",
    params
  });

// 月度计划列表附件下载
export const exportMonthlyPlanApi =
  "/monthlyplan/monthlyplan/exportMonthlyPlan";
