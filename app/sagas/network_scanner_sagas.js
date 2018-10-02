import { all, take, call, fork, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import IpUtil from "ip";
import * as eonListTypes from '../constants/eon_list_action_types';
import * as types from '../constants/network_scanner_action_types';
import * as networkScannerActions from '../actions/network_scanner_actions';
import * as networkActions from '../actions/network_connection_actions';
import * as eonListActions from '../actions/eon_list_actions';

const arp = require('node-arp');
const evilscan = require('evilscan');

function getScanner(cidrStr) {
  const scanner = new evilscan({
    target: cidrStr,
    port:'8022',
    status:'O'
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

function fetchMacAddress(action) {
  console.log("fetching mac address: ",action);
  return new Promise((resolve,reject) => {
    arp.getMAC(action.payload.ip, function(err, mac) {
      if (!err) {
        resolve(mac);
      } else {
        reject(err);
      }
    });
  });
}

function* getResultInfo(action) {
  let mac_address;
  console.warn("Starting getResultInfo",action);
  yield put(networkScannerActions.MAC_ADDRESS_REQUEST());
  try {
    mac_address = yield call(fetchMacAddress,action);
    yield put(networkScannerActions.MAC_ADDRESS_SUCCESS(mac_address));
  } catch (e) {
    yield put(networkScannerActions.MAC_ADDRESS_ERROR(e));
  }
}

export function* createScannerEventChannel(scanner) {
  return eventChannel(emit => {
    const scanError = (data) => {
      emit(networkScannerActions.FAIL_scanNetwork(new Error(data.toString())));
    };
    
    const scanResult = (data) => {
      emit(networkScannerActions.RESULT_scanNetwork(data));
    };
    
    const scanProgress = (data) => {
      emit(networkScannerActions.PROGRESS_scanNetwork(data));
    };
    
    const scanComplete = () => {
      emit(networkScannerActions.COMPLETE_scanNetwork());
    };

    scanner.on('result', scanResult)
    scanner.on('progress', scanProgress)
    scanner.on('error', scanError)
    scanner.on('done', scanComplete)
    return () => {
      // This is a handler to uncreateScannerEventChannel.
    };
  });
}

function* scanNetwork() {
  const ip = IpUtil.address();
  let ips = networkActions.getIpsForScan(ip);
  
  ips = ips.map((ip) => { return `${ip}.0/24` });
  const scanner = yield call(getScanner, ips[0]);
  yield fork(read, scanner);
}

// EXPORT ROOT SAGA
export function* scannerSagas() {
  yield all([
    yield takeLatest(types.SCAN_NETWORK, scanNetwork),
    yield takeEvery(types.SCAN_NETWORK_RESULT, getResultInfo)
  ]);
}