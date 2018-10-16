import { all, take, call, fork, race,  put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { delay, eventChannel } from 'redux-saga';
import { remote } from 'electron';
const { app } = remote;
import mkdirp from 'mkdirp';
import RSAKey from 'rsa-key';
import path from 'path';
import fs from 'fs';
import * as routes from '../constants/routes.json';
import SSH from 'node-ssh';
// import Sockette from 'sockette';
import ReconnectingWebSocket from 'reconnecting-websocket';
// import WebSocket from 'ws';
import * as types from '../constants/eon_detail_action_types';
import * as eonListTypes from '../constants/eon_list_action_types';
import * as eonListActions from '../actions/eon_list_actions';
import * as eonDetailActions from '../actions/eon_detail_actions';
import * as endpoints from '../constants/comma_endpoints.json';
import * as commands from '../constants/commands.json';

function* failedSshConnection() {
  // console.warn("failedSshConnection Saga");
  yield put(eonListActions.DESELECT_EON);
}

function apiRequest(endpoint,state) {
  const { eonList, eonDetail } = state;
  const { auth } = eonDetail;
  const { commaUser, isLoggedIn } = auth;
  const { accessToken } = commaUser;
  
  return fetch(`${endpoints.Api.Base}${endpoints.Api.Endpoint[endpoint]}`,{
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, cors, *same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, same-origin, *omit
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": `JWT ${accessToken}`
          // "Content-Type": "application/x-www-form-urlencoded",
      }
    });
}

function* fetchApiRequest(endpoint) {
  const state = yield select();
  yield put(eonDetailActions.API_REQUEST());

  try {
    const req = yield call(apiRequest,endpoint,state);
    const res = yield req.json();
    if (endpoint === 'routes') {
      endpoint = 'drives';
    }
    yield put(eonDetailActions.API_REQUEST_SUCCESS(endpoint, res));
  } catch(e) {
    yield put(eonDetailActions.API_REQUEST_FAIL(e));
  }
}

function fingerprintRequest(eon) {
  return fetch(`http://${eon.ip}:8080/fingerprint.json`);
}

function authRequest(eon) {
  return fetch(`http://${eon.ip}:8080/auth.json`);
}

function stateRequest(eon) {
  return fetch(`http://${eon.ip}:8080/state.json`);
}

function* fetchState() {
  const state = yield select();
  const { selectedEon, eons } = state.eonList;
  const { polling, stateRequestAttempts } = state.eonDetail;
  const eon = eons[selectedEon];

  yield put(eonDetailActions.OPEN_REQUEST_EON_STATE());
  try {
    const req = yield call(stateRequest,eon);
    const res = yield req.json();
    
    yield put(eonDetailActions.RESPONSE_REQUEST_EON_STATE(res));

    if (polling) {
      yield delay(1000);
      yield call(fetchState);
    }
  } catch(e) {
    if (polling && stateRequestAttempts <= 10) {
      yield delay(500);
      yield put(eonDetailActions.FAIL_REQUEST_EON_STATE(e));
    } else {
      yield put(eonDetailActions.FATAL_REQUEST_EON_STATE());
    }
  }
}

function* fetchAuth() {
  // console.warn("fetching auth...");
  const state = yield select();
  const { selectedEon, eons } = state.eonList;
  const eon = eons[selectedEon];
  yield put(eonDetailActions.AUTH_REQUEST());
  try {
    const req = yield call(authRequest,eon);
    const res = yield req.json();

    yield put(eonDetailActions.AUTH_REQUEST_SUCCESS(res));
  } catch(e) {
    yield delay(500);
    yield put(eonDetailActions.AUTH_REQUEST_FAIL(e));
  }
}

function* fetchFingerprint() {
  // console.warn("fetching fingerprint...");
  const state = yield select();
  const { selectedEon, eons } = state.eonList;
  const { polling, stateRequestAttempts } = state.eonDetail;
  const eon = eons[selectedEon];
  yield put(eonDetailActions.GET_FINGERPRINT());

  try {
    const req = yield call(fingerprintRequest,eon);
    const res = yield req.json();

    if (polling) {
      yield delay(1000);
      yield put(eonDetailActions.RESPONSE_GET_FINGERPRINT(res));
    }
  } catch(e) {
    if (polling) {
      yield delay(500);
      yield put(eonDetailActions.FAIL_GET_FINGERPRINT(e));
    }
  }
};

function* handleTabChange(action) {
  const tab = action.payload;
  switch (tab) {
    case "1":
      // return;
    case "2":
      //get routes
      yield call(fetchApiRequest,'routes');
      break;
    case "3":
      yield call(fetchApiRequest,'devices');
      break;
    case "4":
      yield call(fetchFingerprint);
      break;
  }
}

function sendCommand(eon, command, commandArgs = [], stdOut = () => {}, stdErr = () => {}) {
  const privateKey = getPrivateKey();
  console.log('sendCommand',arguments);
  app.sshClient = new SSH();
  return app.sshClient.connect({
    host: eon.ip,
    username: 'root',
    port: 8022,
    privateKey: privateKey
  }).then(() => {
    // console.warn("Dispatching command:\n",command);
    // console.warn("To EON:\n",eon);
    return app.sshClient.exec(command, commandArgs, {
      cwd: '/',
      onStdout(chunk) {
        // console.warn("stdOut:",chunk.toString('utf8'));
        stdOut(chunk.toString('utf8'));
      },
      onStderr(chunk) {
        // console.warn("stdErr:",chunk.toString('utf8'));
        stdErr(chunk.toString('utf8'));
      },
    });
  })
}
function getPrivateKey() {
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

  try {
    fs.chmodSync(filePath, '600');
  } catch (e) {
    console.warn("chmod failed on file ",filePath);
  }
  const key = new RSAKey(fs.readFileSync(filePath));
  
  return key.exportKey('private', 'pem', 'pkcs1'); 
}
function sendInstallCommand(eon) {
  console.warn("sendInstallCommand",eon);
  return new Promise((resolve,reject) => {
    sendCommand(eon, commands.INSTALL_API, [], (resp) => {
  
      app.sshClient.dispose();
      resolve(resp);
    }, (err) => {
      reject(err);
    }).catch((e) => {
      reject(e);
    })
  });
}

