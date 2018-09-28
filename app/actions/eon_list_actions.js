import path from 'path';
import fs from 'fs';
import settings from 'electron-settings';
import routes from '../constants/routes.json';
import * as types from '../constants/eon_list_action_types'
import * as networkActions from './network_connection_actions';
const portscanner = require('portscanner');
const app = require('electron').remote.app
const SSH = require('node-ssh');
const RSAKey = require('rsa-key');
const netList = require('network-list');
const mkdirp = require("mkdirp");
const isPortReachable = require('is-port-reachable');

// SSH ACTION CREATORS
export function BEGIN_connectSSH() {
  return {
    type: types.CONNECT_SSH
  }
}

export function SUCCESS_connectSSH() {
  return {
    type: types.CONNECT_SSH_SUCCESS
  }
}

export function FAIL_connectSSH(err) {
  return {
    type: types.CONNECT_SSH_FAIL,
    payload: {
      err
    }
  }
}

export function BEGIN_sshCommand() {
  return {
    type: types.SSH_COMMAND
  }
}

export function SUCCESS_sshCommand() {
  return {
    type: types.SSH_COMMAND_SUCCESS
  }
}

export function RESPONSE_sshCommand(stdout,stderr) {
  return {
    type: types.SSH_COMMAND_RESPONSE,
    payload: {
      stderr,
      stdout
    }
  }
}

export function FAIL_sshCommand(err) {
  return {
    type: types.SSH_COMMAND_FAIL,
    payload: {
      err
    }
  }
}

// LOCATE ACTION CREATORS
export function BEGIN_scanNetwork() {
  // console.log("dispatched BEGIN_scanNetwork");

  return {
    type: types.SCAN_NETWORK
  };
}

export function FOUND_scanNetwork(foundResults,state) {
  return {
    type: types.SCAN_NETWORK_FOUND,
    payload: {
      found: foundResults
    }
  };
}

export function SUCCESS_scanNetwork(results,state) {
  // console.log("SUCCESS_scanNetwork:",results);
  return {
    type: types.SCAN_NETWORK_SUCCESS,
    payload: {
      results
    }
  };
}
export function NOT_FOUND_scanNetwork() {
  // settings.set("scanResults",results);
  console.warn("DISPATCHING");
  return {
    type: types.SCAN_NETWORK_NOT_FOUND,
  };
}

export function FAIL_scanNetwork(err) {
  return {
    type: types.SCAN_NETWORK_FAIL,
    payload: {
      err
    }
  };
}


export function SELECT_EON(index) {
  return {
    type: types.SELECT_EON,
    payload: {
      index
    }
  };
}

export function DESELECT_EON(index) {
  return {
    type: types.DESELECT_EON
  };
}

