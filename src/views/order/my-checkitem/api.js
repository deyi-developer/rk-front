import request from "@/utils/request";

// 获取我的Checkitem列表
export const getUserCheckitemlist = () =>
  request({
    url: "/checkitem/item-user/list",
    method: "get",
  });

//   我的Checkitem是否完成
  export const UserCheckitemlistEdit = (data) =>
  request({
    url: "/checkitem/item-user/edit",
    method: "put",
    data
  });