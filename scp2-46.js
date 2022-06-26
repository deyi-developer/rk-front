const scp = require("scp2");
const ora = require("ora");
const chalk = require("chalk"); //设置命令颜色的
const spinner = ora(chalk.blue("正在部署到服务器...")); //显示加载

spinner.start();
scp.scp(
  "./dist/",
  {
    host: "172.22.5.46", // 服务器的地址
    port: 22, // 服务器端口， 一般为 22
    username: "harry", // 用户名
    password: "ekESN8WyyUtFD9BR",
    path: "/dev-data/deyi-rk-hr/data/rk-system/frontend/rk" //服务器存放文件路径
  },
  (err) => {
    if (!err) {
      console.log(chalk.green(`部署完成!`));
    } else {
      console.log(chalk.red(`部署失败!`));
    }
    spinner.stop();
  }
);
