import request from "@/utils/request"

// 消息列表
export const list = (params) => {
  return request({
    url: "/message/list",
    method: "get",
    params,
  })
}
