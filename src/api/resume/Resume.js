import request from "@/utils/request";

// 查询简历列表
export function listResume(query) {
  return request({
    url: "/resume/Resume/list",
    method: "get",
    params: query,
  });
}

// 查询简历详细
export function getResume(resumeId) {
  return request({
    url: "/resume/Resume/" + resumeId,
    method: "get",
  });
}

// 新增简历
export function addResume(data) {
  return request({
    url: "/resume/Resume",
    method: "post",
    data: data,
  });
}

// 修改简历
export function updateResume(data) {
  return request({
    url: "/resume/Resume",
    method: "put",
    data: data,
  });
}

// 删除简历
export function delResume(resumeId) {
  return request({
    url: "/resume/Resume/" + resumeId,
    method: "delete",
  });
}

// 简历详情提交
export function postResume(data) {
  return request({
    url: `/resume/Resume/commit`,
    method: "post",
    data,
  });
}

// 简历筛选
export function screen(data) {
  return request({
    url: `/manager/manager/screen`,
    method: "post",
    data,
  });
}

// 简历查重
export function repeat(data) {
  return request({
    url: `/resume/Resume/duplicateCheck`,
    method: "post",
    data,
  });
}

// 面试跟进
export function resumeRecord(data) {
  return request({
    url: `/resume/Resume/resumeRecord`,
    method: "put",
    data,
  });
}
