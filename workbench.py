import zmq
import json
import time
from cereal import log

port = 8018
ipaddress = "localhost"
context = zmq.Context()
socket = context.socket(zmq.SUB)
socket.connect ("tcp://%s:%d" % (ipaddress, port))
socket.setsockopt(zmq.SUBSCRIBE, b"")
poller = zmq.Poller()
poller.register(socket, zmq.POLLIN)

while True:
 msg = []

 try:
     socks = dict(poller.poll())
 except KeyboardInterrupt:
     break
 if socket in socks:
     message = socket.recv(zmq.NOBLOCK)
     msg.append(log.Event.from_bytes(message))
     if len(msg) > 0:
         for a in msg:
           print a