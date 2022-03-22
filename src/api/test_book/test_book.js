import request from '@/utils/request'

// 查询书籍管理列表
export function listTest_book(query) {
  return request({
    url: '/test_book/test_book/list',
    method: 'get',
    params: query
  })
}

// 查询书籍管理详细
export function getTest_book(bookId) {
  return request({
    url: '/test_book/test_book/' + bookId,
    method: 'get'
  })
}

// 新增书籍管理
export function addTest_book(data) {
  return request({
    url: '/test_book/test_book',
    method: 'post',
    data: data
  })
}

// 修改书籍管理
export function updateTest_book(data) {
  return request({
    url: '/test_book/test_book',
    method: 'put',
    data: data
  })
}

// 删除书籍管理
export function delTest_book(bookId) {
  return request({
    url: '/test_book/test_book/' + bookId,
    method: 'delete'
  })
}
