import { all, throttle, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as types from '../constants/eon_detail_action_types';
import * as actions from '../actions/thermal_actions';

function* handleUpdate(action) {
  const { payload } = action;
  const { thermal } = payload;

  if (thermal) {
    console.log("thermal");
    yield put(actions.update(thermal));
  }
}

export function* thermalSagas() {
  // yield all([
    // on first controls focus, load remaining playlists and enable story browser
    // yield takeEvery(types.MESSAGE, handleUpdate)
  // ]);
}