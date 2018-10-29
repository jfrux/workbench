import { all, take, call, join, fork,spawn, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import IpUtil from "ip";
import arp from 'node-arp';
import * as routes from '../constants/routes.json';
import * as eonListTypes from '../constants/eon_list_action_types';
import * as types from '../constants/network_scanner_action_types';
import * as networkConnectionTypes from '../constants/network_connection_action_types';
import * as networkScannerActions from '../actions/network_scanner_actions';
import * as networkActions from '../actions/network_connection_actions';
import * as eonListActions from '../actions/eon_list_actions';
import * as eonDetailActions from '../actions/eon_detail_actions';
import evilscan from 'evilscan';
function revisedRandId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

function getScanner(cidrStr) {
  const scanner = new evilscan({
    target: cidrStr,
    port:'8022',
    status:'TROU'
  });
  return scanner;
}

function* read(scanner) {
  const channel = yield call(createScannerEventChannel, scanner);
  scanner.run();
  while (true) {
    let action = yield take(channel);
    yield put(action);
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

export function* createScannerEventChannel(scanner) {
  return eventChannel(emit => {
    const scanError = (data) => {
      emit(networkScannerActions.FAIL_scanNetwork(data.toString()));
    };
    // let i = 0;
    const scanResult = (data) => {
      // console.warn("foundData:",data);
      // data.status = "open";
      // i = i+1;
      // data.mac = "00:00:00:00:" + i;
      // {ip: "10.168.4.125", port: 8022, status: "open"}
      // console.log("Scan Result:",data)
      emit(networkScannerActions.RESULT_scanNetwork(data));
    };
    
    const scanComplete = () => {
      emit(networkScannerActions.PARTIALCOMPLETE_scanNetwork());
      emit(END);
    };

    scanner.on('result', scanResult);
    scanner.on('error', scanError);
    scanner.on('done', scanComplete);
    return () => {
      // This is a handler to uncreateScannerEventChannel.
      // console.warn("Scan done.");
    };
  });
}
function* scan(ip) {
  
}
function* cleanUnresolvedEons() {
  const { eonList } = yield select();
  const { eons } = eonList; 
  let cleanEonsList = {};
  Object.keys(eons).filter(key => { 
    const eon = eons[key];
    return eon.mac;
  }).forEach((key) => {
    cleanEonsList[key] = eons[key];
  });
  yield put({type: eonListTypes.CLEAR_UNRESOLVED_EONS, payload: cleanEonsList});
}

function* scanNetwork() {
  yield call(cleanUnresolvedEons);
  const ip = IpUtil.address();
  let ips = [];
  let ipRange = yield networkActions.getIpsForScan(ip);
  // ips = ips.map((ip) => { return `${ip}.0`; });
  // ips.push(ipRange[0]+'.0/24');
  ips = ips.concat(networkActions.getIpList(ipRange[1]+'.0',ipRange[2]+'.0'));
  
  // console.warn("ips",ips);
  yield put(networkScannerActions.updateScanCount(6072));
  
  yield all(ips.map(function * (ip) {
    const scanner = new evilscan({
      target: ip,
      port:'8022',
      status:'TROU'
    });
    yield call(read, scanner);
  }));
}

function* handleAddEon(action) {
  const { eonList } = yield select();
  const { eons } = eonList; 
  let { payload } = action;
  let randomId = revisedRandId();
  
  let newEon = {};
  // console.warn("Attempting to add eon: ", action);
  yield put(eonListActions.ADDING_EON());
  try {
    if (!payload.mac) {
      const mac_address = yield call(fetchMacAddress, payload);
      payload = {
        ...payload,
        mac: mac_address
      };
    }
    
    let existingEons = Object.keys(eons).filter((key) => {
      const eon = eons[key];
      return eon.mac === payload.mac;
    });

    if (existingEons.length > 0) {
      let topEonKey = existingEons[0];
      newEon[topEonKey] = {
        ...eons[topEonKey],
        ip: payload.ip,
        addStatus: 1
      };
      yield put(eonListActions.ADD_EON_ALREADY_EXISTS(newEon));
      yield put(networkScannerActions.REMOVE_SCANNED_RESULT(payload.id));
    } else {
      if (!payload.id) {
        newEon[randomId] = {
          ...payload,
          id: randomId,
          addStatus: 1
        };
      }
      yield put(eonListActions.ADD_EON_SUCCESS(newEon));
      yield put(networkScannerActions.REMOVE_SCANNED_RESULT(payload.id));
    }
  } catch (e) {
    if (!payload.id) {
      newEon[randomId] = {
        ...payload,
        id: randomId,
        addStatus: 0
      };
    }
    let addingEon = newEon[randomId];
    let existingEons = Object.keys(eons).filter((key) => {
      const eon = eons[key];
      return eon.ip === addingEon.ip;
    });
    if (existingEons.length > 0) {
      yield put(eonListActions.ADD_EON_FAILED());
      // yield put(eonListActions.ADD_EON_ALREADY_EXISTS(newEon));
    } else {
      yield put(eonListActions.ADD_EON_SUCCESS(newEon));
    }
  }
}
function* handleProgress() {
  const { networkScanner } = yield select();
  const { progress } = networkScanner;
  
  if (progress) {
    
  }

  yield put(networkScannerActions.COMPLETE_scanNetwork());
}
function* handleConnected(action) {
  const { router } = yield select();

  if (router.location.pathname !== routes.EON_DETAIL) {
    yield put(eonListActions.RESET_ERROR());
    yield put(networkScannerActions.BEGIN_scanNetwork());
  }
}
// EXPORT ROOT SAGA
export function* scannerSagas() {
  yield all([
    takeLatest(networkConnectionTypes.CONNECTED, handleConnected),
    takeLatest(eonListTypes.ADD_EON, handleAddEon),
    takeEvery(types.SCAN_NETWORK_RESULT, handleAddEon),
    takeEvery(types.SCAN_NETWORK_PROGRESS,handleProgress),
    takeLatest(types.SCAN_NETWORK, scanNetwork)
  ]);
}