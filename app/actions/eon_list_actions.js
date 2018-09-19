const app = require('electron').remote.app
const SSH = require('node-ssh');
const RSAKey = require('rsa-key');
const mkdirp = require("mkdirp");
import path from 'path';
import fs from 'fs';
const netList = require('network-list');
const dns = require("dns"); 
import settings from 'electron-settings';
import * as types from '../constants/eon_list_action_types'

// SSH ACTION CREATORS
export function BEGIN_connectSSH() {
  return {
    types: types.CONNECT_SSH
  }
}

export function SUCCESS_connectSSH() {
  return {
    types: types.CONNECT_SSH_SUCCESS
  }
}

export function FAIL_connectSSH(err) {
  return {
    types: types.CONNECT_SSH_FAIL,
    payload: {
      err
    }
  }
}

export function BEGIN_sshCommand() {
  return {
    types: types.SSH_COMMAND
  }
}

export function SUCCESS_sshCommand() {
  return {
    types: types.SSH_COMMAND_SUCCESS
  }
}

export function RESPONSE_sshCommand(stdout,stderr) {
  return {
    types: types.SSH_COMMAND_RESPONSE,
    payload: {
      stderr,
      stdout
    }
  }
}

export function FAIL_sshCommand(err) {
  return {
    types: types.SSH_COMMAND_FAIL,
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

export function SUCCESS_scanNetwork(results,state) {
  settings.set("scanResults",results);
  return {
    type: types.SCAN_NETWORK_SUCCESS,
    payload: {
      results
    }
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

export function NO_FOUND_scanNetwork(err) {
  return {
    type: types.SCAN_NETWORK_NOT_FOUND,
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
          // console.log(chunk.toString('utf8'));
          stdErr(chunk.toString('utf8'));
        },
      });
    });
  };
}

export function sendCommand(eon, command, commandArgs = []) {
  const privateKey = getPrivateKey();
  const sshClient = new SSH();
  // console.log("Connecting...");
  return sshClient.connect({
    host: eon.ip,
    username: 'root',
    port: 8022,
    privateKey: privateKey
  }).then(() => {
    return sshClient.execCommand(command, commandArgs, {
      cwd: '/'
    });
  });
}

export function scanNetwork() {
  return (dispatch, getState) => {
    dispatch(BEGIN_scanNetwork());
    let found = false;

      netList.scanEach({}, (err, obj) => {
        console.log(obj);
        
        if (obj.vendor === "OnePlus Technology (Shenzhen) Co., Ltd") {
          dispatch(SUCCESS_scanNetwork([obj],getState()));
          found = true;
        }
      });
  };
}

export function selectEon(index) {
  return (dispatch, getState) => {
    dispatch(SELECT_EON(index));
  };
}
export function addManually(ip_address) {
  return (dispatch, getState) => {
    dispatch(SUCCESS_scanNetwork([
      {
        ip: ip_address,
        mac: "Unknown"
      }
    ],getState()));
    dispatch(SELECT_EON(0));
  };
}

export function retrieveEonFromSettings() {
  return (dispatch, getState) => {
    let scanResults = settings.get("scanResults");
    if (scanResults && scanResults.length) {
      dispatch(SUCCESS_scanNetwork([
        settings.get("selectedEon")
      ],getState()));
      dispatch(SELECT_EON(0));
    }
    
  };
}