// METHODS
export function getPrivateKey() {
  const userHome = app.getPath('home');
  mkdirp.sync(path.join(userHome,'.ssh'));
  const filePath = path.join(userHome,'.ssh','openpilot_rsa');
  if (!fs.existsSync(filePath)) {
fs.writeFileSync(filePath,`-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC+iXXq30Tq+J5N
Kat3KWHCzcmwZ55nGh6WggAqECa5CasBlM9VeROpVu3beA+5h0MibRgbD4DMtVXB
t6gEvZ8nd04E7eLA9LTZyFDZ7SkSOVj4oXOQsT0GnJmKrASW5KslTWqVzTfo2XCt
Z+004ikLxmyFeBO8NOcErW1pa8gFdQDToH9FrA7kgysic/XVESTOoe7XlzRoe/eZ
acEQ+jtnmFd21A4aEADkk00Ahjr0uKaJiLUAPatxs2icIXWpgYtfqqtaKF23wSt6
1OTu6cAwXbOWr3m+IUSRUO0IRzEIQS3z1jfd1svgzSgSSwZ1Lhj4AoKxIEAIc8qJ
rO4uymCJAgMBAAECggEBAISFevxHGdoL3Z5xkw6oO5SQKO2GxEeVhRzNgmu/HA+q
x8OryqD6O1CWY4037kft6iWxlwiLOdwna2P25ueVM3LxqdQH2KS4DmlCx+kq6FwC
gv063fQPMhC9LpWimvaQSPEC7VUPjQlo4tPY6sTTYBUOh0A1ihRm/x7juKuQCWix
Cq8C/DVnB1X4mGj+W3nJc5TwVJtgJbbiBrq6PWrhvB/3qmkxHRL7dU2SBb2iNRF1
LLY30dJx/cD73UDKNHrlrsjk3UJc29Mp4/MladKvUkRqNwlYxSuAtJV0nZ3+iFkL
s3adSTHdJpClQer45R51rFDlVsDz2ZBpb/hRNRoGDuECgYEA6A1EixLq7QYOh3cb
Xhyh3W4kpVvA/FPfKH1OMy3ONOD/Y9Oa+M/wthW1wSoRL2n+uuIW5OAhTIvIEivj
6bAZsTT3twrvOrvYu9rx9aln4p8BhyvdjeW4kS7T8FP5ol6LoOt2sTP3T1LOuJPO
uQvOjlKPKIMh3c3RFNWTnGzMPa0CgYEA0jNiPLxP3A2nrX0keKDI+VHuvOY88gdh
0W5BuLMLovOIDk9aQFIbBbMuW1OTjHKv9NK+Lrw+YbCFqOGf1dU/UN5gSyE8lX/Q
FsUGUqUZx574nJZnOIcy3ONOnQLcvHAQToLFAGUd7PWgP3CtHkt9hEv2koUwL4vo
ikTP1u9Gkc0CgYEA2apoWxPZrY963XLKBxNQecYxNbLFaWq67t3rFnKm9E8BAICi
4zUaE5J1tMVi7Vi9iks9Ml9SnNyZRQJKfQ+kaebHXbkyAaPmfv+26rqHKboA0uxA
nDOZVwXX45zBkp6g1sdHxJx8JLoGEnkC9eyvSi0C//tRLx86OhLErXwYcNkCf1it
VMRKrWYoXJTUNo6tRhvodM88UnnIo3u3CALjhgU4uC1RTMHV4ZCGBwiAOb8GozSl
s5YD1E1iKwEULloHnK6BIh6P5v8q7J6uf/xdqoKMjlWBHgq6/roxKvkSPA1DOZ3l
jTadcgKFnRUmc+JT9p/ZbCxkA/ALFg8++G+0ghECgYA8vG3M/utweLvq4RI7l7U7
b+i2BajfK2OmzNi/xugfeLjY6k2tfQGRuv6ppTjehtji2uvgDWkgjJUgPfZpir3I
RsVMUiFgloWGHETOy0Qvc5AwtqTJFLTD1Wza2uBilSVIEsg6Y83Gickh+ejOmEsY
6co17RFaAZHwGfCFFjO76Q==
-----END PRIVATE KEY-----`);
  }
  const key = new RSAKey(fs.readFileSync(filePath));
  
  return key.exportKey('private', 'pem', 'pkcs1') 
}

export function sendPiped(eon, command, commandArgs = [], stdOut = () => {}, stdErr = () => {}) {
  const privateKey = getPrivateKey();
  // console.log(privateKey);
  app.tmuxClient = new SSH();
  return (dispatch, getState) => {
    return app.tmuxClient.connect({
      host: eon.ip,
      username: 'root',
      port: 8022,
      privateKey: privateKey
    }).then(() => {
      return app.tmuxClient.exec(command, commandArgs, {
        cwd: '/',
        onStdout(chunk) {
          // console.log(chunk.toString('utf8'));
          stdOut(chunk.toString('utf8'));
        },
        onStderr(chunk) {
          console.warn("CONNECTION ERROR!");
          stdErr(chunk.toString('utf8'));
        },
      });
    }).catch((err) => {
      dispatch(FAIL_connectSSH(err));
      // console.warn("ERROR CONNECTING:",err);
    });
  };
}

export function sendCommand(eon, command, commandArgs = [], stdOut = () => {}, stdErr = () => {}) {
  const privateKey = getPrivateKey();
  app.sshClient = new SSH();
  return (dispatch, getState) => {
    return app.sshClient.connect({
      host: eon.ip,
      username: 'root',
      port: 8022,
      privateKey: privateKey
    }).then(() => {
      console.warn("Dispatching command:\n",command)
      console.warn("To EON:\n",eon);
      return app.sshClient.exec(command, commandArgs, {
        cwd: '/',
        onStdout(chunk) {
          console.warn("stdOut:",chunk.toString('utf8'));
          stdOut(chunk.toString('utf8'));
        },
        onStderr(chunk) {
          console.warn("stdErr:",chunk.toString('utf8'));
          stdErr(chunk.toString('utf8'));
        },
      });
    }).catch((err) => {
      dispatch(FAIL_connectSSH(err));
      // console.warn("ERROR CONNECTING:",err);
    });
  };
}

