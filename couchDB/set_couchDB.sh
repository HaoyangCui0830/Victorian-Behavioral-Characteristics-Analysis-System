#!/bin/bash
curl -XPUT "http://admin:password@172.26.134.21:5984/twitter"
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