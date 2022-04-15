cd /usr/project/rk-front
git pull
npm install --registry=https://registry.npm.taobao.org
npm run build:prod
sudo rm -rf /root/guns-vip-admin/data/rk-system/rk/
sudo cp -r -f /usr/project/rk-front/dist/ /root/guns-vip-admin/data/rk-system/rk/
