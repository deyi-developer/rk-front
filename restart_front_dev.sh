cd /usr/project/rk-front
git pull
npm install --registry=https://registry.npm.taobao.org
npm run build:stage
rm -rf /dev-data/deyi-rk-hr/data/rk-system/frontend/rk
cp -r -f /usr/project/rk-front/dist/ /dev-data/deyi-rk-hr/data/rk-system/frontend/rk
