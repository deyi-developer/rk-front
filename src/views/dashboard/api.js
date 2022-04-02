import request from "@/utils/request";

// 查询
export function getSummary(params) {
  return request({
    url: "/reportdata/reportdata/summary",
    method: "get",
    params
  });
}

// 查询参数列表
export function getRiskNum(params) {
  return request({
    url: "/reportdata/reportdata/risk-num",
    method: "get",
    params
  });
}

/* 
图表接口
 */

// 查询现金分布
export function getReportReceive(projectCode = "") {
  return request({
    url: "report/receive",
    method: "get",
    params: { projectCode }
  });
}
// 查询现金分布
export function getReportCash(projectCode = "") {
  return request({
    url: "report/cash",
    method: "get",
    params: { projectCode }
  });
}

// 人天
export function getReportCost(projectCode = "") {
  return request({
    url: "report/cost",
    method: "get",
    params: { projectCode }
  });
}

// 开票收款收入
export function getReportAmount(projectCode = "") {
  return request({
    url: "report/amount",
    method: "get",
    params: { projectCode }
  });
}

// 查询现金占用
export function getReportCashOccupy(projectCode = "") {
  return request({
    url: "report/cash/occupy",
    method: "get",
    params: { projectCode }
  });
}

// 查询毛利
export function getReach({ type = 1, projectCode = "" }) {
  return request({
    url: `report/reach/${type}`,
    method: "get",
    params: { projectCode }
  });
}

// 查询毛利
export function getMaori(query) {
  return request({
    url: "report/maori",
    method: "get",
    params: query
  });
}

// 项目明细
export const projectDetails = (projectCode) => {
  return request({
    url: `/projectDetail/findProjectDetail/${projectCode}`,
    method: "get"
  });
};
