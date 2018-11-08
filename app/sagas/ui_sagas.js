import { all, take, call, join, fork,spawn, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import rpc from '../rpc-client';
import * as types from '../constants/ui_action_types';

function* handleContextMenu(action) {
  const { selection } = action.payload;
  const state = yield select();
  const show = !state.ui.quickEdit;
  if (show) {
    rpc.emit('open context menu', selection);
  }
}

function* handleAppReady() {
  rpc.emit('init');
}
// EXPORT ROOT SAGA
export function* uiSagas() {
  yield all([
    take(types.APP_READY, handleAppReady),
    takeEvery(types.UI_CONTEXTMENU_OPEN, handleContextMenu)
  ]);
}