function* installWorkbenchApi() {
  const { eonList } = yield select();
  const { selectedEon, eons } = eonList;
  const eon = eons[selectedEon];
  console.warn("sendInstallCommand",sendInstallCommand);
  yield put(eonDetailActions.BEGIN_install(eon));
  const {installed, timeout} = yield race({
    installed: call(sendInstallCommand,eon),
    timeout: call(delay, 15000)
  });
  // const installed = true;
  try {
    if (installed) {
      // console.warn("Installed!");
      yield put(eonDetailActions.SUCCESS_install());
    } else {
      // console.warn("Timed out waiting to install");
      yield put(eonListActions.ADD_ERROR("Could not connect to EON"));
      yield put(eonDetailActions.FAIL_install(new Error("Install timed out...")));
    }
  } catch (e) {
    yield put(eonListActions.ADD_ERROR(e.message));
    yield put(eonDetailActions.FAIL_install(e));
  }
}

function* read(rws) {
  const channel = yield call(createEventChannel, rws);
  // scanner.run();
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

export function* createEventChannel(ws) {
  return eventChannel(emit => {
    const onOpen = () => {
      // console.warn("Connected!");
      emit({ type: types.CONNECTED });
    };
    const onClose = () => {
      // console.warn("Disconnected!");
      emit({ type: types.DISCONNECTED });
    };
    const onMessageReceived = (data) => {
      // console.warn("Received Message:", JSON.parse(data.data));
      emit({ type: types.MESSAGE, payload: JSON.parse(data.data) });
      // emit(eonDetailActions.RESPONSE_REQUEST_EON_STATE());
    };

    // console.log("Connecting to WS",`ws://${eon.ip}:4000`);
    ws.addEventListener('open', onOpen);
    ws.addEventListener('close', onClose);
    ws.addEventListener('message', onMessageReceived);
      // onopen: e => console.log('Connected!', e)
      // onmessage: e => onMessageReceived(e)
      // onreconnect: e => console.log('Reconnecting...', e)
      // onmaximum: e => console.log('Stop Attempting!', e)
      // onclose: e => console.log('Closed!', e)
      // onerror: e => console.log('Error:', e)
    return () => {
      // This is a handler to uncreateScannerEventChannel.
      ws.close();
    };
  });
}

function* connectWebSockets() {
  const { eonList } = yield select();
  const { selectedEon, eons } = eonList;
  const eon = eons[selectedEon];
  yield put({ type: types.CONNECT });
  const rws = new ReconnectingWebSocket(`ws://${eon.ip}:4000`, [], {
    // WebSocket,
    // connectionTimeout: 1000,
    // maxRetries: 10,
    // debug: false
  });
  try {
    yield fork(read, rws);

    while (true) {
      yield take(types.DISCONNECT);
      rws.close();
    }
  } catch (e) {
    // console.warn("Errors in check #1");
  }
  // ws.send('Hello, world!');
  // ws.json({type: 'ping'});
  // ws.close(); // graceful shutdown

  // Reconnect 10s later
  // setTimeout(ws.reconnect, 10e3);
}
// TODO: Build a mechanism to remove the need to reinstall each time.
// Possibly when development slows and is more stable we can add something that doesn't require updates unless something changes in Git.
function* routeWatcher(action) {
  const { payload } = action;
  const { pathname } = payload;
  const { eonList, eonDetail } = yield select();
  const { selectedEon, eons } = eonList;
  const { connected } = eonDetail;
  if (routes.EON_DETAIL === pathname) {
    // console.warn("IS DETAIL SCREEN", eons[selectedEon]);
    try {     
      yield call(installWorkbenchApi);
    } catch (e) {
      yield put(eonListActions.ADD_ERROR("Failed to establish a connection to EON: " + e.message));
      yield put(eonDetailActions.FAIL_install(e));
    }
  } else {
    // Not in EON_DETAIL screen... try to disconnect
    if (connected) {
      yield put({ type: types.DISCONNECT });
    }
  }
}

function* addEonListError() {
  yield put(eonListActions.ADD_ERROR("Failed to connect to your EON.  Sometimes due to network instability it can take longer than we were willing to wait.  If the problem persists, try rebooting EON."));
}

// EXPORT ROOT SAGA
export function* eonSagas() {
  // console.warn("types:",types);
  yield all([
    takeLatest("@@router/LOCATION_CHANGE",routeWatcher),
    takeEvery(types.CONNECT_FAILED,addEonListError),
    // takeEvery(types.INSTALL_SUCCESS,fetchState),
    takeEvery(types.INSTALL_SUCCESS,connectWebSockets),
    // takeLatest(types.AUTH_REQUEST_FAIL,fetchAuth),
    // takeLatest(types.EON_STATE_FAIL,fetchState),
    // takeLatest(types.GET_FINGERPRINT_FAIL,fetchFingerprint),
    takeLatest(types.CHANGE_TAB, handleTabChange)
  ]);
}