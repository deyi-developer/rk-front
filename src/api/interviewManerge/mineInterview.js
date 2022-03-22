import request from "@/utils/request";

// 我的面试清单
export function listInterviewer(query) {
  return request({
    url: "/interviewer/interviewer/interview-list",
    method: "get",
    params: query,
  });
}
