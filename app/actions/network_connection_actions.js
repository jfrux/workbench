import * as CidrUtil from "node-cidr";
import IpUtil from "ip";
import iprange, { IPEmitter }  from 'iprange';
const ipv4 = /^(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(?:\.(?!$)|$)){4}$/;
function modulo(num, div) {
  return ((num % div) + div) % div;
}
/**
 * Convert an IPv4 to an hexadecimal representation
 * @param  {String} ip   IPv4
 * @return {Integer} hex representation
 */
function ip2hex(ip) {
  let parts = ip.split('.').map(str => parseInt(str, 10));
  let n = 0;

  n += parts[3];
  n += parts[2] * 256;      // 2^8
  n += parts[1] * 65536;    // 2^16
  n += parts[0] * 16777216; // 2^24

  return n;
}

function assertIpv4(str, msg) {
  if (!ipv4.test(str)) { throw new Error(msg); }
}
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

export function getIpList(ip1,ip2) {
  let ipList = [];
  for (let ip of range(ip1, ip2)) {
    if (ip.endsWith('.0')) {
      ipList.push(ip + '/24');
    }
  }
  return ipList;
}
/**
 * Generate all IPv4 that are included in the given range
 * @param {String} ip1   first IPv4 of the range
 * @param {String} ip2   last IPv4 of the range
 * @yield {String} IPv4 included in the range
 */
export function *range(ip1, ip2) {
  assertIpv4(ip1, 'argument "ip1" must be a valid IPv4 address');
  assertIpv4(ip2, 'argument "ip2" must be a valid IPv4 address');

  let hex  = ip2hex(ip1);
  let hex2 = ip2hex(ip2);

  if (hex > hex2) {
    let tmp = hex;
    hex = hex2;
    hex2 = tmp;
  }

  for (let i = hex; i <= hex2; i++) {
    yield `${(i >> 24) & 0xff}.${(i >> 16) & 0xff}.${(i >> 8) & 0xff}.${i & 0xff}`;
  }
}
const availableRange = numberRange(0,255);
function getAfterOctet(ip) {
  const aIp = ip.split('.');
  const baseIp = getBaseIp(ip,2);
  // console.warn("afterbaseIp",baseIp);
  let differ = (baseIp.lastSegment+20);
  if (differ > 254) {
    differ = 254;
  }
  // let newIndex = modulo((baseIp.lastSegment+10), 254);
  // console.warn("after newIndex:",newIndex);
  return baseIp.baseIp + "." + differ;
}

function getBeforeOctet(ip) {
  const aIp = ip.split('.');
  const baseIp = getBaseIp(ip,2);
  // console.warn("beforebaseIp",baseIp);
  let differ = (baseIp.lastSegment-20);
  if (differ < 0) {
    differ = 0;
  }
  // let newIndex =  modulo(differ, 254);
  // console.warn("before newIndex:",newIndex);
  return baseIp.baseIp + "." + differ;
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
