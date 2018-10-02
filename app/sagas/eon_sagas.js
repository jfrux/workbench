import { all, take, call, fork, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import IpUtil from "ip";
import * as types from '../constants/eon_detail_action_types';
import * as eonListActions from '../actions/eon_list_actions';
import * as eonDetailActions from '../actions/eon_detail_actions';

function* failedSshConnection() {
  console.warn("failedSshConnection Saga");
  yield put(eonListActions.DESELECT_EON);
}

// EXPORT ROOT SAGA
export function* eonSagas() {
  yield all([
    yield takeEvery(types.EON_STATE_FAIL, failedSshConnection),
    yield takeEvery(types.CONNECT_SSH_FAIL, failedSshConnection)
  ]);
}