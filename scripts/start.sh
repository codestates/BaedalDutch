#!/bin/bash
cd /home/ubuntu/BaedalDutch/server
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> ae87a77185de30e39e84b16891830bc55185970e

export DATABASE_USERNAME=$(aws ssm get-parameters --region us-east-1 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region us-east-1 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region us-east-1 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region us-east-1 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region us-east-1 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region us-east-1 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')

<<<<<<< HEAD
>>>>>>> 47b7b563e5c72c238c61a18b3b55218e99a13228
pm2 start index.js
=======
authbind --deep pm2 start index.js
>>>>>>> ae87a77185de30e39e84b16891830bc55185970e
