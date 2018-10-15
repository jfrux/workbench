// BOILERPLATE
import { all, call, takeLatest, select } from 'redux-saga/effects';

// SAGAS
import { carStateSagas } from './car_state_sagas';
import { carControlSagas } from './car_control_sagas';
import { thermalSagas } from './thermal_sagas';
import { scannerSagas } from './network_scanner_sagas';
import { eonSagas } from './eon_sagas';
import { systemSagas } from './system_sagas';

// EXPORT ROOT SAGA
export default function* rootSaga(dispatch) {
  console.warn("Initializing Sagas...");
  yield all([
    eonSagas(),
    carStateSagas(),
    carControlSagas(),
    thermalSagas(),
    scannerSagas(),
    systemSagas()
  ]);
}