import { all, take, call, fork, put, takeLatest, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import IpUtil from "ip";
import * as eonListTypes from '../constants/eon_list_action_types';
import * as types from '../constants/network_scanner_action_types';
import * as networkScannerActions from '../actions/network_scanner_actions';
import * as networkActions from '../actions/network_connection_actions';
import * as eonListActions from '../actions/eon_list_actions';

const evilscan = require('evilscan');

function getScanner(cidrStr) {
  const scanner = new evilscan({
    target: cidrStr,
    port:'8022',
    status:'TROU', // Timeout, Refused, Open, Unreachable
    banner:true
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
    yield takeLatest(types.SCAN_NETWORK, scanNetwork)
  ]);
}