#!/bin/bash
echo 'run after_install.sh:' >> /home/ec2-user/acebook/api/deploy.log

echo 'cd /home/ec2-user/acebook/api' >> /home/ec2-user/acebook/api/deploy.log
cd '/home/ec2-user/acebook/api' >> /home/ec2-user/acebook/api/deploy.log

echo 'npm install' >> /home/ec2-user/acebook/api/deploy.log 
npm install >> /home/ec2-user/acebook/api/deploy.log