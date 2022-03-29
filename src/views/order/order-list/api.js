import request from "@/utils/request"

// 发送工单
export const list = () => {
  return request({
    url: "/workOrder/header/list",
    method: "get",
  })
}
