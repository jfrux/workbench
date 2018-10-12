import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as types from '../constants/eon_detail_action_types';
import * as actions from '../actions/car_control_actions';

function* handleUpdate(action) {
  const { payload } = action;
  const { carControl } = payload;

  if (carControl) {
    yield put(actions.update(carControl));
  }
}

export function* carControlSagas() {
  yield all([
    // on first controls focus, load remaining playlists and enable story browser
    takeLatest(types.EON_STATE_RESPONSE, handleUpdate)
  ]);
}