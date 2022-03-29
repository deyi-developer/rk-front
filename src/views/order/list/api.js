import request from "@/utils/request";

// 查询参数列表
export function getList(query) {
  return request({
    url: "/reportdata/reportdata/list",
    method: "get",
    params: query
  });
}
