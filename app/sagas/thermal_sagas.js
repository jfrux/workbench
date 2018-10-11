import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as types from '../constants/eon_detail_action_types';
import * as actions from '../actions/thermal_actions';

function* handleUpdate(action) {
  const { payload } = action;
  const { thermal } = payload;
  yield put(actions.update(thermal));
}

export function* thermalSagas() {
  yield all([
    // on first controls focus, load remaining playlists and enable story browser
    takeLatest(types.EON_STATE_RESPONSE, handleUpdate)
  ]);
}