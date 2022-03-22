import request from '@/utils/request'

// 查询风控需求列表
export function listDemand(query) {
  return request({
    url: '/project/demand/list',
    method: 'get',
    params: query
  })
}

// 查询风控需求详细
export function getDemand(demandId) {
  return request({
    url: '/project/demand/' + demandId,
    method: 'get'
  })
}

// 新增风控需求
export function addDemand(data) {
  return request({
    url: '/project/demand',
    method: 'post',
    data: data
  })
}

// 修改风控需求
export function updateDemand(data) {
  return request({
    url: '/project/demand',
    method: 'put',
    data: data
  })
}

// 删除风控需求
export function delDemand(demandId) {
  return request({
    url: '/project/demand/' + demandId,
    method: 'delete'
  })
}
