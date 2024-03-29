import request from "@/utils/request";

// 查询参数列表
export function getList(query) {
  return request({
    url: "/reportdata/reportdata/list",
    method: "get",
    params: query,
  });
}

// 查询参数列表
export function getRiskNum(params) {
  return request({
    url: "/reportdata/reportdata/risk-num",
    method: "get",
    params,
  });
}

export function saveData(data) {
  return request({
    url: "/projectDetail/saveProjectDetail",
    method: "put",
    data,
  });
}

export function initDataApi(data) {
  return request({
    url: "/reportdata/reportdata/init-data",
    method: "post",
    data,
  });
}

export function toggle(data) {
  return request({
    url: "/reportdata/reportdata/toggle",
    method: "put",
    data,
  });
}

export function deleteCurrentMonth(data) {
  return request({
    url: `/report/deleteCurrentMonth`,
    method: "post",
    data,
  });
}

export function rkPlanEdit(enableFlag) {
  return request({
    url: `/report/rkPlanEdit/${enableFlag}`,
    method: "POST",
  });
}

// 导出项目清单
export const reportdataExort = `/reportdata/reportdata/export`;
