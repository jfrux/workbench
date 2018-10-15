#!/usr/bin/env python
from multiprocessing import Process
import sys
import fingerprint
import monitor
import server
import ws_server

def start_monitor():
  print '[started] Workbench Monitor'
  monitor.main()
  print '[stopped] Workbench Monitor'

if __name__ == '__main__':
    p1 = Process(target = start_monitor)
    p1.start()