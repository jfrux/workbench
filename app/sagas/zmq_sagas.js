import { all, take, call, join, fork,spawn, put, takeLatest, takeEvery, select, cancel, cancelled } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import electron from 'electron';
import connectSocket from "socket.io-client"
import serviceList from '../constants/service_list.yaml';
import * as eonTypes from '../constants/eon_detail_action_types';
import * as actions from '../actions/zmq_actions';
import * as types from '../constants/zmq_action_types';
const ws = connectSocket('http://localhost:12000');
// const WebSocket = require('ws');
// const { wsRenderer } = electron;
let channel;

function* createIPC(socket, ip, service) {
  console.warn("createIPC",socket);

  channel = yield call(createIPCEventChannel, socket, ip, service);

  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

export function* createIPCEventChannel(socket, ip, service) {
  console.warn("createIPCEventChannel",arguments);

  return eventChannel(emit => {
    const onError = (data) => {
      // console.warn("ZMQ Error.");
      emit(actions.ERROR(data));
    };

    const onMessage = (data) => {
      // console.warn("ZMQ Message.", JSON.stringify(data));
      emit(actions.MESSAGE(data));
    };

    const onConnect = (evt, data) => {
      // console.warn("ZMQ Connect.");
      emit(actions.CONNECT(data));
    };

    const onDisconnect = () => {
      // console.warn("ZMQ Disconnect.");
      emit(actions.DISCONNECT());
      emit(END);
    };

    socket.on(types.CONNECT, onConnect);
    socket.on(types.MESSAGE, onMessage);
    socket.on(types.ERROR, onError);
    socket.on(types.DISCONNECT, onDisconnect);

    socket.emit(types.CONNECT, ip, service);

    return () => {
      socket.off(types.MESSAGE, onMessage);
      socket.off(types.ERROR, onError);
      socket.off(types.DISCONNECT, onDisconnect);
      socket.off(types.CONNECT, onConnect);
      console.warn("Zmq connetion closed.");
    };
  });
}

function* connectZmq(ip, service) {
  console.warn("connectZmq",arguments);

  yield fork(createIPC, ws, ip, service);
}

function* disconnectZmq(ip, service) {
  // ws.send(types.DISCONNECT, ip, service);
}

// CONNECT TO ZMQ WHEN TAB CHANGES
function* handleConnect(action) {
  const { eonList } = yield select();
  const { selectedEon, eons } = eonList;
  const serviceId = action.payload;
  const eon = eons[selectedEon];
  const service = serviceList[serviceId];
  console.warn("HANDLING CONNECT",service);

  yield call(connectZmq,eon.ip,service);
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
