import request from "@/utils/request";

// 获取月度计划列表
export const getCurrentMonth = (params) =>
  request({
    url: "/monthlyplan/monthlyplan/selectDeptPlanDetailList",
    method: "get",
    params,
  });
