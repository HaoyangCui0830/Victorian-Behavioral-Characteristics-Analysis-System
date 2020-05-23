#!/bin/bash

sudo docker run -d -p 6379:6379 -p 16379:16379 -v /home/ubuntu/redis.conf:/usr/local/etc/redis/redis.conf --name redis redis redis-server /usr/local/etc/redis/redis.conf
