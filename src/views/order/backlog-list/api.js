import request from "@/utils/request";

const parse = (json)=>{
  let str = "";
  let query = "";
  for(let j in json){//j是属性名
    if (json[j]) { 
      str+= j + "=" + json[j] + "&"//json[j]是属性值
    }
  }
  query=str.substring(0,str.length-1);
  return query;
}

// 查询参数列表
export function getNoteList(params) {
  return request({
    url: `/workOrder/note/list?${parse(params)}`,
    method: "get",
  });
}


// 修改状态为1
export function editNotes(params) {
  return request({
    url: `/workOrder/note/batchCloseNote/${params}`,
    method: 'post'
  })
}
