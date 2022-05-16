#!/bin/bash
cd /home/ubuntu/BaedalDutch/server
npm install
npm install pm2@latest -g
<<<<<<< HEAD
sudo apt-get update
=======
sudo apt-get update
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo chown ubuntu /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80
>>>>>>> ae87a77185de30e39e84b16891830bc55185970e
