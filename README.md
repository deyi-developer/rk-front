## 开发

```bash

# 安装依赖 不要使用cnpm,淘宝镜像已经给你设置好了
npm install

# 启动服务  前端本地开发使用
npm run dev

 # 启动服务  给后端开发使用  会访问本地服务的接口方便他们快速调试
npm start

```

## 打包

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 部署

```bash


# 打测试包 并部署到46环境 测试环境
npm run scp46

# 打正式包 并部署到48环境  生产环境
npm run scp41


```

## 参考文档

直接在若依基础上开发的业务代码,基本我们会使用若依官方提供,[若依前端文档](http://doc.ruoyi.vip/ruoyi/document/qdsc.html#%E5%89%8D%E7%AB%AF%E7%BB%84%E4%BB%B6),这么一个小项目,若依提供的 api 已经完全满足需求,基本不需要引入其他依赖.

若依前端是基于[element-ui](https://element.eleme.io/#/),[vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/guide/)开发(若依在他基础加了些 角色管理,菜单管理等等模块).

因为都是利用业余时间在做这个项目,为了快速完成项目,除此外我们还引入了[iView](http://v4.iviewui.com/docs/introduce),[vxetable](https://vxetable.cn/#/table/start/install)(最初需求是要做可编辑表格所以引入这个)

需要注意的是,为了使开发变的简单,系统存在的角色管理等等页面,只有 admin 账号可以访问,包括权限的赋予都只有 admin 可以做.

## 代码目录说明

directive mixins filters 等等都是若依官方就有的,根据 api 文档去调用就好了

```

我们的业务代码主要集中在order目录,其他我没写出来的都是官方目录 提供角色管理 菜单管理等等组件,我们并没有做修改
rk-front
├─ .env.development // 开发环境变量
├─ .env.production // 正式环境变量
├─ .env.staging   // 测试环境变量
├─ scp2-41.js     // 正式环境部署脚本
├─ scp2-46.js     // 测试环境部署脚本
├─ src
│  ├─ App.vue
│  ├─ api
│  ├─ assets
│  ├─ components
│  ├─ directive
│  ├─ filters
│  ├─ layout
│  ├─ main.js
│  ├─ mixins
│  ├─ permission.js
│  ├─ plugins
│  ├─ router  // 路由
│  │  └─ index.js
│  ├─ settings.js
│  ├─ store
│  ├─ utils
│  └─ views
│     ├─ dashboard    // 图表 首页和项目详情都复用
│     │  ├─ AmountChart.vue
│     │  ├─ BarChart.vue
│     │  ├─ BarChart2.vue
│     │  ├─ CashOccupyChart.vue
│     │  ├─ ChartsGroup.vue // echarts图表
│     │  ├─ ColumnChart.vue
│     │  ├─ CostChart.vue
│     │  ├─ GrossProfitChart.vue
│     │  ├─ InvoiceReceivePercent.vue
│     │  ├─ PanelGroup.vue // 首页仪表盘
│     │  ├─ PieChart.vue
│     │  ├─ PieChart2.vue
│     │  ├─ ReachCharDetails.vue // 项目概览达成率详情
│     │  ├─ ReachChart.vue
│     │  ├─ TableDesc.vue  // 表格
│     │  ├─ api.js
│     ├─ index.vue  // 首页
│     ├─ login.vue
│     ├─ order
│     │  ├─ backlog-list  // 待办提醒列表
│     │  ├─ check-item    //  维护checkItem
│     │  ├─ checkItem-list //  checkItem项数据报表
│     │  ├─ list           // 项目清单
│     │  ├─ message-list   // 消息列表
│     │  ├─ monthly-dept   // 计划明细
│     │  ├─ monthly-plan   // 当月计划
│     │  ├─ monthly-project // 这个无视掉
│     │  ├─ my-checkitem   //  我的checkitem
│     │  ├─ order-list     //  工单列表
│     │  ├─ project        //  项目明细
│     │  ├─ project-item   //  PJTD含税总收入，总已开金额，总已收金额详情
│     │  └─ send           // 提醒待办弹窗
│     ├─ repair-order-backlog // 我的待办
├─ vue-cli-service
└─ vue.config.js

```

## 如何开始一个新页面

使用 admin 账号登录
![](./imgs/QQ20221121-111632%402x.png)
然后在菜单管理页面按照图片这样,添加一个路由,组件路径就是你的代码路径.直接去`src/views/`目录下写代码就可以了.
如果有什么疑问的话,可以去参考`src/views/system`,`src/views/tool`的代码,这个是项目自带的页面.

## 项目示例图

![](./imgs/QQ20221121-111219%402x.png)
