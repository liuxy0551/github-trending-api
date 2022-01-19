# git clone https://github.com/liuxy0551/github-trending-api
git checkout .
git pull origin master
yarn
pm2 restart ./pm2/config.json --env production
pm2 monit
