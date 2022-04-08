import request from "@/utils/request";

// 获取月度计划列表
export const getCurrentMonth = (id, projectCode, projectName) => {
  return request({
    url: `/monthlyplan/monthlyplan/selectDeptPlanDetailList?oneDeptId=${id}&projectCode=${projectCode}&projectName=${projectName}`,
    method: "get",
  });
};
