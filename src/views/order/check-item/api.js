import request from "@/utils/request";

// 获取Checkitem列表
export const CustomRequest = (requestData) => request(requestData);

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

// 删除Checkitem
export const deleteCheckitem = (id) =>
  request({
    url: `/checkitem/item-info/${id}`,
    method: "delete",
  });

export const itemUseList = (id) =>
  request({
    url: `/checkitem/item-user/list`,
    method: "get",
  });
