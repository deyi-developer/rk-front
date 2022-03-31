import request from "@/utils/request";

// 查询
export function getSummary() {
  return request({
    url: "/reportdata/reportdata/summary",
    method: "get"
  });
}

// 查询参数列表
export function getRiskNum() {
  return request({
    url: "/reportdata/reportdata/risk-num",
    method: "get"
  });
}

/* 
图表接口
 */

// 查询现金分布
export function getReportCash() {
  return request({
    url: "report/cash",
    method: "get"
  });
}

// 人天
export function getReportCost() {
  return request({
    url: "report/cost",
    method: "get"
  });
}

// 开票收款收入
export function getReportAmount() {
  return request({
    url: "report/amount",
    method: "get"
  });
}

// 查询现金占用
export function getReportCashOccupy() {
  return request({
    url: "report/cash/occupy",
    method: "get"
  });
}

// 查询毛利
export function getReach(type = 1) {
  return request({
    url: `report/reach/${type}`,
    method: "get"
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
