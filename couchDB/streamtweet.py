import tweepy
import json
import pycouchdb
import time
from textblob import TextBlob
from shapely.geometry import Point
from shapely.geometry.polygon import Polygon


boundary = json.load(open('geo.json'))
suburbs = [item['properties']['name'] for item in boundary['features']]


def find_suburb(coordinate):
	for item in boundary['features']:
		if item['geometry']['type'] == 'Polygon':
			if Polygon(item['geometry']['coordinates'][0]).contains(Point(coordinate)):
				return item['properties']['name']
		elif item['geometry']['type']=='MultiPolygon':
			for area in item['geometry']['coordinates']:
				if Polygon(area[0]).contains(Point(coordinate)):
					return item['properties']['name']
	return "None"


def find_suburb_place(place_suburb):
	for suburb in suburbs:
		if place_suburb.lower() in suburb.lower():
			return suburb
	return None


def find_attitude(polarity):
	if polarity > 0.1:
		return "pos"
	elif polarity < -0.1:
		return "neg"
	else:
		return "neu"
auth = tweepy.OAuthHandler("lnpDYWDIWShVKmEez297bOfec", "0eYwwH3IRU8qkt5IceBrvQF0aHUaPdpEfNE7ldkEJezzgVE1ry")
auth.set_access_token("974163114433306624-fSrCQPL7HCM33RxE76V2dvFmsuQ1v5n", "i2eBRy83UvrFqhEbIWQ2u29L2ivD2TSVMJYgubPJXEhNR")

api = tweepy.API(auth)

server = pycouchdb.Server("http://admin:123456r@172.26.133.110:5984/")
#print(server.info())
# try:
#     db = server.create('ccctest1')
# except Exception as e:
#     db = server.database("ccctest1")
db = server.database("twitter")
time.sleep(5)
# try:
#     database = server.create('mytest')
# except Exception as e:
#     server.delete('mytest')
#     database = server.create('mytest')




class MyStreamListener(tweepy.StreamListener):
	# def on_status(self, status):
	# 	print(status)
	def on_error(self, status_code):
		if status_code == 420:
			return False
	def on_data(self, jsondata):
		data=json.loads(jsondata);
		suburb = "None"
		if data["place"] and data['place']['place_type'] == 'neighborhood':
			print("place" + data['place']['name'] )
			suburb = find_suburb_place(data['place']['name'])
		elif data['coordinates']:
			suburb = find_suburb([data["coordinates"]["coordinates"][0], data["coordinates"]["coordinates"][1]])
			print("coordinates" + suburb+ "\n" + str(data["coordinates"]["coordinates"][0]) + "  " + str(data["coordinates"]["coordinates"][1]))
		#print(data)
		if data["id_str"] not in db:
			db.save({
				"_id": data["id_str"],
				'retweet_count': data['retweet_count'],
				'id_str':data['id_str'],
				'favorited':data['favorited'],
				'geo': data['geo'],
				'coordinates': data['coordinates'],
				'favorite_count': data['favorite_count'],
				'lang':data['lang'],
				"user": {
					"name": data["user"]["name"],
					"friends_count": data["user"]["friends_count"],
					'protected': data['user']['protected'],
					'favourites_count': data['user']['favourites_count'],
					'location': data['user']['location'],
					'following': data['user']['following'],
					'url': data['user']['url'],
					'id_str': data['user']['id_str'],
					'followers_count': data['user']['followers_count'],
					'listed_count': data['user']['listed_count'],
					'geo_enabled': data['user']['geo_enabled'],
					'lang': data['user']['lang'],
					'friends_count': data['user']['friends_count'],
					'description': data['user']['description'],
					'time_zone': data['user']['time_zone']
				},
				'place': data['place'],
				'entities':{
					'user_mentions': data['entities']['user_mentions'],
					'hashtags': data['entities']['hashtags'],
					'urls': data['entities']['urls'],
					'symbols': data['entities']['symbols']
				},
				'retweeted': data['retweeted'],
				"text": data["text"],
				"location":data["user"]["location"],
				"created_at": data["created_at"],
				"sentiment":{
					"polarity": TextBlob(data["text"]).sentiment.polarity,
					"subjectivity": TextBlob(data["text"]).sentiment.subjectivity
				},
				"suburb": suburb,
				"attitude": find_attitude(TextBlob(data["text"]).sentiment.polarity)
			})
