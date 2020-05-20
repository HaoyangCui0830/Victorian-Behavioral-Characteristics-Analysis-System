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

# public_tweets = api.home_timeline()
# for tweet in public_tweets:
#     print(tweet.text)
server = pycouchdb.Server("http://admin:1q2w3e4r@localhost:5984/")
#print(server.info())
# try:
#     db = server.create('ccctest')
# except Exception as e:
#     db = server.database("ccctest")
db = server.database("ccctest1")
time.sleep(5)
# print(db)
result = api.search(geocode = "-37.999250,144.997395,20km",count=100, result_type = 'mixed')
#print(result)
for item in result:
	data = item._json
	#print(data)
	# print(data)
	# get suburb
	suburb = "None"
	if data["place"] and data['place']['place_type'] == 'neighborhood':
		#print(data['place']['place_type'])
		suburb = find_suburb_place(data['place']['name'])
	elif data['coordinates']:
		suburb = find_suburb([data["coordinates"]["coordinates"][0], data["coordinates"]["coordinates"][1]])
		#print(suburb)
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