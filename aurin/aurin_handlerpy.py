import json
import time
import sys


boundary = json.load(open('geo.json'))
suburbs = [item['properties']['name'] for item in boundary['features']]

aurin_file = json.load(open(sys.argv[1]))
aurin_suburbs = [item['properties'][sys.argv[4]].lower() for item in aurin_file['features']]
aurin_data = [item['properties'][sys.argv[3]] for item in aurin_file['features']]
aurin_list = []

for suburb in suburbs:
	for aurin_suburb in aurin_suburbs:
		if suburb.lower() in aurin_suburb:
			j = {}
			j['key'] = suburb
			j['value'] = aurin_data[aurin_suburbs.index(aurin_suburb)]
			aurin_list.append(j)
			break
dictionary = {}
dictionary['rows'] = aurin_list
print(dictionary)
with open(sys.argv[2], 'w') as fp:
    json.dump(dictionary, fp, indent=2)