# class MyStreamListener(tweepy.StreamListener):
# 	# def on_status(self, status):
# 	# 	print(status)
# 	def on_data(self, jsondata):
# 		data=json.loads(jsondata);
# 		suburb = "None"
# 		if data["place"] and data['place']['place_type'] == 'neighborhood':
# 			print("place" + data['place']['name'])
# 			suburb = find_suburb_place(data['place']['name'])
# 		elif data['coordinates']:
# 			suburb = find_suburb([data["coordinates"]["coordinates"][0], data["coordinates"]["coordinates"][1]])
# 			print("coordinates" + suburb)
# 		#print(data)
# 		if data["id_str"] not in db:
# 			db.save({
# 				"_id": data["id_str"],
# 				'retweet_count': data['retweet_count'],
# 				'in_reply_to_status_id': data['in_reply_to_status_id'],
# 				'in_reply_to_status_id_str': data['in_reply_to_status_id_str'],
# 				'id_str':data['id_str'],
# 				'favorited':data['favorited'],
# 				'source':data['source'],
# 				'truncated':data['truncated'],
# 				'geo': data['geo'],
# 				'in_reply_to_user_id': data['in_reply_to_user_id'],
# 				'in_reply_to_screen_name': data['in_reply_to_screen_name'],
# 				'is_quote_status': data['is_quote_status'],
# 				'contributors': data['contributors'],
# 				'coordinates': data['coordinates'],
# 				'favorite_count': data['favorite_count'],
# 				'in_reply_to_user_id_str': data['in_reply_to_user_id_str'],
# 				'lang':data['lang'],
# 				"user": {
# 					"name": data["user"]["name"],
# 					"friends_count": data["user"]["friends_count"],
# 					'protected': data['user']['protected'],
# 					'verified': data['user']['verified'],
# 					'is_translator': data['user']['is_translator'],
# 					'favourites_count': data['user']['favourites_count'],
# 					'location': data['user']['location'],
# 					'screen_name': data['user']['screen_name'],
# 					'profile_image_url_https': data['user']['profile_image_url_https'],
# 					'following': data['user']['following'],
# 					'profile_image_url': data['user']['profile_image_url'],
# 					'url': data['user']['url'],
# 					'id_str': data['user']['id_str'],
# 					'profile_sidebar_border_color': data['user']['profile_sidebar_border_color'],
# 					'followers_count': data['user']['followers_count'],
# 					'listed_count': data['user']['listed_count'],
# 					'geo_enabled': data['user']['geo_enabled'],
# 					'profile_background_image_url': data['user']['profile_background_image_url'],
# 					'profile_sidebar_fill_color': data['user']['profile_sidebar_fill_color'],
# 					'profile_use_background_image': data['user']['profile_use_background_image'],
# 					'profile_link_color': data['user']['profile_link_color'],
# 					'profile_background_color': data['user']['profile_background_color'],
# 					'notifications': data['user']['notifications'],
# 					'id': data['user']['id'],
# 					'created_at': data['user']['created_at'],
# 					'profile_background_tile': data['user']['profile_background_tile'],
# 					'statuses_count': data['user']['statuses_count'],
# 					'profile_text_color': data['user']['profile_text_color'],
# 					'default_profile': data['user']['default_profile'],
# 					'utc_offset': data['user']['utc_offset'],
# 					'contributors_enabled': data['user']['contributors_enabled'],
# 					'lang': data['user']['lang'],
# 					'translator_type': data['user']['translator_type'],
# 					'profile_background_image_url_https': data['user']['profile_background_image_url_https'],
# 					'default_profile_image': data['user']['default_profile_image'],
# 					'follow_request_sent': data['user']['follow_request_sent'],
# 					'friends_count': data['user']['friends_count'],
# 					'description': data['user']['description'],
# 					'time_zone': data['user']['time_zone']
# 				},
# 				'place': data['place'],
# 				'entities':{
# 					'user_mentions': data['entities']['user_mentions'],
# 					'hashtags': data['entities']['hashtags'],
# 					'urls': data['entities']['urls'],
# 					'symbols': data['entities']['symbols']
# 				},
# 				'retweeted': data['retweeted'],
# 				"text": data["text"],
# 				"location":data["user"]["location"],
# 				"created_at": data["created_at"],
# 				"sentiment":{
# 					"polarity": TextBlob(data["text"]).sentiment.polarity,
# 					"subjectivity": TextBlob(data["text"]).sentiment.subjectivity
# 				},
# 				"suburb": suburb
# 			})
myStreamListener = MyStreamListener()
myStream = tweepy.Stream(auth = api.auth, listener=myStreamListener)
#myStream.filter(locations=[144.703953,-38.098560,145.483983,-37.599744], track=['food'])
myStream.filter(locations=[144.703953,-38.098560,145.483983,-37.599744])
