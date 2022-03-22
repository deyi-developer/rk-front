import request from "@/utils/request";

// 查询列表
export function listInterviewer(query) {
  return request({
    url: "/interviewer/interviewer/list",
    method: "get",
    params: query,
  });
}

// 修改风控需求
export function updateInterviewer(data) {
  return request({
    url: "/interviewer/interviewer/operation-interviewer",
    method: "put",
    data: data,
  });
}
