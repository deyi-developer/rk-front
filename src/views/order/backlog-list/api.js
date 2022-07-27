import request from "@/utils/request";

// 查询参数列表
export function getNoteList() {
  return request({
    url: "/workOrder/note/list",
    method: "get",
  });
}
