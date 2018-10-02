import { all, take, call, fork, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import IpUtil from "ip";
const app = require('electron').remote.app;
const RSAKey = require('rsa-key');
const mkdirp = require("mkdirp");
import path from 'path';
import fs from 'fs';
import * as commands from '../constants/commands.json';

const SSH = require('node-ssh');
import * as eonListTypes from '../constants/eon_list_action_types';
import * as types from '../constants/network_scanner_action_types';
import * as networkScannerActions from '../actions/network_scanner_actions';
import * as networkActions from '../actions/network_connection_actions';
import * as eonListActions from '../actions/eon_list_actions';
import * as eonDetailActions from '../actions/eon_detail_actions';
const arp = require('node-arp');
const evilscan = require('evilscan');

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

    scanner.on('result', scanResult);
    scanner.on('progress', scanProgress);
    scanner.on('error', scanError);
    scanner.on('done', scanComplete);
    return () => {
      // This is a handler to uncreateScannerEventChannel.
    };
  });
}
function* checkSsh(ip) {
  const sshConn = new SSH();
  const privateKey = eonDetailActions.getPrivateKey();
  console.log("Checking ssh for " + ip);
  console.log("Dispatch check for ssh on " + ip);

  return sshConn.connect({
    host: ip,
    username: 'root',
    port: 8022,
    privateKey: privateKey
  });
}
// function* scan
function* scanNetwork() {
  const ip = IpUtil.address();
  let ips = yield networkActions.getIpsForScan(ip);
  console.log(ips);
  // evilscan logic
  ips = ips.map((ip) => { return `${ip}.0/24`; });
  const scanner = yield call(getScanner, `${ips[0]}/24`);
  // const scanner2 = yield call(getScanner, ips[1]);
  // const scanner3 = yield call(getScanner, ips[2]);
  yield fork(read, scanner);
  // yield fork(read, scanner2);
  // yield fork(read, scanner3);

  // ssh check logic
  // for (let ipItem of ips) {
  //   try {
  //     let result = yield fork(checkSsh,ipItem);
  //     console.warn(result.stdout);
  //     yield put(networkScannerActions.RESULT_scanNetwork({ ip: ipItem }))
  //   } catch (e) {
  //     yield put(networkScannerActions.PROGRESS_scanNetwork());
  //   }
  // }
  // yield Promise.all(ips.map((ip) => {
  //   console.log('Checking...',ip); 
  //   return call(eonDetailActions.checkSsh,ip); 
  // }));
  
}

// EXPORT ROOT SAGA
export function* scannerSagas() {
  yield all([
    yield takeLatest(types.SCAN_NETWORK, scanNetwork),
    yield takeEvery(types.SCAN_NETWORK_RESULT, getResultInfo)
  ]);
}