import request from "@/utils/request"

// 消息列表
export const list = () => {
  return request({
    url: "/message/list",
    method: "get",
  })
}
