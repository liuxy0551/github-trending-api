# git clone https://github.com/liuxy0551/github-trending-api
git add pm2 src/config/app.config.js
git pull origin master
yarn
pm2 restart ./pm2/config.json --env production
