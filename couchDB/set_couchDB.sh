#!/bin/bash
git clone https://HaoyangCui0830:123456github@github.com/HaoyangCui0830/CCCProject2.git
cd CCCProject2
cd couchDB
curl -XPUT "http://admin:123456@172.26.132.72:5984/twitter"
sudo apt install -y npm
npm install
sudo apt install -y node-grunt-cli
export dbname='twitter'
grunt couch-compile
grunt couch-push

pip install tweepy
pip install pycouchdb
pip install textblob
pip install shapely

python3 streamtweet.py