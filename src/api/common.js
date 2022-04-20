import request from "@/utils/request";

// 获取一级部门
export function getDeptList() {
  return request({
    url: "/reportdata/reportdata/query-one-dept",
    method: "get"
  });
}

export function exportWorkOrder(data) {
  return request({
    url: "/workOrder/header/export",
    method: "post",
    responseType: 'blob',
    data
  });
}

export function exportMonthlyPlan(data) {
  return request({
    url: "/monthlyplan/monthlyplan/exportMonthlyPlan",
    method: "post",
    responseType: 'blob',
    data
  });
}

export function exportDeptPlan(data) {
  return request({
    url: "/monthlyplan/monthlyplan/exportDeptMonthlyPlan",
    method: "post",
    responseType: 'blob',
    data
  });
}

