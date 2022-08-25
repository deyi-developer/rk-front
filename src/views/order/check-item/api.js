import request from "@/utils/request";

// 获取Checkitem列表
export const getCheckitemlist = () =>
  request({
    url: "/checkitem/item-info/list",
    method: "get",
  });

// 新增Checkitem
export const addCheckitem = (data) =>
  request({
    url: "/checkitem/item-info",
    method: "post",
    data,
  });

// 编辑Checkitem
export const editorCheckitem = (data) =>
  request({
    url: "/checkitem/item-info",
    method: "put",
    data,
  });

  
// 编辑Checkitem
export const deleteCheckitem = (id) =>
request({
  url: `/checkitem/item-info/${id}`,
  method: "delete",
});