import request from "@/utils/request";

// 获取月度计划列表
export const getCurrentMonthApi = (params) =>
  request({
    url: "/workOrder/header/agencyList",
    method: "get",
    params
  });
