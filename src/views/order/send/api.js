import request from "@/utils/request";

// 工单详情
export const detail = (params) => {
  const { eventHeaderId } = params;
  return request({
    url: `/workOrder/header/info/${eventHeaderId}`,
    method: "get",
    params
  });
};

// 回复
export const reply = (data) => {
  return request({
    url: `/workOrder/line/add`,
    method: "post",
    data
  });
};

// 回复列表
export const replyList = (params) => {
  return request({
    url: `/workOrder/line/list`,
    method: "get",
    params
  });
};

// 修改
export const update = (data) => {
  return request({
    url: `/workOrder/line/edit`,
    method: "post",
    data
  });
};

// 风控永久关闭
export function toggle(data) {
  return request({
    url: "/reportdata/reportdata/toggle",
    method: "put",
    data
  });
}

// 新增提醒事项
export const workOrderDetail = (params) => {
  return request({
    url: `/workOrder/note/add`,
    method: "post",
    data: params
  });
};