import tweepy
import json
import pycouchdb
import time

auth = tweepy.OAuthHandler("lnpDYWDIWShVKmEez297bOfec", "0eYwwH3IRU8qkt5IceBrvQF0aHUaPdpEfNE7ldkEJezzgVE1ry")
auth.set_access_token("974163114433306624-fSrCQPL7HCM33RxE76V2dvFmsuQ1v5n", "i2eBRy83UvrFqhEbIWQ2u29L2ivD2TSVMJYgubPJXEhNR")

api = tweepy.API(auth)

server = pycouchdb.Server("http://admin:1q2w3e4r@localhost:5984/")
#print(server.info())
db = server.database("ccctest")
time.sleep(5)

class MyStreamListener(tweepy.StreamListener):
	# def on_status(self, status):
	# 	print(status)
	def on_data(self, jsondata):
		data=json.loads(jsondata);
		print(data)
		if data["id_str"] not in db:
			db.save({
			"_id": data["id_str"],
			"user": {
				"name": data["user"]["name"],
				"friends_count": data["user"]["friends_count"]
			},
			"text": data["text"],
			"location":data["user"]["location"],
			"created_at": data["created_at"]
			})
myStreamListener = MyStreamListener()
myStream = tweepy.Stream(auth = api.auth, listener=myStreamListener)
myStream.filter(locations=[144.293405,-38.548275,145.493112,-37.505479])