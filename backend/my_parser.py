import re
import retweet
import reply
import tweet_engine
def parser(message):
        # parsing retweet
        if(message[7]==":"):
                tweet_id=message[9:]
                print tweet_id
                retweet.retweet(tweet_id)

        #parsing reply messages
        if(message[5]==":"):
                arr= re.findall(r"[\w\w]+", message)
                #print arr
                tweet_id=arr[1]
                #print tweet_id
                #print len(arr)
                i=2
                reply_message=""
                while(i<len(arr)-1):
                        sub_message=arr[i]+" "
                        reply_message=reply_message+sub_message
                        i=i+1

                #print reply_message

                userid="@"+arr[len(arr)-1]
                #print userid
                final_message=userid+"  "+reply_message
                print final_message
                reply.reply(final_message,tweet_id)

        if(message=="getNextTweet"):
                return tweet_engine.tweet_engine().get_next_tweet()

        if(message=="getPrevTweet"):
                return tweet_engine.tweet_engine().get_previous_tweet()
                         
