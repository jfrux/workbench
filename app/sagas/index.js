// BOILERPLATE
import { all } from 'redux-saga/effects';

// SAGAS
import { taskSagas } from './task_sagas';
import { scanSagas } from './scan_sagas';



// EXPORT ROOT SAGA
export default function* rootSaga(dispatch) {
  yield all([
    taskSagas(),
    scanSagas()
  ])
}