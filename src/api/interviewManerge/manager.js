import request from "@/utils/request";

// 查询风控需求列表
export function getList(query) {
  return request({
    url: "/manager/manager/list",
    method: "get",
    params: query,
  });
}

// 批量分配
export function allocate(data) {
  return request({
    url: "/manager/manager/allocate",
    method: "post",
    data,
  });
}

// 批量筛选
export function allScreen(data) {
  return request({
    url: "/manager/manager/screen",
    method: "post",
    data,
  });
}

// 批量通过
export function allDecide(data) {
  return request({
    url: "/manager/manager/decide",
    method: "post",
    data,
  });
}
