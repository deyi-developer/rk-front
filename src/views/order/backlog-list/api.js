import request from "@/utils/request";

// 查询参数列表
export function getNoteList() {
  return request({
    url: "/workOrder/note/list?noteStatus=0",
    method: "get",
  });
}


// 修改状态为1
export function editNotes(params) {
  return request({
    url: `/workOrder/note/batchCloseNote/${params}`,
    method: 'post'
  })
}
