import tweepy
import httplib
import oauth2

def reply(my_message, tweetid):
        CONSUMER_KEY = "OBWlyGyFHrx4Pk0QXpLvZh1z9"
        CONSUMER_SECRET = "vmZ64p9MWiFOPxErCxZ1lwZbOY298GNJzbRTmj0td4PcXQnqFk"
        ACCESS_KEY = "2613931832-ChTqJSKgld1WeFcXJcP4TZUlxJ35ju0BGLItrFG"
        ACCESS_SECRET = "6QTiZwW6kbfZjdUCfLvZIFHMUZxJ3eHWeg6WPkr2WSOUR"
        auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
        auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)
        api = tweepy.API(auth)
        api.update_status(my_message, in_reply_to_status_id = tweetid)

if __name__ == '__main__':
	reply("@mouz_  hellooooooo", 61631085372637184)