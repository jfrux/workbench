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

function revisedRandId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

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

function fetchMacAddress(eon) {
  // console.log("fetching mac address: ",action);
  return new Promise((resolve,reject) => {
    console.warn("Checking MAC of ",eon.ip);
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

function* getResultInfo(action) {
  const { networkScanner } = yield select();
  const { scanResults } = networkScanner;
  const { eon } = action.payload;
  const eonId = Object.keys(eon)[0]
  const eonObj = eon[eonId];
  let result = {};
  let mac_address;
  console.warn("Starting getResultInfo",action);
  yield put(networkScannerActions.MAC_ADDRESS_REQUEST());
  try {
    mac_address = yield call(fetchMacAddress,eonObj);
    result[eonId] = {
      ...scanResults[eonId],
      mac: mac_address
    };
    yield put(networkScannerActions.MAC_ADDRESS_SUCCESS(result));
  } catch (e) {
    yield put(networkScannerActions.MAC_ADDRESS_ERROR(e));
  }
}

export function* createScannerEventChannel(scanner) {
  return eventChannel(emit => {
    const scanError = (data) => {
      emit(networkScannerActions.FAIL_scanNetwork(data.toString()));
    };
    
    const scanResult = (data) => {
      emit(networkScannerActions.RESULT_scanNetwork(data));
    };
    
    const scanComplete = () => {
      emit(networkScannerActions.COMPLETE_scanNetwork());
    };

    scanner.on('result', scanResult);
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
  // console.log("Checking ssh for " + ip);
  // console.log("Dispatch check for ssh on " + ip);

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
  // console.log(ips);
  // evilscan logic
  ips = ips.map((ip) => { return `${ip}.0`; });
  // const scanner = yield call(getScanner, `${ips[0]}/24`);
  // const scanner2 = yield call(getScanner, ips[1]);
  const scanner = yield call(getScanner, ips[0] + '/23');
  try {
    yield fork(read, scanner);
  } catch (e) {
    console.warn("Errors in check #1");
  }

  // ssh check logic
  // for (let ipItem of ips) {
  //   try {
  //     let result = yield fork(checkSsh,ipItem);
  //     // console.warn(result.stdout);
  //     yield put(networkScannerActions.RESULT_scanNetwork({ ip: ipItem }))
  //   } catch (e) {
  //     yield put(networkScannerActions.PROGRESS_scanNetwork());
  //   }
  // }
}

function* handleAddEon(action) {
  const { eonList } = yield select();
  const { eons } = eonList; 
  let { payload } = action;
  let randomId = revisedRandId();
  
  let newEon = {};
  console.warn("Attempting to add eon: ", action);
  yield put(eonListActions.ADDING_EON());
  try {
    if (!payload.mac) {
      const mac_address = yield call(fetchMacAddress, payload);
      payload = {
        ...payload,
        mac: mac_address
      };
    }
    
    const existingEons = Object.keys(eons).filter((key) => {
      const eon = eons[key];
      return eon.mac === payload.mac;
    });

    if (existingEons.length > 0) {
      let topEonKey = existingEons[0];
      newEon[topEonKey] = {
        ...eons[topEonKey],
        ip: payload.ip
      };
      yield put(eonListActions.ADD_EON_ALREADY_EXISTS(newEon));
      yield put(networkScannerActions.REMOVE_SCANNED_RESULT(payload.id));
    } else {
      if (!payload.id) {
        newEon[randomId] = {
          ...payload,
          id: randomId
        };
      }
      yield put(eonListActions.ADD_EON_SUCCESS(newEon));
      yield put(networkScannerActions.REMOVE_SCANNED_RESULT(payload.id));
    }
  } catch (e) {
    console.warn("FAILED TO ADD EON",e);
    yield put(eonListActions.ADD_EON_FAILED(newEon,e));
  }
}

// EXPORT ROOT SAGA
export function* scannerSagas() {
  yield all([
    yield takeLatest(eonListTypes.ADD_EON, handleAddEon),
    yield takeLatest(types.SCAN_NETWORK, scanNetwork),
    yield takeEvery(types.SCAN_NETWORK_RESULT, handleAddEon),
  ]);
}