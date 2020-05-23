#!/bin/bash
git clone https://HaoyangCui0830:123456github@github.com/HaoyangCui0830/CCCProject2.git
cd CCCProject2
cd frontend
unzip build.zip
sudo docker run --name nginx -v /home/ubuntu/CCCProject2/frontend/build:/usr/share/nginx/html:ro -v /home/ubuntu/nginx.conf:/etc/nginx/nginx.conf -d -p 80:80 -p 8080:8080 nginx