import currency from "currency.js";
const install = function (Vue) {
  // 性别
  Vue.filter("sex", (value) => {
    if (
      value === "" ||
      value === undefined ||
      value === null ||
      value === NaN
    ) {
      return " ";
    }
    const typeMap = {
      0: "男",
      1: "女"
    };
    return typeMap[value];
  });

  // 学历
  Vue.filter("qualifications", (value) => {
    if (
      value === "" ||
      value === undefined ||
      value === null ||
      value === NaN
    ) {
      return " ";
    }

    const typeMap = {
      boshi: "博士及以上",
      shuoshi: "硕士",
      benke: "本科",
      dazhuan: "大专",
      gaozhong: "高中"
    };

    return typeMap[value];
  });

  // 简历来源
  Vue.filter("source", (value, types = []) => {
    if (
      value === "" ||
      value === undefined ||
      value === null ||
      value === NaN
    ) {
      return " ";
    }
    const target = types.data.find((item) => item.dictValue === value);

    return target && target.dictLabel;
  });

  // 沟通方式
  Vue.filter("contact", (value) => {
    if (
      value === "" ||
      value === undefined ||
      value === null ||
      value === NaN
    ) {
      return " ";
    }

    const typeMap = {
      phone: "电话",
      wechat: "微信",
      qq: "QQ"
    };

    return typeMap[value];
  });

  // 面试结果
  Vue.filter("result", (value) => {
    if (
      value === "" ||
      value === undefined ||
      value === null ||
      value === NaN
    ) {
      return " ";
    }

    const typeMap = {
      PASS: "通过",
      FAILED: "不通过",
      INTERVIEWING: "面试中"
    };

    return typeMap[value];
  });

  // 金额
  Vue.filter("currency", (value) => {
    return currency(value, { symbol: "", separator: "," }).format();
  });

  // 浮点数转百分号
  Vue.filter("percent", (value) => {
    if (value) {
      return (value * 100).toFixed(0) + "%";
    } else if (value === 0) {
      return "0%";
    } else {
      return "";
    }
  });

  // 关联需求
  // Vue.filter("needs", (value, types) => {
  //   if (
  //     value === "" ||
  //     value === undefined ||
  //     value === null ||
  //     value === NaN
  //   ) {
  //     return " ";
  //   }

  //   const { rows } = types;
  //   const { target } = rows.find((item) => item.demandId == value);
  //   return target;
  // });
};

export default install;
