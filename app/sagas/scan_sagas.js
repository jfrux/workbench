import { fork, take, call, put } from 'redux-saga/effects'
import * as types from '../constants/task_action_types';
import * as networkActions from './network_connection_actions';
import find from 'local-devices'
import networkList from 'network-list';
import isPortReachable from 'is-port-reachable';
import portscanner from 'portscanner';

function scan() {
  let scanCount = 0;
  let foundCount = 0;
  let found = [];
  const ips = networkActions.getIpsForScan(getState().networkConnection.ip);
  const totalIps = ips.length * 254;
  let percentageComplete = 0;
  ips.forEach((ip) => {
    networkList.scanEach({
      ip: ip
    }, (err, obj) => {
      scanCount++;
      percentageComplete = scanCount / totalIps;
      dispatch({
        type: types.SCAN_NETWORK_PROGRESS,
        payload: {
          percentage: Math.round(percentageComplete * 100)
        }
      })
      if (obj.vendor === "OnePlus Technology (Shenzhen) Co., Ltd") {
        let { scanResults } = getState().eonList;
        // if (scanResults) {
        var foundExisting = scanResults.filter((result) => {
          return (result.mac === obj.mac) && (result.ip === obj.ip);
        });
        // console.warn("Found existing:",foundExisting);
        if (!foundExisting.length) {
          scanResults.push(obj);
        }
        found.push(obj);

        settings.set("scanResults",scanResults);
        dispatch(SUCCESS_scanNetwork(scanResults,getState()));
        
      }
      // found = true;
      // scanner = null;
      if (scanCount >= 762) {
        if (found.length) {
          console.warn('scan done... found...',found.length);
          dispatch(FOUND_scanNetwork());
        } else {
          console.warn('scan done... found...',found.length);
          dispatch(NOT_FOUND_scanNetwork());
        }
      }
    });
  });
}

function* startScan() {
  try {
    const token = yield call(scan);
    yield put({type: 'LOGIN_SUCCESS', token});
    return token;
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error});
  }
}

export function* saga() {
  const chan = yield call(countdown, value);
  try {    
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      let seconds = yield take(chan)
      console.log(`countdown: ${seconds}`)
    }
  } finally {
    console.log('countdown terminated')
  }
  yield all([
    // on first controls focus, load remaining playlists and enable story browser
    yield takeLatest(types.TASK_START, start),
    yield takeEvery(types.TASK_MESSAGE, receiveMessage),
    yield takeEvery(types.TASK_STOP, stop)
  ])
}