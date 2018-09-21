import * as CidrUtil from "node-cidr";
import IpUtil from "ip";
console.log("CidrUtil",CidrUtil);
console.log("IpUtil",IpUtil);

function getBaseIp(ip) {
  const aIp = ip.split('.');
  let baseIp;
  if (aIp.length === 4) {
    baseIp = aIp.slice(0, -1).join('.');
  }
  return baseIp;
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
      })
    }

    window.addEventListener('online',  alertOnlineStatus)
    window.addEventListener('offline',  alertOnlineStatus)

    alertOnlineStatus();
  }
}