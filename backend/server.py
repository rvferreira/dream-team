import my_parser

import tornado.web
import tornado.websocket
import tornado.ioloop

# This is our WebSocketHandler - it handles the messages
# from the tornado server
class WebSocketHandler(tornado.websocket.WebSocketHandler):
        # the client connected
        def open(self):
                self.write_message("You are connected")

	# the client sent the message
        def on_message(self, message):
        #Call function to parse message. Place return value 
                return_message = my_parser.parser(message)
                if (return_message != None):
                        self.write_message(return_message)

	# client disconnected
        def on_close(self):
                print "Client disconnected"

# start a new WebSocket Application
# use "/" as the root, and the 
# WebSocketHandler as our handler
application = tornado.web.Application([
        (r"/", WebSocketHandler),
])

# start the tornado server on port 9999
if __name__ == "__main__":
        application.listen(9999)
        tornado.ioloop.IOLoop.instance().start()
