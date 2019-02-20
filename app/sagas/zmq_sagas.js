import { all, take, call, join, fork,spawn, put, takeLatest, takeEvery, select, cancel, cancelled } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import electron from 'electron';
import serviceList from '../constants/service_list.yaml';
import * as eonTypes from '../constants/eon_detail_action_types';
import * as actions from '../actions/zmq_actions';
import * as types from '../constants/zmq_action_types';
const { ipcRenderer } = electron;
let channel;

function* createIPC(ipc, ip, service) {
  console.warn("createIPC",arguments);
  channel = yield call(createIPCEventChannel, ipc);
  ipc.send(types.CONNECT, ip, service);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

export function* createIPCEventChannel(ipc) {
  console.warn("createIPCEventChannel",arguments);
  return eventChannel(emit => {
    const onError = (data) => {
      emit(actions.ERROR(data));
    };

    const onMessage = (evt, data) => {
      emit(actions.MESSAGE(data));
    };
    
    const onDisconnect = () => {
      emit(actions.DISCONNECT());
      emit(END);
    };
    
    // IPC sharing the same event type constants for clarity.
    ipc.on(types.MESSAGE, onMessage);
    ipc.on(types.ERROR, onError);
    ipc.on(types.DISCONNECT, onDisconnect);
    return () => {
      // This is a handler to uncreateIPCEventChannel.
      // console.warn("Scan done.");
      ipc.removeListener(types.MESSAGE, onMessage);
      ipc.removeListener(types.ERROR, onError);
      ipc.removeListener(types.DISCONNECT, onDisconnect);
    };
  });
}

function* connectZmq(ip, service) {
  console.warn("connectZmq",arguments);
  yield fork(createIPC, ipcRenderer, ip, service);
}

function* disconnectZmq(ip, service) {
  ipcRenderer.send(types.DISCONNECT, ip, service);
}

// CONNECT TO ZMQ WHEN TAB CHANGES
function* handleConnect(action) {
  const { eonList } = yield select();
  const { selectedEon, eons } = eonList;
  const serviceId = action.payload;
  const eon = eons[selectedEon];
  const service = serviceList[serviceId];
  console.warn("HANDLING CONNECT",service);
  yield call(connectZmq, eon.ip, service);
}

function* handleDisconnect(action) {
  const { eonList } = yield select();
  const { selectedEon, eons } = eonList;
  const eon = eons[selectedEon];
  const service = serviceList[action.payload];
  yield call(disconnectZmq, eon.ip, service);
}
// EXPORT ROOT SAGA
export function* zmqSagas() {
  yield all([
    takeEvery(types.CONNECT, handleConnect),
    takeEvery(types.DISCONNECT, handleDisconnect)
  ]);
}