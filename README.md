## 开发

```bash

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务  前端开发使用
npm run dev

 # 启动服务  后端开发使用  会访问本地服务的借口
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
# 打测试包 并部署到47环境
##npm run scp


# 打正式包 并 部署到48环境  生产环境
##npm run scp2

# 打测试包 并部署到46环境
npm run scp46



```
