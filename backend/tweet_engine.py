import bisect
import datetime
import unicodedata

import sentiment_classifier
import twitter_scraper

class __tweet_tuple__():
	text = None
	id = -1
	date = None
	username = None
	profile_image_url = None
	sentiment = None
	responded = False

	def __init__(self, tweet_table):
		self.id = tweet_table[0]
		self.text = unicodedata.normalize('NFKD', tweet_table[1]).encode('ascii', 'ignore')
		self.date = datetime.datetime.strptime(tweet_table[2], '%a %b %d %H:%M:%S +0000 %Y')
		self.username = unicodedata.normalize('NFKD', tweet_table[3]).encode('ascii', 'ignore')
		self.profile_image_url = unicodedata.normalize('NFKD', tweet_table[4]).encode('ascii', 'ignore')
		
	def __cmp__(self, other):
		#print(type(self.date))
		#print(type(other))
		if self.date < other.date:
			return -1
		elif self.date == other.date:
			return 0
		else:
			return 1
	
#Want to use bisect_right for this.	
class tweet_engine():
	tweets = []
	cur_tweet = None
	tweet_history = []
	
	def __init__(self):
		self.__update_tweets__()
	
	def __update_tweets__(self):
		added_tweets = []
		
		raw_tweets = twitter_scraper.fetch_tweets()
		if (raw_tweets == None):
			return None
		
		for at in raw_tweets:
			added_tweets.append(__tweet_tuple__(at))
		
		if (len(self.tweets) > 0):
			new_start_index = bisect.bisect_right(added_tweets, self.tweets[-1])
		else:
			new_start_index = 0
		
		self.tweets += added_tweets[new_start_index:]
	
	def __find_next_tweet__(self):
		tweet = self.tweets.pop()
		sentiment = sentiment_classifier.get_sentiment(tweet.text)
		
		while sentiment == None or sentiment == 'neutral':
			tweet = self.tweets.pop()
			sentiment = sentiment_classifier.get_sentiment(tweet.text)
		
		tweet.sentiment = sentiment
		return tweet
	
	def get_next_tweet(self):
		#See if you need to retrieve more tweets
		if len(self.tweets) <= 1:
			self.__update_tweets__()
		
		#If there are no more tweets even after update, return None.
		if len(self.tweets) < 1:
			return None
		
		self.tweet_history.append(self.cur_tweet)
		self.cur_tweet = self.__find_next_tweet__()
		
		tweet_str = str(self.cur_tweet.id) + '::' + self.cur_tweet.text + '::' + self.cur_tweet.sentiment + '::' + self.cur_tweet.username + '::' + self.cur_tweet.profile_image_url
		return tweet_str
		
	def __mark_current_tweet_as_responded__(self):
		self.cur_tweet.responded = True
		
	def get_previous_tweet(self):
		if len(self.tweet_history) < 1:
			return None
		
		self.tweets.append(self.cur_tweet)
		self.cur_tweet = self.tweet_history.pop()
		
		return str(self.cur_tweet.id) + '::' + self.cur_tweet.text + '::' + self.cur_tweet.sentiment + '::' + self.cur_tweet.username + '::' + self.cur_tweet.profile_image_url
		
if __name__ == '__main__':
	te = tweet_engine()
	print(te.get_next_tweet())
	print(te.get_next_tweet())
	print(te.get_previous_tweet())
