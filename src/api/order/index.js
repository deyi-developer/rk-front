import request from "@/utils/request"

// 获取路由
export const send = (data) => {
  return request({
    url: "/workOrder/header",
    method: "post",
    data,
  })
}
