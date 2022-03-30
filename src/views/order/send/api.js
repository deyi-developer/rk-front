import request from "@/utils/request"

// 工单详情
export const detail = (eventHeaderId) => {
  return request({
    url: `/workOrder/header/info/${eventHeaderId}`,
    method: "get",
  })
}

// 回复
export const reply = (data) => {
  return request({
    url: `/workOrder/line/add`,
    method: "post",
    data,
  })
}

// 回复列表
export const replyList = (params) => {
  return request({
    url: `/workOrder/line/list`,
    method: "get",
    params,
  })
}
