import settings from 'electron-settings';
const app = require('electron').remote.app;
const RSAKey = require('rsa-key');
const mkdirp = require("mkdirp");
import path from 'path';
import fs from 'fs';
import * as types from '../constants/eon_detail_action_types';
import * as commands from '../constants/commands.json';

const SSH = require('node-ssh');
import * as vehicle_connection_statuses from '../constants/vehicle_connection_statuses.json';
// ACTION CREATORS
let pollerId;
export function BEGIN_install() {
  // console.log("dispatched BEGIN_scanNetwork");

  return {
    type: types.INSTALL
  };
}

export function SUCCESS_install() {
  return {
    type: types.INSTALL_SUCCESS
  };
}

export function FAIL_install(err) {
  return {
    type: types.INSTALL_FAIL,
    payload: {
      err
    }
  };
}

export function BEGIN_uninstall() {
  // console.log("dispatched BEGIN_scanNetwork");

  return {
    type: types.UNINSTALL
  };
}

export function SUCCESS_uninstall() {
  return {
    type: types.UNINSTALL_SUCCESS
  };
}

export function FAIL_uninstall(err) {
  return {
    type: types.UNINSTALL_FAIL,
    payload: {
      err
    }
  };
}

const limitedLogArray = function(length) {
  var array = new Array();
  array.push = function () {
    if (this.length >= length) {
      this.shift();
    }
    return Array.prototype.push.apply(this,arguments);
  };
  return array;
};

function testJSON(text){
  if (typeof text!=="string"){
      return false;
  }
  try{
      JSON.parse(text);
      return true;
  }
  catch (error){
      return false;
  }
}

// AUTH REQUEST
export function AUTH_REQUEST() {
  return {
    type: types.AUTH_REQUEST
  };
}
export function AUTH_REQUEST_SUCCESS(authResponse) {
  authResponse.commaUser = JSON.parse(authResponse.commaUser);
  authResponse.googleUser = JSON.parse(authResponse.googleUser);
  return {
    type: types.AUTH_REQUEST_SUCCESS,
    payload: authResponse
  };
}
export function AUTH_REQUEST_FAIL(error) {
  return {
    type: types.AUTH_REQUEST_FAIL,
    payload: {
      error
    }
  };
}

export function CLOSE_REQUEST_EON_STATE() {
  return {
    type: types.EON_STATE_CLOSE
  };
}

export function OPEN_REQUEST_EON_STATE() {
  return {
    type: types.EON_STATE
  };
}
export function RESPONSE_REQUEST_EON_STATE(eonState, state) {
  return {
    type: types.EON_STATE_RESPONSE,
    payload: eonState
  };
}
export function FAIL_REQUEST_EON_STATE(error) {
  return {
    type: types.EON_STATE_FAIL,
    payload: {
      error
    }
  };
}

