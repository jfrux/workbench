import { all, take, call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
// const isPortReachable = require('is-port-reachable');
// const { ipcRenderer } = electron;
const evilscan = require('evilscan');
import rpc from '../rpc-client';
import arp from 'node-arp';
import * as routes from '../constants/routes.json';
import * as eonListTypes from '../constants/eon_list_action_types';
import * as types from '../constants/network_scanner_action_types';
import * as networkConnectionTypes from '../constants/network_connection_action_types';
import * as networkScannerActions from '../actions/network_scanner_actions';
import * as eonListActions from '../actions/eon_list_actions';
// import Worker from 'worker-loader!../main/services/network-scanner.worker.js';
// import ping from 'net-ping';
// const path = require("path");
// const scanner = new Worker(path.resolve(process.execPath,"../../../../../Resources/app/network-scanner-worker.js"));
const verifyPort = (ip) => {
  return new Promise((resolve, reject) => {
    const scan = new evilscan({
      target: ip,
      port:'8022',
      status:'TROU'
    });
    scan.on('result', (data) => {
      console.log("Scanned ip...",data);
      resolve(data);
    });
    scan.on('error', (err) => {
      // console.log('Error:',err);
      // console.log(`[${ip}] Failed to scan ${ip}...`, err);
      reject(err);
    });
    scan.on('done', (data) => {
      // resolve(data);
    });

    scan.run();
  });
};
// const path = require("path");
// import connectSocket from "socket.io-client"


function createWebSocketConnection() {
  return new Promise((resolve,reject) => {
    // const scanner = new WebSocket('ws://127.0.0.1:12000');
    const ws = new WebSocket('ws://127.0.0.1:9020/');

    ws.addEventListener("open", (socket) => {
      console.log("Opened connection!");
      resolve(ws);
    });
    // resolve(ws);
  });
}
const delay = (ms) => new Promise (res => setTimeout(res, ms))
function revisedRandId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

function* createScanner() {
  console.log("[NETWORK_SCANNER] Creating socket");
  const socket = yield call(createWebSocketConnection);
  console.log("socket created:",socket);
  const channel = yield call(createScannerEventChannel, socket);
  // socket.send(types.SCAN_NETWORK, ips);
  // console.log("[NETWORK_SCANNER] Send IPC ",types.SCAN_NETWORK, ips);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* createScannerEventChannel(socket) {
  console.log("[NETWORK_SCANNER] createScannerEventChannel",socket);
  return eventChannel(emit => {

    const scanError = (data) => {
      console.log("[NETWORK_SCANNER] scanError",data);
      emit(networkScannerActions.FAIL_scanNetwork(data.toString()));
    };

    const scanResult = (data) => {
      console.log("[NETWORK_SCANNER] scanResult",data);
      emit(networkScannerActions.RESULT_scanNetwork(data));
    };

    const scanPartialComplete = (data) => {
      console.log("[NETWORK_SCANNER] scanPartialComplete",data);
      emit(networkScannerActions.PARTIALCOMPLETE_scanNetwork(data));
    };

    const scanComplete = () => {
      console.log("[NETWORK_SCANNER] scanComplete");
      emit(networkScannerActions.COMPLETE_scanNetwork());
      emit(END);
    };

    // const onPing = (event) => {
    //   // puts event payload into the channel
    //   // this allows a Saga to take this payload from the returned channel
    //   emit(event.payload)
    // }
    // const onError = (err) => {
    //   console.log("err!:)",err);
    // }
    const onMessage = (msg) => {
      // console.log(msg);
      const parsedMsg = JSON.parse(msg.data);
      const messageType = parsedMsg.type;
      const messagePayload = parsedMsg.payload;
      console.log("parsedMsg:", parsedMsg);
      switch (messageType) {
        case types.SCAN_NETWORK_RESULT:
          scanResult(messagePayload);
          break;
        case types.SCAN_NETWORK_PARTIAL_COMPLETE:
          scanPartialComplete();
          break;
        case types.SCAN_NETWORK_FAIL:
          scanError(messagePayload);
          break;
        case types.SCAN_NETWORK_COMPLETE:
          scanComplete();
      }
      // types.SCAN_NETWORK_RESULT, scanResult);
      // socket.addEventListener(types.SCAN_NETWORK_PARTIAL_COMPLETE, scanPartialComplete);
      // socket.addEventListener(types.SCAN_NETWORK_FAIL, scanError);
      // socket.addEventListener(types.SCAN_NETWORK_COMPLETE, scanComplete);
    }
    // socket.on('error', () => console.log('errored'));
    socket.onmessage = onMessage;
    socket.addEventListener('message', onMessage);
    // socket.addEventListener('ping', onPing);
    // socket.addEventListener('error', onError);

    // socket.postMessage(JSON.stringify({ type: types.SCAN_NETWORK}));
    socket.send(JSON.stringify({ type: types.SCAN_NETWORK }) );
    const unsubscribe = () => {
      // socket.removeEventHandler('ping', onPing);
      // socket.removeEventHandler('error', onError);
      // socket.removeEventHandler('message', onMessage);
    }

    // IPC sharing the same event type constants for clarity.


    return unsubscribe;
  });
}

function* cleanUnresolvedEons() {
  yield put({type: eonListTypes.CLEAR_UNRESOLVED_EONS});
}

function* scanNetwork() {
  console.log("[NETWORK_SCANNER] Starting scan...");
  console.log("[NETWORK_SCANNER] cleanUnresolvedEons");
  yield call(cleanUnresolvedEons);
  console.log("[NETWORK_SCANNER] CLEANED unresolved");
  console.log("[NETWORK_SCANNER] Spawning createScanner / ipcRenderer");
  yield call(createScanner);
  console.log("[NETWORK_SCANNER] Spawned createScanner / ipcRenderer");
}

function* handleAddEon(action) {
  const { eonList } = yield select();
  const { unresolvedEons } = eonList;
  let { payload } = action;
  let randomId = revisedRandId();
  console.warn(`[NETWORK_SCANNER] handleAddEon(${JSON.stringify(action)})`);

  let newEon = {};

  console.warn(`[NETWORK_SCANNER] Adding EON...`);
  yield put(eonListActions.ADDING_EON());
  let existingEons = Object.keys(unresolvedEons).filter((key) => {
    const eon = unresolvedEons[key];
    const eonExists = eon.ip === payload.ip;

    console.warn(`[NETWORK_SCANNER] Checking if EON already exists...`);

    if (eonExists) {
      console.warn(`[NETWORK_SCANNER] EON Exists in unresolvedEons list...`);
    }
    return eonExists;
  });

  if (existingEons.length > 0) {

    let topEonKey = existingEons[0];
    console.warn(`[NETWORK_SCANNER] Handling existing EON (id: ${topEonKey})...`);
    newEon = {
      ...unresolvedEons[topEonKey],
      ip: payload.ip,
      addStatus: 0
    };
    console.warn(`[NETWORK_SCANNER] Dispatching ADD_EON_ALREADY_EXISTS (id: ${topEonKey})...`,newEon);
    yield put(eonListActions.ADD_EON_ALREADY_EXISTS(newEon));
    console.warn(`[NETWORK_SCANNER] Removing scanned result (id: ${payload.id})`);
    yield put(networkScannerActions.REMOVE_SCANNED_RESULT(payload.id));
  } else {
    console.warn(`[NETWORK_SCANNER] EON did not already exist...`);
    if (payload && !payload.id) {
      console.warn(`[NETWORK_SCANNER] Payload didn't have an id...`);
      newEon = {
        ...payload,
        id: randomId,
        addStatus: 0
      };
      console.warn(`[NETWORK_SCANNER] Assigned ID to new EON...`, newEon);
    }
    console.warn(`[NETWORK_SCANNER] Dispatching ADD_EON_SUCCESS...`, newEon);
    yield put(eonListActions.ADD_EON_SUCCESS(newEon));
    console.warn(`[NETWORK_SCANNER] Dispatching REMOVE_SCANNED_RESULT...`, newEon);
    yield put(networkScannerActions.REMOVE_SCANNED_RESULT(payload.id));
  }
}

function* handleConnected(action) {
  const { router } = yield select();

  if (router.location.pathname !== routes.EON_DETAIL) {
    yield put(eonListActions.RESET_ERROR());
    yield put(networkScannerActions.BEGIN_scanNetwork());
  }
}

function fetchMacAddress(eon) {
  console.warn(`[NETWORK_SCANNER] fetchMacAddress(eon)`,eon);
  return new Promise((resolve,reject) => {
    arp.getMAC(eon.ip, function(err, mac) {
      if (!err) {
        resolve(mac);
      } else {
        reject(new Error("Failed to get Mac Address: Unknown host"));
      }
    });
  });
}

function* resolveEon(action) {
  const eon = action.payload.data;
  let updatedEon = JSON.parse(JSON.stringify(eon));

  try {
    console.warn("[NETWORK_SCANNER] resolveEon action",action);
    console.warn("[NETWORK_SCANNER] eon.ip:",eon.ip);
    const mac = yield call(fetchMacAddress,eon);

    if (mac) {
      yield put(eonListActions.RESOLVED_EON(JSON.parse(JSON.stringify(updatedEon)), mac));
      yield put(eonListActions.REMOVE_UNRESOLVED_EON(JSON.parse(JSON.stringify(updatedEon))));
    } else {
      updatedEon.addStatus = 2;
      yield put(eonListActions.UPDATE_UNRESOLVED(JSON.parse(JSON.stringify(updatedEon))));
      // console.warn("UPDATE01");
    }
  } catch (e) {
    updatedEon.addStatus = 2;
    yield put(eonListActions.UPDATE_UNRESOLVED(JSON.parse(JSON.stringify(updatedEon))));
    console.warn("UPDATE02");
  // } finally {
  //   yield put(eonListActions.UPDATE_UNRESOLVED(JSON.parse(JSON.stringify(updatedEon))));
  //   // console.warn("UPDATE03");
  }
}

// function pingEon(eon) {
//   // console.warn("Pinging EON",eon);
//   return new Promise((resolve,reject) => {
//     try {
//       var session = ping.createSession({
//         networkProtocol: ping.NetworkProtocol.IPv4,
//         packetSize: 16,
//         retries: 1,
//         sessionId: (process.pid % 65535),
//         timeout: 5000,
//         ttl: 128
//       });

//       session.pingHost(eon.ip, function pingEon(error, target) {
//         if (error) {
//           console.warn("No response from EON",error.toString());
//           reject(eon, "Could not ping EON...", error.toString());
//         } else {
//           resolve(true);
//           // console.warn("Response found for EON",eon);
//           session.close();
//         }
//       });
//     } catch (e) {
//       console.warn("Cannot ping on this platform...");
//       resolve(true);
//     }
//   });
// }
function* handlePingEon(eon) {
  console.warn(`[NetworkScanner] Pinging IP address to check validity`,eon);
  // const eon = action.payload.data;
  yield put(eonListActions.PING_EON(eon));
  try {
    const verifiedPort = yield call(verifyPort,eon.ip);
    console.log(`[NetworkScanner] ${eon.ip}:8022 is port reachable?`,verifiedPort);
    if (verifiedPort) {
      console.warn(`[NetworkScanner] Response of ping: ${JSON.stringify(verifiedPort)}`);
      if (verifiedPort.status === "open") {
        yield put(eonListActions.PING_EON_SUCCESS(eon));
      } else {
        yield put(eonListActions.PING_EON_FAILED(eon));
      }
    } else {
      yield put(eonListActions.PING_EON_FAILED(eon));
    }
  } catch (e) {
    console.warn("Error pinging EON:",e.message);
    yield put(eonListActions.PING_EON_FAILED(eon));
  }
}

function* pingEons() {
  const state = yield select();
  const { eonList,networkScanner } = state;
  const { foundCount } = networkScanner;
  const { eons, unresolvedEons } = eonList;
  let eonKeys = Object.keys(eons);
  yield all(eonKeys.map((key) => {
    const eon = eons[key];
    return handlePingEon(eon);
  }));
  try {
    rpc.emit('notify',{ title: 'Workbench finished scanning!', body: `Found ${foundCount} EON on the network.` });
  } catch (e) {
    console.warn("Cannot send notification right now...");
  }
  // console.warn("Pinging EONS:",eonKeys);

  // yield put(networkScannerActions.PINGED_EONS());
}

function* cleanUp() {
  const state = yield select();
  const { eonList } = state;
  const { eons, unresolvedEons } = eonList;
  let eonKeys = Object.keys(eons);
  let unresolvedEonKeys = Object.keys(unresolvedEons);
  let eonIps = eonKeys.map((key) => {
    const eon = eons[key];
    return eon.ip;
  });
  unresolvedEonKeys.forEach(function * (key) {
    const unresolvedEon = unresolvedEons[key];
    if (eonIps.includes(unresolvedEon.ip)) {
      yield put(eonListActions.REMOVE_UNRESOLVED_EON(JSON.parse(JSON.stringify(unresolvedEon))));
    }
    // console.warn("cleaning up eon:",eon);
  });
}
function* handleDoPingEon(action) {
  yield call(handlePingEon,action.payload.data);
}
// EXPORT ROOT SAGA
export function* scannerSagas() {
  yield all([
    takeLatest(networkConnectionTypes.CONNECTED, handleConnected),
    takeEvery(eonListTypes.ADD_EON, handleAddEon),
    takeEvery(eonListTypes.ADD_EON_SUCCESS, resolveEon),
    takeEvery(types.SCAN_NETWORK_RESULT, handleAddEon),
    takeLatest(types.SCAN_NETWORK, scanNetwork),
    takeEvery(types.SCAN_NETWORK_COMPLETE, pingEons),
    takeLatest(eonListTypes.DO_PING_EON, handleDoPingEon),
    takeLatest(types.PINGED_EONS, cleanUp)
  ]);
}
