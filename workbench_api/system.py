from __future__ import print_function
import platform
import uuid
import os
from collections import OrderedDict
def get_cpus():
  with open('/proc/cpuinfo') as f:
    for line in f:
      print(line.rstrip('\n'))
def get_mac():
  mac_num = hex(uuid.getnode()).replace('0x', '').upper()
  mac = '-'.join(mac_num[i : i + 2] for i in range(0, 11, 2))
  return mac

def get_pids():
  pids = [pid for pid in os.listdir('/proc') if pid.isdigit()]
  processes = []
  for pid in pids:
    try:
      processes.append(open(os.path.join('/proc', pid, 'cmdline'), 'rb').read().split('\0'))
    except IOError: # proc has already terminated
      continue

def network():
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

def meminfo():
  ''' Return the information in /proc/meminfo
  as a dictionary '''
  meminfo=OrderedDict()

  with open('/proc/meminfo') as f:
    for line in f:
      meminfo[line.split(':')[0]] = line.split(':')[1].strip()
  return meminfo

def main():
  return {
    "machine": platform.machine(),
    "version": platform.version(),
    "platform": platform.platform(),
    "uname": platform.uname(),
    "system": platform.system(),    
    "processes": get_pids(),
    "mac_address": get_mac(),
    "memory": meminfo(),
    "network": network,
    "processor": platform.processor() # 'x86 Family 6 Model 15 Stepping 6, GenuineIntel'
  }



if __name__=='__main__':
    main()