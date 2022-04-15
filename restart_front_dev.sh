cd /usr/project/rk-front
git pull
npm install --registry=https://registry.npm.taobao.org
npm run build:stage
rm -rf /usr/project/www/rk/
cp -r -f /usr/project/rk-front/dist/ /usr/project/www/rk/
