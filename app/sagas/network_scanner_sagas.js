import { all, take, call, join, fork,spawn, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import electron from 'electron';
const { ipcRenderer } = electron;
import arp from 'node-arp';
import * as routes from '../constants/routes.json';
import * as eonListTypes from '../constants/eon_list_action_types';
import * as types from '../constants/network_scanner_action_types';
import * as networkConnectionTypes from '../constants/network_connection_action_types';
import * as networkScannerActions from '../actions/network_scanner_actions';
import * as eonListActions from '../actions/eon_list_actions';

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
      console.warn("RESULT RECEIVED", data);
      emit(networkScannerActions.RESULT_scanNetwork(data));
    };

    const scanPartialComplete = (evt, data) => {
      // console.warn("foundData:",data);
      // data.status = "open";
      // i = i+1;
      // data.mac = "00:00:00:00:" + i;
      // {ip: "10.168.4.125", port: 8022, status: "open"}
      // console.log("Scan Result:",data)
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
  console.warn("Attempting to add eon: ", action);
  yield put(eonListActions.ADDING_EON());
  // try {
  // if (!payload.mac) {
  //   const mac_address = yield call(fetchMacAddress, payload);
  //   payload = {
  //     ...payload,
  //     mac: mac_address
  //   };
  // }
    
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
  // } catch (e) {
  //   if (!payload.id) {
  //     newEon[randomId] = {
  //       ...payload,
  //       id: randomId,
  //       addStatus: 0
  //     };
  //   }
  //   let addingEon = newEon[randomId];
  //   let existingEons = Object.keys(eons).filter((key) => {
  //     const eon = eons[key];
  //     return eon.ip === addingEon.ip;
  //   });
  //   if (existingEons.length > 0) {
  //     yield put(eonListActions.ADD_EON_FAILED());
  //     // yield put(eonListActions.ADD_EON_ALREADY_EXISTS(newEon));
  //   } else {
  //     yield put(eonListActions.ADD_EON_SUCCESS(newEon));
  //   }
  // }
}
// function* handleProgress() {
//   const { networkScanner } = yield select();
//   const { progress } = networkScanner;
  
//   if ((progress*100) >= 99) {
//     yield put(networkScannerActions.COMPLETE_scanNetwork());
//   }
// }
function* handleConnected(action) {
  const { router } = yield select();

  if (router.location.pathname !== routes.EON_DETAIL) {
    yield put(eonListActions.RESET_ERROR());
    yield put(networkScannerActions.BEGIN_scanNetwork());
  }
}

function fetchMacAddress(eon) {
  // console.log("fetching mac address: ",action);
  return new Promise((resolve,reject) => {
    // console.warn("Checking MAC of ",eon.ip);
    arp.getMAC(eon.ip, function(err, mac) {
      // console.warn("Mac Lookup Error:",err,arguments);
      if (!err) {
        resolve(mac);
      } else {
        reject(new Error("Failed to get Mac Address: Unknown host"));
      }
    });
  });
}

function* resolveEon(action) {
  console.warn("Resolving eon...",action);
  // const { eon } = this.props;
  const eonKey = Object.keys(action.payload)[0]
  const eon = action.payload[eonKey];
  let updatedEon = JSON.parse(JSON.stringify(eon));
  // console.log("fetching mac address: ",action);
  console.log("Checking MAC of ",eon.ip);

  try {
    const mac = yield call(fetchMacAddress,eon);

    if (mac) {
      yield put(eonListActions.RESOLVED_EON(JSON.parse(JSON.stringify(updatedEon)), mac));
      yield put(eonListActions.REMOVE_UNRESOLVED_EON(JSON.parse(JSON.stringify(updatedEon))));
    } else {
      updatedEon.addStatus = 2;
      yield put(eonListActions.UPDATE_UNRESOLVED(JSON.parse(JSON.stringify(updatedEon))));
    }
  } catch (e) {
    updatedEon.addStatus = 2;
    yield put(eonListActions.UPDATE_UNRESOLVED(JSON.parse(JSON.stringify(updatedEon))));
  }
}

// EXPORT ROOT SAGA
export function* scannerSagas() {
  yield all([
    takeLatest(networkConnectionTypes.CONNECTED, handleConnected),
    takeLatest(eonListTypes.ADD_EON, handleAddEon),
    takeLatest(eonListTypes.ADD_EON_SUCCESS, resolveEon),
    takeEvery(types.SCAN_NETWORK_RESULT, handleAddEon),
    takeLatest(types.SCAN_NETWORK, scanNetwork)
  ]);
}