export function GET_FINGERPRINT() {
  return {
    type: types.GET_FINGERPRINT
  };
}
export function RESPONSE_GET_FINGERPRINT(fingerprint, state) {
  // console.warn("fingerprint",fingerprint);
  return {
    type: types.GET_FINGERPRINT_RESPONSE,
    payload: {
      // fingerprint: fingerprint,
      fingerprintString: "[{\n" + Object.keys(fingerprint).sort((a, b) => { return parseInt(a)-parseInt(b);}).map((key) => { let fgpiece = fingerprint[key]; return `${key}: ${fgpiece}`;}).join(", ") + "\n}]"
    }
  };
}
export function FAIL_GET_FINGERPRINT(error) {
  return {
    type: types.GET_FINGERPRINT_FAIL,
    payload: {
      error
    }
  };
}
export function CLOSE_GET_FINGERPRINT() {
  return {
    type: types.GET_FINGERPRINT_CLOSE
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
  
  return key.exportKey('private', 'pem', 'pkcs1'); 
}
// SSH ACTION CREATORS
export function BEGIN_connectSSH() {
  return {
    type: types.CONNECT_SSH
  };
}

export function SUCCESS_connectSSH() {
  return {
    type: types.CONNECT_SSH_SUCCESS
  };
}

export function FAIL_connectSSH(err) {
  return {
    type: types.CONNECT_SSH_FAIL,
    payload: {
      err
    }
  };
}

export function BEGIN_sshCommand() {
  return {
    type: types.SSH_COMMAND
  };
}

export function SUCCESS_sshCommand() {
  return {
    type: types.SSH_COMMAND_SUCCESS
  };
}

export function RESPONSE_sshCommand(stdout,stderr) {
  return {
    type: types.SSH_COMMAND_RESPONSE,
    payload: {
      stderr,
      stdout
    }
  };
}

export function STOP_POLLING() {
  return {
    type: types.STOP_POLLING
  };
}

export function FAIL_sshCommand(err) {
  return {
    type: types.SSH_COMMAND_FAIL,
    payload: {
      err
    }
  };
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
      console.warn("Dispatching command:\n",command);
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

export function getAuth() {
  return (dispatch, getState) => {
    const { selectedEon, eons } = getState().eonList;
    const { auth } = getState().eonDetail;
    const eon = eons[selectedEon];

    dispatch(AUTH_REQUEST());
    setTimeout(() => {
      fetch(`http://${eon.ip}:8080/auth.json`)
        .then(res => {
          return res.json();
        })
        .then(json => {
          console.log("AUTH REQUEST",json);
          dispatch(AUTH_REQUEST_SUCCESS(json));
        }).catch((err) => {
          console.log("AUTH ERROR",err);
          if (!auth) {
            dispatch(getAuth());
            dispatch(AUTH_REQUEST_FAIL(err));
          }
        });
    },2000);
  };
}

export function fetchFingerprint() {
  return (dispatch, getState) => {
    const { selectedEon, eons } = getState().eonList;
    const eon = eons[selectedEon];
    const { polling } = getState().eonDetail;
    setTimeout(() => {
      fetch(`http://${eon.ip}:8080/fingerprint.json`)
        .then(res => {
          return res.json();
        })
        .then(json => {
          dispatch(RESPONSE_GET_FINGERPRINT(json, getState()));
          if (polling) {
            dispatch(fetchFingerprint());
          }
        }).catch((err) => {
          dispatch(FAIL_GET_FINGERPRINT(err));
          if (polling) {
            dispatch(fetchFingerprint());
          }
        });
    },2000);
  };
}
export function stopPolling() {
  dispatch(STOP_POLLING);
}
export function fetchEonState() {
  return (dispatch, getState) => {
    const { selectedEon, eons } = getState().eonList;
    const eon = eons[selectedEon];
    const { polling } = getState().eonDetail;
    setTimeout(() => {
      fetch(`http://${eon.ip}:8080/state.json`)
        .then(res => {
          return res.json();
        })
        .then(json => {
          dispatch(RESPONSE_REQUEST_EON_STATE(json, getState()));
          if (polling) {
            dispatch(fetchEonState(eon));
          }
        }).catch((err) => {
          dispatch(FAIL_REQUEST_EON_STATE(err));
          if (polling) {
            dispatch(fetchEonState(eon));
          }
        });
    },2000);
  };
}
export function install() {
  return (dispatch, getState) => {
    const { selectedEon, eons } = getState().eonList;

    const eon = eons[selectedEon];
    console.warn("Starting Api install...");
    dispatch(BEGIN_install());
    dispatch(sendCommand(eon, commands.INSTALL_API, [], (resp) => {
      console.info("Installing...", resp);

      app.sshClient.dispose();
      dispatch(SUCCESS_install());
      dispatch(fetchEonState());
      dispatch(fetchFingerprint());
      
      console.warn("API Now Running on EON");
    }, (err) => {
      console.warn("Error was thrown while installing...");
    }));
    // app.installClient = new SSH();
    // dispatch(BEGIN_install());
  };
}

export function uninstall() {
  return (dispatch, getState) => {
    const { selectedEon, eons } = getState().eonList;
    const eon = eons[selectedEon];
    console.warn("Starting Api UNINSTALL...");
    dispatch(BEGIN_uninstall());
    dispatch(sendCommand(eon, commands.UNINSTALL_API, [], (resp) => {
      console.info("UNINSTALLING...", resp);
      app.sshClient.dispose();
      dispatch(SUCCESS_uninstall());
      
      console.warn("API Uninstalled");
    }, (err) => {
      console.warn("Error was thrown while installing...");
    }));
    // app.installClient = new SSH();
    // dispatch(BEGIN_install());
  };
}

