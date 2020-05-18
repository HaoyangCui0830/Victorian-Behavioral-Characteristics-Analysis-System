#!/bin/bash
curl -XPUT "http://admin:password@172.26.134.21:5984/twitter"

npm install
export dbname='twitter'
grunt couch-compile
grunt couch-push

pip install tweepy
pip install pycouchdb
pip install textblob
pip install shapely

python3 streamtweet.py