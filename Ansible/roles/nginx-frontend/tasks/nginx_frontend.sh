#!/bin/bash
git clone https://HaoyangCui0830:123456github@github.com/HaoyangCui0830/CCCProject2.git
cd CCCProject2
cd backend
sudo docker build -t myspringboot:latest .
sudo docker run -p 8080:8080 -d myspringboot:latest