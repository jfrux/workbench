import { all, take, call, join, fork,spawn, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import electron from 'electron';
const { ipcRenderer } = electron;
import rpc from '../rpc-client';
import arp from 'node-arp';
import * as routes from '../constants/routes.json';
import * as eonListTypes from '../constants/eon_list_action_types';
import * as types from '../constants/network_scanner_action_types';
import * as networkConnectionTypes from '../constants/network_connection_action_types';
import * as networkScannerActions from '../actions/network_scanner_actions';
import * as eonListActions from '../actions/eon_list_actions';
import ping from 'net-ping';

function revisedRandId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}


function* createScanner(scanner, ips) {
  const channel = yield call(createScannerEventChannel, scanner);
  scanner.send(types.SCAN_NETWORK, ips);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

export function* createScannerEventChannel(scanner) {
  return eventChannel(emit => {
    const scanError = (data) => {
      emit(networkScannerActions.FAIL_scanNetwork(data.toString()));
    };

    const scanResult = (evt, data) => {
      emit(networkScannerActions.RESULT_scanNetwork(data));
    };

    const scanPartialComplete = (evt, data) => {
      emit(networkScannerActions.PARTIALCOMPLETE_scanNetwork(data));
    };
    
    const scanComplete = () => {
      emit(networkScannerActions.COMPLETE_scanNetwork());
      emit(END);
    };

    // IPC sharing the same event type constants for clarity.
    scanner.on(types.SCAN_NETWORK_RESULT, scanResult);
    scanner.on(types.SCAN_NETWORK_PARTIAL_COMPLETE, scanPartialComplete);
    scanner.on(types.SCAN_NETWORK_FAIL, scanError);
    scanner.on(types.SCAN_NETWORK_COMPLETE, scanComplete);
    return () => {
      // This is a handler to uncreateScannerEventChannel.
      // console.warn("Scan done.");
      scanner.removeListener(types.SCAN_NETWORK_RESULT, scanResult);
      scanner.removeListener(types.SCAN_NETWORK_PARTIAL_COMPLETE, scanPartialComplete);
      scanner.removeListener(types.SCAN_NETWORK_FAIL, scanError);
      scanner.removeListener(types.SCAN_NETWORK_COMPLETE, scanComplete);
    };
  });
}

function* cleanUnresolvedEons() {
  yield put({type: eonListTypes.CLEAR_UNRESOLVED_EONS});
}

function* scanNetwork() {
  yield call(cleanUnresolvedEons);
  yield spawn(createScanner, ipcRenderer);
}

function* handleAddEon(action) {
  const { eonList } = yield select();
  const { unresolvedEons } = eonList; 
  let { payload } = action;
  let randomId = revisedRandId();
  
  let newEon = {};
  yield put(eonListActions.ADDING_EON());
  
  let existingEons = Object.keys(unresolvedEons).filter((key) => {
    const eon = unresolvedEons[key];
    return eon.ip === payload.ip;
  });

  if (existingEons.length > 0) {
    let topEonKey = existingEons[0];
    newEon = {
      ...unresolvedEons[topEonKey],
      ip: payload.ip,
      addStatus: 0
    };
    yield put(eonListActions.ADD_EON_ALREADY_EXISTS(newEon));
    yield put(networkScannerActions.REMOVE_SCANNED_RESULT(payload.id));
  } else {
    if (!payload.id) {
      newEon = {
        ...payload,
        id: randomId,
        addStatus: 0
      };
    }
    yield put(eonListActions.ADD_EON_SUCCESS(newEon));
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
    // console.warn("UPDATE02");
  } finally {
    // yield put(eonListActions.UPDATE_UNRESOLVED(JSON.parse(JSON.stringify(updatedEon))));
    // console.warn("UPDATE03");
  }
}

function pingEon(eon) {
  // console.warn("Pinging EON",eon);
  return new Promise((resolve,reject) => {
    try {
      var session = ping.createSession({
        networkProtocol: ping.NetworkProtocol.IPv4,
        packetSize: 16,
        retries: 1,
        sessionId: (process.pid % 65535),
        timeout: 5000,
        ttl: 128
      });

      session.pingHost(eon.ip, function pingEon(error, target) {
        if (error) {
          console.warn("No response from EON",error.toString());
          reject(eon, "Could not ping EON...", error.toString());
        } else {
          resolve(true);
          // console.warn("Response found for EON",eon);
          session.close();
        }
      });
    } catch (e) {
      console.warn("Cannot ping on this platform...");
      resolve(true);
    }
  });
}

function* handlePingEon(action) {
  const eon = action.payload.data;
  yield put(eonListActions.PING_EON(eon));
  try {
    const pingResp = yield call(pingEon, eon);
    console.warn(pingResp);
    if (pingResp) {
      yield put(eonListActions.PING_EON_SUCCESS(eon));
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
  try {
    rpc.emit('notify',{title: 'Workbench finished scanning!',body: `Found ${foundCount} EON on the network.`});
  } catch (e) {
    console.warn("Cannot send notification right now...");
  }
  // console.warn("Pinging EONS:",eonKeys);
  yield all(eonKeys.map(function * (key) {
    const eon = eons[key];
    yield put(eonListActions.DO_PING_EON(eon));
  }));
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
// EXPORT ROOT SAGA
export function* scannerSagas() {
  yield all([
    takeLatest(networkConnectionTypes.CONNECTED, handleConnected),
    takeLatest(eonListTypes.ADD_EON, handleAddEon),
    takeLatest(eonListTypes.ADD_EON_SUCCESS, resolveEon),
    takeEvery(types.SCAN_NETWORK_RESULT, handleAddEon),
    takeLatest(types.SCAN_NETWORK, scanNetwork),
    takeEvery(types.SCAN_NETWORK_COMPLETE, pingEons),
    takeLatest(eonListTypes.DO_PING_EON, handlePingEon),
    takeLatest(types.PINGED_EONS, cleanUp)
  ]);
}