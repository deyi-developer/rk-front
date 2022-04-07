import request from "@/utils/request"

// 获取月度计划列表
export const getCurrentMonth = (id) => {
  return request({
    url: `/monthlyplan/monthlyplan/selectDeptPlanDetailList?oneDeptId=${id}`,
    method: "get",
  })
}
