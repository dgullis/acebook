#!/bin/bash

echo 'run application_start.sh: ' >> /home/ec2-user/acebook/api/deploy.log
# nodejs-app is the same name as stored in pm2 process
echo 'restarting the service - acebook-server' >> /home/ec2-user/acebook/api/deploy.log
systemctl restart acebook-server >> /home/ec2-user/acebook/api/deploy.log