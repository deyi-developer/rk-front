import { itemUseList, getCheckitemlist } from "../check-item/api";

// 请求额外参数
export const configData = {
  paging: {
    page: 1,
    size: 10,
  },
};

// 弹窗配置
export const dialogType = (data) => {
  if (Object.keys(data).length) {
    return {
      type: "edit",
      name: "编辑",
      requestConfig: {
        url: "/checkitem/item-info",
        method: "put",
      },
      apiMessage: { success: "编辑成功", error: "编辑失败" },
    };
  }
  return {
    type: "add",
    name: "新建",
    requestConfig: {
      url: "/checkitem/item-info",
      method: "post",
    },
    apiMessage: { success: "新增成功", error: "新增失败" },
  };
};

export const column = [
  {
    label: "序号",
    type: "index",
  },
  {
    label: "Checkitem",
    prop: "checkItemName",
    align: "center",
  },
  {
    label: "描述",
    prop: "checkItemDescribe",
    align: "center",
  },
  {
    label: "完成截止时间",
    prop: "checkItemEndTime",
    align: "center",
  },
  {
    label: "Checkitem角色",
    prop: "checkItemRoleCodeName",
    align: "center",
  },
];

export const columnFilter = (tableType) => {
  let Newcolumn = column;
  switch (tableType) {
    case "finish":
      Newcolumn.pop();
      break;

    default:
      break;
  }
  return Newcolumn;
};

export const queryHandle = {
  finish: async (data) => {
    const res = await itemUseList(data);
    return res.rows;
  },
  operate: async (data) => {
    const res = await getCheckitemlist(data);
    return res.rows;
  },
};
