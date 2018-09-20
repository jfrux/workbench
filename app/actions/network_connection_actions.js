import * as CidrUtil from "node-cidr";
import ip from "ip";
console.log("CidrUtil",CidrUtil);
export function setupNetworkEvents() {
  return (dispatch, getState) => {
    const alertOnlineStatus = () => {
     navigator.onLine ? dispatch({
        type: "network/CONNECTED",
        payload: {
          ip: ip.address(),
          ip_cidr: CidrUtil.cidr.toCidr(ip.address())
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