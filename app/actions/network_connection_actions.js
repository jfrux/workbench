import * as CidrUtil from "node-cidr";
import IpUtil from "ip";
const iprange = require('iprange');
// console.log("CidrUtil",CidrUtil);
// console.log("IpUtil",IpUtil);

export function getBaseIp(ip,octets=3) {
  let aIp = ip.split('.');
  let counter = aIp.length;
  let lastSegment;
  let baseIp = ip;
  while(counter > octets) {
    if (aIp.length > 0) {
      baseIp = aIp.slice(0, -1).join('.');
      lastSegment = aIp.pop();
      counter--;
    }
  }
  return {baseIp,lastSegment: parseInt(lastSegment)};
}

function numberRange(start, end) {
  return new Array(end - start).fill().map((d, i) => i + start);
}

function getAfterOctet(ip) {
  const aIp = ip.split('.');
  const baseIp = getBaseIp(ip,2);
  const availableRange = numberRange(0,255);
  let newIndex = baseIp.lastSegment+1 % availableRange.length;
  return baseIp.baseIp + "." + newIndex;
}

function getBeforeOctet(ip) {
  const aIp = ip.split('.');
  const baseIp = getBaseIp(ip,2);
  const availableRange = numberRange(0,255);
  let newIndex = baseIp.lastSegment-1 % availableRange.length;
  return baseIp.baseIp + "." + newIndex;
}

function getNeighborNetworks(ip) {
  return {
    afterNetwork: getAfterOctet(ip),
    beforeNetwork: getBeforeOctet(ip)
  };
}

export function getIpsForScan(ip) {
  const { afterNetwork, beforeNetwork } = getNeighborNetworks(ip);
  const baseIpsToScan = [getBaseIp(ip,3).baseIp,beforeNetwork,afterNetwork]; 

  return baseIpsToScan;
  // return new Promise((resolve,reject) => {
  //   let newIps = [];
  //   return Promise.all(baseIpsToScan.map((net) => {
  //     return new Promise((resolve,reject) => {
  //       let ips = [];
  //       var IPEmitter = require('iprange').IPEmitter;
  //       var emitter = new IPEmitter(net + '/24');
  //       emitter.on('ip',(ip) => {
  //         ips.push(ip);
  //       });
  //       emitter.on('end', function() {
  //         resolve(ips);
  //       });
  //     });
  //   })).then((ips) => {
  //     var merged = [].concat.apply([], ips);

  //     resolve(merged);
  //   });
  // });
  
}

export function isSameNetwork(ip,otherIp) {
  return (getBaseIp(ip) === getBaseIp(otherIp));
}

export function setupNetworkEvents() {
  return (dispatch, getState) => {
    const alertOnlineStatus = () => {
      let currentIp = IpUtil.address();
     navigator.onLine ? dispatch({
        type: "network/CONNECTED",
        payload: {
          ip: currentIp
          // ip_cidr: CidrUtil.cidr.toCidr(ip.address())
        }
      }) : dispatch({
        type: "network/DISCONNECTED"
      });
    };

    window.addEventListener('online',  alertOnlineStatus);
    window.addEventListener('offline',  alertOnlineStatus);

    alertOnlineStatus();
  };
}