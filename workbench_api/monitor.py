#!/usr/bin/env python
import sys
import argparse
import zmq
import json
import time
import platform
import os
from websocket_server import WebsocketServer
from collections import OrderedDict, namedtuple
from selfdrive.version import version, dirty
from common.params import Params
from hexdump import hexdump
from threading import Thread
from selfdrive.config import Conversions as CV
from selfdrive.car.car_helpers import get_car
from cereal import car, log
import selfdrive.messaging as messaging
from selfdrive.services import service_list

def new_client(client, server):
  print("New client connected and was given id %d" % client['id'])
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
        for c in evt.can:
          # read also msgs sent by EON on CAN bus 0x80 and filter out the
          # addr with more than 11 bits
          if c.src%0x80 == 0 and c.address < 0x800:
            can_messages[c.address] = len(c.dat)
        fingerprint = ', '.join("\"%d\": %d" % v for v in sorted(can_messages.items()))
        fingerprint = json.loads('{' + fingerprint + '}')
        data['fingerprint'] = fingerprint
      if evt.which() == 'thermal':
        data['openpilotParams'] = get_params()
        data['system'] = get_system_info()
      if evt.which() in service_whitelist:
        data[evt.which()] = evt.to_dict()[evt.which()]
      
      if any(data):
        state_file = open("/data/workbench/data/state.json", "w")
        state = merge_state(state,data)
        state_file.write(json.dumps(state))
        state_file.close()
        server.send_message_to_all(json.dumps(state))
        # time.sleep(0.25)
# Called for every client disconnecting
def client_left(client, server):
	print("Client(%d) disconnected" % client['id'])

# Called when a client sends a message
def message_received(client, server, message):
	if len(message) > 200:
		message = message[:200]+'..'
	print("Client(%d) said: %s" % (client['id'], message))

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

def meminfo():
    ''' Return the information in /proc/meminfo
    as a dictionary '''
    meminfo=OrderedDict()

    with open('/proc/meminfo') as f:
        for line in f:
            meminfo[line.split(':')[0]] = line.split(':')[1].strip()
    return meminfo
def netdevs():
    ''' RX and TX bytes for each of the network devices '''

    with open('/proc/net/dev') as f:
        net_dump = f.readlines()
    
    device_data={}
    data = namedtuple('data',['rx','tx'])
    for line in net_dump[2:]:
        line = line.split(':')
        if line[0].strip() != 'lo':
            device_data[line[0].strip()] = data(float(line[1].split()[0])/(1024.0*1024.0), 
                                                float(line[1].split()[8])/(1024.0*1024.0))
    
    return device_data
def process_list():
    pids = []
    for subdir in os.listdir('/proc'):
        if subdir.isdigit():
            pids.append(subdir)

    return pids
def get_system_info():
  #system_info
  system = platform.uname()
  #processors
  with open("/proc/cpuinfo", "r")  as f:
    info = f.readlines()

  cpuinfo = [x.strip().split(":")[1] for x in info if "model name"  in x]
  for index, item in enumerate(cpuinfo):
      print("    " + str(index) + ": " + item)
  
  #memory
  memory = meminfo()
  #processes
  # processes = process_list()
  #network
  network = netdevs()

  # uptime
  uptime = None
  with open("/proc/uptime", "r") as f:
      uptime = f.read().split(" ")[0].strip()
  uptime = int(float(uptime))

  # Load
  with open("/proc/loadavg", "r") as f:
    avg_load = f.read().strip()

  data = {
    "avg_load": avg_load,
    "uptime": uptime,
    "system": system,
    "memory": memory,
    "network": network
  }
  return data
  
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
  PORT=4000
  server = WebsocketServer(PORT,host='0.0.0.0')
  server.set_fn_new_client(new_client)
  server.set_fn_client_left(client_left)
  server.set_fn_message_received(message_received)
  server.run_forever()

if __name__ == '__main__':
  main()