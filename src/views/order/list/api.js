import request from "@/utils/request";

// 查询参数列表
export function getList(query) {
  return request({
    url: "/reportdata/reportdata/list",
    method: "get",
    params: query
  });
}

// 查询参数列表
export function getRiskNum() {
  return request({
    url: "/reportdata/reportdata/risk-num",
    method: "get"
  });
}

export function saveData(data) {
  return request({
    url: "/projectDetail/saveProjectDetail",
    method: "put",
    data
  });
}
