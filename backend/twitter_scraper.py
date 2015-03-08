import oauth2 as oauth
import json
import twitter

#api=twitter.Api()
def fetch_tweets():
	CONSUMER_KEY = "OBWlyGyFHrx4Pk0QXpLvZh1z9"
	CONSUMER_SECRET = "vmZ64p9MWiFOPxErCxZ1lwZbOY298GNJzbRTmj0td4PcXQnqFk"
	ACCESS_KEY = "2613931832-ChTqJSKgld1WeFcXJcP4TZUlxJ35ju0BGLItrFG"
	ACCESS_SECRET = "6QTiZwW6kbfZjdUCfLvZIFHMUZxJ3eHWeg6WPkr2WSOUR"
	api= twitter.Api(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_KEY, ACCESS_SECRET)
	sear = api.GetSearch(term='godaddy',count=100)

	tweets = []
	for t in sear:
		tweets.append((t.id, t.text, t.created_at, t.user.screen_name, t.user.profile_image_url))
	return tweets
	
if __name__ == '__main__':
	fetch_tweets()
