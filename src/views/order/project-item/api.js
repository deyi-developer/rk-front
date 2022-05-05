import request from "@/utils/request"

export const fetchPjtdListApi = (params) => {
  return request({
    url: "/reportdata/reportdata/pjtd-list",
    method: "get",
    params,
  })
}

export const fetchAlreadyBillingListApi = (params) => {
  return request({
    url: "/reportdata/reportdata/already-billing-list",
    method: "get",
    params,
  })
}

export const fetchReceiptsMoneyListApi = (params) => {
  return request({
    url: "/reportdata/reportdata/receipts-money-list",
    method: "get",
    params,
  })
}