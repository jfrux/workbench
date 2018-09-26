#!/usr/bin/env python
from multiprocessing import Process
import sys
import monitor
import server

def start_monitor():
  print '[started] Workbench Monitor'
  monitor.main()
  print '[stopped] Workbench Monitor'

def start_server():
  print '[started] Workbench Web Server'
  server.rest_server()
  print '[stopped] Workbench Web Server'

if __name__ == '__main__':
    p1 = Process(target = start_monitor)
    p1.start()
    p2 = Process(target = start_server)
    p2.start()
