import { all, take, call, fork,  put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { delay, eventChannel } from 'redux-saga';
import IpUtil from "ip";
import * as types from '../constants/eon_detail_action_types';
import * as eonListActions from '../actions/eon_list_actions';
import * as eonDetailActions from '../actions/eon_detail_actions';
import * as endpoints from '../constants/comma_endpoints.json';
function* failedSshConnection() {
  console.warn("failedSshConnection Saga");
  yield put(eonListActions.DESELECT_EON);
}
function apiRequest(endpoint,state) {
  const { eonList, eonDetail } = state;
  const { auth } = eonDetail;
  const { commaUser, isLoggedIn } = auth;
  const { accessToken } = commaUser;
  
  return fetch(`${endpoints.Api.Base}${endpoints.Api.Endpoint[endpoint]}`,{
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, cors, *same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, same-origin, *omit
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": `JWT ${accessToken}`
          // "Content-Type": "application/x-www-form-urlencoded",
      }
    });
}
function* fetchApiRequest(endpoint) {
  const state = yield select();
  yield put(eonDetailActions.API_REQUEST());

  try {
    const req = yield call(apiRequest,endpoint,state);
    const res = yield req.json();
    if (endpoint === 'routes') {
      endpoint = 'drives';
    }
    yield put(eonDetailActions.API_REQUEST_SUCCESS(endpoint, res));
  } catch(e) {
    yield put(eonDetailActions.API_REQUEST_FAIL(e));
  }
}

function fingerprintRequest(eon) {
  return fetch(`http://${eon.ip}:8080/fingerprint.json`);
}

function authRequest(eon) {
  return fetch(`http://${eon.ip}:8080/auth.json`);
}

function stateRequest(eon) {
  return fetch(`http://${eon.ip}:8080/state.json`);
}

function* fetchState() {
  const state = yield select();
  const { selectedEon, eons } = state.eonList;
  const { polling, stateRequestAttempts } = state.eonDetail;
  const eon = eons[selectedEon];

  yield put(eonDetailActions.OPEN_REQUEST_EON_STATE());
  try {
    const req = yield call(stateRequest,eon);
    const res = yield req.json();
    
    yield put(eonDetailActions.RESPONSE_REQUEST_EON_STATE(res));

    if (polling) {
      yield delay(1000);
      yield call(fetchState);
    }
  } catch(e) {
    if (polling && stateRequestAttempts <= 10) {
      yield delay(500);
      yield put(eonDetailActions.FAIL_REQUEST_EON_STATE(e));
    } else {
      yield put(eonDetailActions.FATAL_REQUEST_EON_STATE());
    }
  }
}

function* fetchAuth() {
  console.warn("fetching auth...");
  const state = yield select();
  const { selectedEon, eons } = state.eonList;
  const eon = eons[selectedEon];
  yield put(eonDetailActions.AUTH_REQUEST());
  try {
    const req = yield call(authRequest,eon);
    const res = yield req.json();

    yield put(eonDetailActions.AUTH_REQUEST_SUCCESS(res));
  } catch(e) {
    yield delay(500);
    yield put(eonDetailActions.AUTH_REQUEST_FAIL(e));
  }
}

function* fetchFingerprint() {
  console.warn("fetching fingerprint...");
  const state = yield select();
  const { selectedEon, eons } = state.eonList;
  const { polling, stateRequestAttempts } = state.eonDetail;
  const eon = eons[selectedEon];
  yield put(eonDetailActions.GET_FINGERPRINT());

  try {
    const req = yield call(fingerprintRequest,eon);
    const res = yield req.json();

    if (polling) {
      yield delay(1000);
      yield put(eonDetailActions.RESPONSE_GET_FINGERPRINT(endpoint, res));
    }
  } catch(e) {
    if (polling) {
      yield delay(500);
      yield put(eonDetailActions.FAIL_GET_FINGERPRINT(e));
    }
  }
};

function* handleTabChange(action) {
  const tab = action.payload;
  switch (tab) {
    case "1":
      // return;
    case "2":
      //get routes
      yield call(fetchApiRequest,'routes');
      break;
    case "3":
      yield call(fetchApiRequest,'devices');
      break;
    case "4":
      yield call(fetchFingerprint);
      break;
  }
}
function* addEonListError() {
  yield put(eonListActions.ADD_ERROR("Failed to connect to your EON.  Sometimes due to network instability it can take longer than we were willing to wait.  If the problem persists, try rebooting EON."));
}
// EXPORT ROOT SAGA
export function* eonSagas() {
  console.warn("types:",types);
  yield all([
    yield takeLatest(types.EON_STATE_FATAL,addEonListError),
    yield takeLatest(types.INSTALL_SUCCESS,fetchAuth),
    yield takeLatest(types.INSTALL_SUCCESS,fetchState),
    yield takeLatest(types.AUTH_REQUEST_FAIL,fetchAuth),
    yield takeLatest(types.EON_STATE_FAIL,fetchState),
    yield takeLatest(types.GET_FINGERPRINT_FAIL,fetchFingerprint),
    yield takeLatest(types.CHANGE_TAB, handleTabChange)
  ]);
}