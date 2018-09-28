import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as types from '../constants/task_action_types';

function* start(action) {
  const taskConnection = yield call(Tasks[action.payload.task]);
}

function* receiveMessage(action) {
  yield put({type: "TASK_MESSAGE", payload: action.payload});
}

function* stop(action) {
  const taskConnection = yield call(Tasks[action.payload.task]);
}

export function* taskSagas() {
  yield all([
    // on first controls focus, load remaining playlists and enable story browser
    yield takeLatest(types.TASK_START, start),
    yield takeEvery(types.TASK_MESSAGE, receiveMessage),
    yield takeEvery(types.TASK_STOP, stop)
  ]);
}