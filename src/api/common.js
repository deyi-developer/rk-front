import request from "@/utils/request";

// 获取一级部门
export function getDeptList() {
  return request({
    url: "/reportdata/reportdata/query-one-dept",
    method: "get"
  });
}
