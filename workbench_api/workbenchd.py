#!/usr/bin/env python
from multiprocessing import Process
import sys
import fingerprint
import monitor
import server
import ws_server

# def start_fingerprint():
#   print '[started] Workbench Fingerprinter'
#   fingerprint.main()
#   print '[stopped] Workbench Fingerprinter'
  
def start_monitor():
  print '[started] Workbench Monitor'
  monitor.main()
  print '[stopped] Workbench Monitor'

def start_server():
  print '[started] Workbench Web Server'
  server.rest_server()
  print '[stopped] Workbench Web Server'

def start_websockets():
  print '[started] Workbench WebSockets Server'
  ws_server.main()
  print '[stopped] Workbench WebSockets Server'

if __name__ == '__main__':
    p1 = Process(target = start_monitor)
    p1.start()
    p2 = Process(target = start_server)
    p2.start()
    p3 = Process(target = start_websockets)
    p3.start()
    # DEPRECATED, NOW IS IN MONITOR
    # p3 = Process(target = start_fingerprint)
    # p3.start()