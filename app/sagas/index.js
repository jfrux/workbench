// BOILERPLATE
import { all, call, takeLatest, select } from 'redux-saga/effects';

// SAGAS
import { scannerSagas } from './network_scanner_sagas';
import { taskSagas } from './task_sagas';
import { eonSagas } from './eon_sagas';

// EXPORT ROOT SAGA
export default function* rootSaga(dispatch) {
  console.warn("Initializing Sagas...");
  yield all([
    eonSagas(),
    scannerSagas(),
    taskSagas()
  ]);
}