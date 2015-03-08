import pycurl
import cStringIO
import json

api_key = "fb909d43d6b025287f6c4f3c88a09679"

def __parse_response__(response):
	decoded_response = json.loads(response)
	
	if 'error' in decoded_response["output"]:
		return None
	
	return decoded_response["output"]["result"]

def get_sentiment(tweet):
	post_request = pycurl.Curl()
	post_request.setopt(pycurl.URL, "http://api.datumbox.com/1.0/SentimentAnalysis.json")
	
	post_fields = 'api_key=' + api_key + '&text=' + tweet
	post_request.setopt(pycurl.POSTFIELDS, post_fields)
	
	buffer = cStringIO.StringIO()
	post_request.setopt(pycurl.WRITEFUNCTION, buffer.write)
	
	post_request.perform()
	
	response = buffer.getvalue()
	buffer.close()
	
	return __parse_response__(response)

	
if __name__ == '__main__':
	print(get_sentiment("I hate Bill and Ruth's"))