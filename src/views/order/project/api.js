import request from "@/utils/request"

// 发送工单
export const send = (data) => {
  return request({
    url: "/workOrder/header/add",
    method: "post",
    data,
  })
}

// 编辑工单
export const update = (data) => {
  return request({
    url: "/workOrder/header/edit",
    method: "post",
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

// 项目明细
export const projectDetails = (projectCode) => {
  return request({
    url: `/projectDetail/findProjectDetail/${projectCode}`,
    method: "get",
  })
}

// 项目保存
export const projectUpdate = (data) => {
  return request({
    url: `/projectDetail/saveProjectDetail`,
    method: "put",
    data,
  })
}

// 风控永久关闭
export function toggle(data) {
  return request({
    url: "/reportdata/reportdata/toggle",
    method: "put",
    data,
  });
}
