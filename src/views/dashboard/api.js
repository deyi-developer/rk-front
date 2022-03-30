import request from "@/utils/request";

// 查询参数列表
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
