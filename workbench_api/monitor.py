#!/usr/bin/env python
import sys
import argparse
import zmq
import json
import time
import os
from selfdrive.version import version, dirty
from common.params import Params
from hexdump import hexdump
from threading import Thread
from selfdrive.config import Conversions as CV
from selfdrive.car.car_helpers import get_car
from cereal import car, log
import selfdrive.messaging as messaging
from selfdrive.services import service_list
def merge_state(x, y):
  z = x.copy()   # start with x's keys and values
  z.update(y)    # modifies z with y's keys and values & returns None
  return z
# HANDLE PYTHON EXCEPTIONS
def save_exceptions_to_file(exception):
  f = open("/data/workbench/data/exception.json", 'w+')
  f.write(json.dumps(exception));

__excepthook__ = sys.excepthook
def handle_exception(*exc_info):
  if exc_info[0] not in (KeyboardInterrupt, SystemExit):
    save_exceptions_to_file(exc_info=exc_info)
  __excepthook__(*exc_info)

def get_params():
  params = Params()

  is_metric = params.get("IsMetric") == "1"
  passive = params.get("Passive") != "0"
  CP = car.CarParams.from_bytes(params.get("CarParams", block=True))

  data = {
    "passive": passive,
    "is_metric": is_metric,
    "car": CP.to_dict()
  }
  return data

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
  republish_socks = {}
  # WRITE EMPTY FILES
  f = open("/data/workbench/data/exception.json", 'w+')
  f.write('{}');
  f.close()
  f = open("/data/workbench/data/fingerprint.json", 'w+')
  f.write('{}');
  f.close()
  f = open("/data/workbench/data/state.json", 'w+')
  f.write('{}');
  f.close()
  service_whitelist = ["live100", "logMessage", "clocks", "androidLogEntry", "thermal", "health", "gpsLocation", "carState", "carControl"]
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
  
  can_messages = {}
  while 1:
    polld = poller.poll(timeout=1000)
    data = {}
    state_file = open("/data/workbench/data/state.json", "r")
    state = json.loads(state_file.read())
    state_file.close()
    for sock, mode in polld:
      if mode != zmq.POLLIN:
        continue
      msg = sock.recv()
      # print fingerprint
      evt = log.Event.from_bytes(msg)
      
      if evt.which() == 'can':
        for c in msg.can:
          # read also msgs sent by EON on CAN bus 0x80 and filter out the
          # addr with more than 11 bits
          if c.src%0x80 == 0 and c.address < 0x800:
            can_messages[c.address] = len(c.dat)
        fingerprint = ', '.join("\"%d\": %d" % v for v in sorted(msgs.items()))
        fingerprint = json.loads('{' + fingerprint + '}')
        data['fingerprint'] = fingerprint
      if evt.which() == 'thermal':
        data['openpilotParams'] = get_params()
      if evt.which() in service_whitelist:
        data[evt.which()] = evt.to_dict()[evt.which()]
      
      if any(data):
        state_file = open("/data/workbench/data/state.json", "w")
        state = merge_state(state,data)
        state_file.write(json.dumps(state))
        state_file.close()
        time.sleep(0.25)

if __name__ == '__main__':
  main()