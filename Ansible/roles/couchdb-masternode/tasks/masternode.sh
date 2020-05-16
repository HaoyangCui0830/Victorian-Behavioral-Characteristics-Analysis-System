#!/bin/bash

echo "== Set variables =="
declare -a slave_nodes=(172.26.131.27 172.26.131.98)
export master_node=172.26.133.110
export size=${#slave_nodes[@]}

echo "== Start the container =="
sudo docker run --name couchdb -v /var/lib/docker/data:/opt/couchdb/data -e ERL_FLAGS='-setcookie "brumbrum"' -e NODENAME=${master_node} -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=123456 -p 5984:5984 -p 5986:5986 -p 4369:4369 -p 9100-9200:9100-9200 -d couchdb:2.3

sleep 6

curl -X PUT http://admin:123456@${master_node}:5984/_node/_local/_config/admins/admin -d '"123456"'
curl -X PUT http://admin:123456@${master_node}:5984/_node/_local/_config/chttpd/bind_address -d '"0.0.0.0"'
curl -X PUT http://admin:123456@${master_node}:5984/_node/_local/_config/couchdb/uuid -d '"6ff4215f82f2ba487fcf37c0aa00002b"'
curl -X PUT http://admin:123456@${master_node}:5984/_node/_local/_config/couch_httpd_auth/secret -d '"6ff4215f82f2ba487fcf37c0aa000f33"'
sleep 3

for (( i=0; i<${size}; i++ )); do
    curl -X POST -H "Content-Type: application/json" http://admin:123456@${slave_nodes[${i}]}:5984/_cluster_setup -d "{\"action\": \"enable_cluster\", \"bind_address\":\"0.0.0.0\", \"username\": \"admin\", \"password\":\"123456\", \"port\": 5984, \"node_count\": \"3\", \"remote_node\": \"${master_node}\", \"remote_current_user\": \"admin\", \"remote_current_password\": \"123456\" }"
    sleep 3
done

for (( i=0; i<${size}; i++ )); do
    curl -X POST -H "Content-Type: application/json" http://admin:123456@${slave_nodes[${i}]}:5984/_cluster_setup -d "{\"action\": \"add_node\", \"host\":\"${master_node}\", \"port\": 5984, \"username\": \"admin\", \"password\":\"123456\"}"
    sleep 3
done

for (( i=0; i<${size}; i++ )); do
    curl http://admin:123456@${slave_nodes[${i}]}:5984/_cluster_setup
    sleep 3
done

curl -u admin:123456 -X GET ${master_node}:5984/_membership
sleep 3
curl -X POST -H "Content-Type: application/json" http://admin:123456@${master_node}:5984/_cluster_setup -d '{"action": "finish_cluster"}'
sleep 3
