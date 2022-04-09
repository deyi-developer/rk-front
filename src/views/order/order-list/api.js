import request from "@/utils/request"

// 发送工单
export const list = (params) => {
  return request({
    url: "/workOrder/header/list",
    method: "get",
    params,
  })
}

// 关闭
export const edit = (data) => {
  return request({
    url: "/workOrder/header/edit",
    method: "post",
    data,
  })
}
