import request from "@/utils/request"

// 发送工单
export const send = (data) => {
  return request({
    url: "/workOrder/header",
    method: "post",
    data,
  })
}

// 编辑工单
export const update = (data) => {
  return request({
    url: "/workOrder/header",
    method: "put",
    data,
  })
}

// 工单处理人
export const handlerList = (params) => {
  return request({
    url: "/system/user/list",
    method: "get",
    params,
  })
}
