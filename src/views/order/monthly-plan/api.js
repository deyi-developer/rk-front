import request from "@/utils/request"

// 获取月度计划列表
export const getCurrentMonth = () => {
  return request({
    url: "/monthlyplan/monthlyplan/list",
    method: "get",
  })
}
