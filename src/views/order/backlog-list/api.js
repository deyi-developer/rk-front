import request from "@/utils/request";

// 查询参数列表
export function getNoteList(status) {
  return request({
    url: `/workOrder/note/list?noteStatus=${status}`,
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
