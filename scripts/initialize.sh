#!/bin/bash
cd /home/ubuntu/BaedalDutch/server
npm install
npm install pm2@latest -g
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
sudo apt-get update