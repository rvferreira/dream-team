import oauth2 as oauth
import json
import twitter

#api=twitter.Api()
CONSUMER_KEY = "OBWlyGyFHrx4Pk0QXpLvZh1z9"
CONSUMER_SECRET = "vmZ64p9MWiFOPxErCxZ1lwZbOY298GNJzbRTmj0td4PcXQnqFk"
ACCESS_KEY = "2613931832-rgwLxMgiL5n3ohCZaOiZnFuceoszA8VPdR8T4pp"
ACCESS_SECRET = "EWvez8lRRSHfOHn0bhJ8Zo9jGqso0c1HU7ElwEMOhPZgc"
api= twitter.Api(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_KEY, ACCESS_SECRET)
sear = api.GetSearch(term='godaddy',count=100)

tweets = [x.text for x in sear]
ids = [x.id for x in sear]
date = [x.created_at for x in sear]
import pprint
pprint.pprint(tweets)
pprint.pprint(ids)
pprint.pprint(date)
