#!/bin/bash

echo "== Set variables =="
export node=172.26.133.57

echo "== Start the containers =="
sudo docker run --name couchdb -v /var/lib/docker/data:/opt/couchdb/data -e ERL_FLAGS='-setcookie "brumbrum"' -e NODENAME=${node} -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=123456 -p 5984:5984 -p 5986:5986 -p 4369:4369 -p 9100-9200:9100-9200 -d couchdb:2.3

sleep 6

curl -X PUT http://admin:123456@${node}:5984/_node/_local/_config/admins/admin -d '"123456"'
curl -X PUT http://admin:123456@${node}:5984/_node/_local/_config/chttpd/bind_address -d '"0.0.0.0"'
curl -X PUT http://admin:123456@${node}:5984/_node/_local/_config/couchdb/uuid -d '"6ff4215f82f2ba487fcf37c0aa00002b"'
curl -X PUT http://admin:123456@${node}:5984/_node/_local/_config/couch_httpd_auth/secret -d '"6ff4215f82f2ba487fcf37c0aa000f33"'
sleep 3
