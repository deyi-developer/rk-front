import request from '@/utils/request'

// 查询项目部门关系列表
export function listProjectDept(query) {
  return request({
    url: '/project/projectDept/list',
    method: 'get',
    params: query
  })
}

// 查询项目部门关系详细
export function getProjectDept(projectDeptId) {
  return request({
    url: '/project/projectDept/' + projectDeptId,
    method: 'get'
  })
}

// 新增项目部门关系
export function addProjectDept(data) {
  return request({
    url: '/project/projectDept',
    method: 'post',
    data: data
  })
}

// 修改项目部门关系
export function updateProjectDept(data) {
  return request({
    url: '/project/projectDept',
    method: 'put',
    data: data
  })
}

// 删除项目部门关系
export function delProjectDept(projectDeptId) {
  return request({
    url: '/project/projectDept/' + projectDeptId,
    method: 'delete'
  })
}
