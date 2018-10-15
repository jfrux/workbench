import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as types from '../constants/eon_detail_action_types';
import * as actions from '../actions/system_actions';

function* handleUpdate(action) {
  const { payload } = action;
  const { system } = payload;
  if (system) {
    yield put(actions.update(system));
  }
}

export function* systemSagas() {
  yield all([
    // on first controls focus, load remaining playlists and enable story browser
    takeLatest(types.MESSAGE, handleUpdate)
  ]);
}