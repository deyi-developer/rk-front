import request from "@/utils/request";

//   我的Checkitem是否完成
  export const UserCheckitemlistEdit = (data) =>
  request({
    url: "/checkitem/item-user/edit",
    method: "put",
    data
  });