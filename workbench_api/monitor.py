#!/usr/bin/env python
import sys
import argparse
import zmq
import json
import time

from hexdump import hexdump
from threading import Thread

from cereal import log
import selfdrive.messaging as messaging
from selfdrive.services import service_list

def main():
  context = zmq.Context()
  poller = zmq.Poller()
  parser = argparse.ArgumentParser(description='Sniff a communcation socket')
  parser.add_argument('--pipe', action='store_true')
  parser.add_argument('--raw', action='store_true')
  parser.add_argument('--json', action='store_true')
  parser.add_argument('--dump-json', action='store_true')
  parser.add_argument('--no-print', action='store_true')
  parser.add_argument('--proxy', action='store_true', help='republish on localhost')
  parser.add_argument('--map', action='store_true')
  parser.add_argument('--addr', default='127.0.0.1')
  parser.add_argument("socket", type=str, nargs='*', help="socket name")
  args = parser.parse_args()
  data = {}
  republish_socks = {}
  # WRITE EMPTY FILE
  f = open("/data/workbench/data/fingerprint.json", 'w+')
  f.write('{}');
  for m in args.socket if len(args.socket) > 0 else service_list:
    if m in service_list:
      port = service_list[m].port
    elif m.isdigit():
      port = int(m)
    else:
      print("service not found")
      exit(-1)
    sock = messaging.sub_sock(context, port, poller, addr=args.addr)
    if args.proxy:
      republish_socks[sock] = messaging.pub_sock(context, port)
  while 1:
    polld = poller.poll(timeout=1000)
    
    for sock, mode in polld:
      if mode != zmq.POLLIN:
        continue
      msg = sock.recv()
      # print fingerprint
      evt = log.Event.from_bytes(msg)
      if sock in republish_socks:
        republish_socks[sock].send(msg)
      # print evt
      service_whitelist = ["thermal", "health", "gpsLocation", "carState", "carControl"]
      # THERMAL
      # if evt.which() == 'thermal':
      #   data['thermal'] = evt.thermal.to_dict()
      # # HEALTH
      # elif evt.which() == 'health':
      #   data['health'] = evt.health.to_dict()
      # # DRIVER MONITORING
      # elif evt.which() == 'can':
      #   # print evt.can.to_dict()
      #   data['can'] = evt.can.to_dict()
      # # GPS LOCATION
      # elif evt.which() == 'gpsLocation':
      #   data['gps'] = evt.gpsLocation.to_dict()
      # # else:

      if evt.which() in service_whitelist:
        data[evt.which()] = evt.to_dict()[evt.which()]
      #   print evt.which()
        # if evt.which() is not '__getitem__':
        #   data[evt.which()] = evt[evt.which()].to_dict()
      # print '\n'
      # pp.pprint(data, depth=3)
      if any(data):
        f = open("/data/workbench/data/state.json", 'w+')
        f.write(json.dumps(data))
        time.sleep(0.25)
      # if not args.no_print:
      #   if args.pipe:
      #     sys.stdout.write(msg)
      #     sys.stdout.flush()
      #   elif args.raw:
      #     hexdump(msg)
      #   elif args.json:
      #     print(json.loads(msg))
      #   elif args.dump_json:
          
      #     print evt

if __name__ == '__main__':
  main()