export function scanNetwork() {
  return (dispatch, getState) => {
    dispatch(BEGIN_scanNetwork());
    let scanCount = 0;
    let foundCount = 0;
    let found = [];
    const ips = networkActions.getIpsForScan(getState().networkConnection.ip);
    // console.log(ips);
    const totalIps = ips.length * 254;
    let percentageComplete = 0;
    // console.log("Total ips to scan:", totalIps);
    ips.forEach((ip) => {
      // console.log("Checking ip:",ip);
      netList.scanEach({
        ip: ip
      }, (err, obj) => {
        scanCount++;
        percentageComplete = scanCount / totalIps;
        // console.log("[" + scanCount + "] [" + percentageComplete + "] " + obj.ip + ": " + obj.vendor);
        // console.log("Scan #" + scanCount);
        dispatch({
          type: types.SCAN_NETWORK_PROGRESS,
          payload: {
            percentage: Math.round(percentageComplete * 100)
          }
        })
        if (obj.vendor === "OnePlus Technology (Shenzhen) Co., Ltd") {
          let { scanResults } = getState().eonList;
          // if (scanResults) {
          var foundExisting = scanResults.filter((result) => {
            return (result.mac === obj.mac) && (result.ip === obj.ip);
          });
          // console.warn("Found existing:",foundExisting);
          if (!foundExisting.length) {
            scanResults.push(obj);
          }
          found.push(obj);

          settings.set("scanResults",scanResults);
          dispatch(SUCCESS_scanNetwork(scanResults,getState()));
          
        }
        // found = true;
        // scanner = null;
        if (scanCount >= 762) {
          if (found.length) {
            console.warn('scan done... found...',found.length);
            dispatch(FOUND_scanNetwork());
          } else {
            console.warn('scan done... found...',found.length);
            dispatch(NOT_FOUND_scanNetwork());
          }
        }
      });
    });
    // netList.scanEach({}, (err, obj) => {
    //   
    //   
    // });
    
    // console.log(scanner);
  };
}

export function selectEon(index) {
  return (dispatch, getState) => {
    dispatch(SELECT_EON(index));
  };
}
export function addManually(ip_address) {
  return (dispatch, getState) => {
    let { scanResults } = getState().eonList;
    scanResults.push({
      ip: ip_address,
      mac: "Unknown"
    });
    settings.set("scanResults",scanResults);
    dispatch(SUCCESS_scanNetwork(scanResults,getState()));
    dispatch(SELECT_EON(0));
  };
}
export function checkExistingEONStatuses() {
  return (dispatch, getState) => {
    const { scanResults } = getState().eonList;
    scanResults.forEach((eon) => {
      //check if available.
      dispatch({
        type: types.CHECK_EON_STATUS,
        payload: {
          eon
        }
      });
      isPortReachable(8022, {
        host: eon.ip
      }).then(reachable => {
        if (reachable) {
          dispatch({
            type: types.CHECK_EON_STATUS_ONLINE,
            payload: {
              eon
            }
          });
        } else {
          dispatch({
            type: types.CHECK_EON_STATUS_OFFLINE,
            payload: {
              eon
            }
          });
        }
        //=> true
      });
    });
  }
}
export function resetScanNetwork() {
  return {
    type: types.SCAN_NETWORK_RESET
  }
}
export function retrieveEonFromSettings() {
  return (dispatch, getState) => {
    let scanResults = getState().eonList.scanResults;
    // let selectedEon = parseInt(settings.get("selectedEon")) || null;
    console.warn("Getting saved eons from settings...",scanResults);
    dispatch(resetScanNetwork());
    // dispatch(FOUND_scanNetwork());
    // if (scanResults && scanResults.length) {
    //   dispatch(SUCCESS_scanNetwork(scanResults,getState()));
    //   dispatch(selectEon(selectedEon));
    //   // if (selectedEon) {
    //   //   this.props.history.push(routes.EON_DETAIL);
    //   // }
    // }
  };
}
