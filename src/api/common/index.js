import request from "@/utils/request";

// 查询项目列表
export function getDept(query) {
  return request({
    url: "/project/project/list",
    method: "get",
    params: query,
  });
}
