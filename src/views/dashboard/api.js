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
export function getReportReceive(params) {
  return request({
    url: "report/receive",
    method: "get",
    params
  });
}
// 查询现金分布
export function getReportCash(params) {
  return request({
    url: "report/cash",
    method: "get",
    params
  });
}

// 人天
export function getReportCost(params) {
  return request({
    url: "report/cost",
    method: "get",
    params
  });
}

// 开票收款收入
export function getReportAmount(params) {
  return request({
    url: "report/amount",
    method: "get",
    params
  });
}

// 查询现金占用
export function getReportCashOccupy(params) {
  return request({
    url: "report/cash/occupy",
    method: "get",
    params
  });
}

// 查询毛利
export function getReach({ type = 1, ...params }) {
  return request({
    url: `report/reach/${type}`,
    method: "get",
    params
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

// 查询毛利
export function getInvoiceReceivePercent(query) {
  return request({
    url: "/report/invoiceReceivePercent",
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
