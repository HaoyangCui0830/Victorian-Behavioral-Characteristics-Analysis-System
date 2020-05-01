#!/bin/bash

echo "== Set variables =="
export node=172.26.131.248
export user=admin
export password=123456

echo "== Start the containers =="
sudo docker run -d -p 5984:5984 -p 5986:5986 -p 4369:4369 -p 9100:9100 --name=subcouchdb2 couchdb:2.3.0
sleep 3

sudo docker exec subcouchdb2 bash -c "echo \"-setcookie couchdb_cluster\" >> /opt/couchdb/etc/vm.args"
sudo docker exec subcouchdb2 bash -c "echo \"-name couchdb@${node}\" >> /opt/couchdb/etc/vm.args"

sudo docker restart subcouchdb2
sleep 3
