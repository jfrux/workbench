import {
  all,
  call,
  put,
  takeLatest,
  takeEvery,
  select
} from 'redux-saga/effects';
const notify = require('../utils/notify');
import { delay } from 'redux-saga';
import { push } from 'connected-react-router'
import { remote } from 'electron';
const { app } = remote;
import mkdirp from 'mkdirp';
import RSAKey from 'rsa-key';
import path from 'path';
import fs from 'fs';
import * as routes from '../constants/routes.json';
import * as types from '../constants/eon_detail_action_types';
import * as eonListTypes from '../constants/eon_list_action_types';
import * as eonListActions from '../actions/eon_list_actions';
import * as eonDetailActions from '../actions/eon_detail_actions';

function* getPrivateKey() {
  const userHome = app.getPath('home');
  mkdirp.sync(path.join(userHome, '.ssh'));
  const filePath = path.join(userHome, '.ssh', 'openpilot_rsa');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC+iXXq30Tq+J5N
Kat3KWHCzcmwZ55nGh6WggAqECa5CasBlM9VeROpVu3beA+5h0MibRgbD4DMtVXB
t6gEvZ8nd04E7eLA9LTZyFDZ7SkSOVj4oXOQsT0GnJmKrASW5KslTWqVzTfo2XCt
Z+004ikLxmyFeBO8NOcErW1pa8gFdQDToH9FrA7kgysic/XVESTOoe7XlzRoe/eZ
acEQ+jtnmFd21A4aEADkk00Ahjr0uKaJiLUAPatxs2icIXWpgYtfqqtaKF23wSt6
1OTu6cAwXbOWr3m+IUSRUO0IRzEIQS3z1jfd1svgzSgSSwZ1Lhj4AoKxIEAIc8qJ
rO4uymCJAgMBAAECggEBAISFevxHGdoL3Z5xkw6oO5SQKO2GxEeVhRzNgmu/HA+q
x8OryqD6O1CWY4037kft6iWxlwiLOdwna2P25ueVM3LxqdQH2KS4DmlCx+kq6FwC
gv063fQPMhC9LpWimvaQSPEC7VUPjQlo4tPY6sTTYBUOh0A1ihRm/x7juKuQCWix
Cq8C/DVnB1X4mGj+W3nJc5TwVJtgJbbiBrq6PWrhvB/3qmkxHRL7dU2SBb2iNRF1
LLY30dJx/cD73UDKNHrlrsjk3UJc29Mp4/MladKvUkRqNwlYxSuAtJV0nZ3+iFkL
s3adSTHdJpClQer45R51rFDlVsDz2ZBpb/hRNRoGDuECgYEA6A1EixLq7QYOh3cb
Xhyh3W4kpVvA/FPfKH1OMy3ONOD/Y9Oa+M/wthW1wSoRL2n+uuIW5OAhTIvIEivj
6bAZsTT3twrvOrvYu9rx9aln4p8BhyvdjeW4kS7T8FP5ol6LoOt2sTP3T1LOuJPO
uQvOjlKPKIMh3c3RFNWTnGzMPa0CgYEA0jNiPLxP3A2nrX0keKDI+VHuvOY88gdh
0W5BuLMLovOIDk9aQFIbBbMuW1OTjHKv9NK+Lrw+YbCFqOGf1dU/UN5gSyE8lX/Q
FsUGUqUZx574nJZnOIcy3ONOnQLcvHAQToLFAGUd7PWgP3CtHkt9hEv2koUwL4vo
ikTP1u9Gkc0CgYEA2apoWxPZrY963XLKBxNQecYxNbLFaWq67t3rFnKm9E8BAICi
4zUaE5J1tMVi7Vi9iks9Ml9SnNyZRQJKfQ+kaebHXbkyAaPmfv+26rqHKboA0uxA
nDOZVwXX45zBkp6g1sdHxJx8JLoGEnkC9eyvSi0C//tRLx86OhLErXwYcNkCf1it
VMRKrWYoXJTUNo6tRhvodM88UnnIo3u3CALjhgU4uC1RTMHV4ZCGBwiAOb8GozSl
s5YD1E1iKwEULloHnK6BIh6P5v8q7J6uf/xdqoKMjlWBHgq6/roxKvkSPA1DOZ3l
jTadcgKFnRUmc+JT9p/ZbCxkA/ALFg8++G+0ghECgYA8vG3M/utweLvq4RI7l7U7
b+i2BajfK2OmzNi/xugfeLjY6k2tfQGRuv6ppTjehtji2uvgDWkgjJUgPfZpir3I
RsVMUiFgloWGHETOy0Qvc5AwtqTJFLTD1Wza2uBilSVIEsg6Y83Gickh+ejOmEsY
6co17RFaAZHwGfCFFjO76Q==
-----END PRIVATE KEY-----`
    );
  }

  try {
    fs.chmodSync(filePath, '600');
    if (process.platform === 'win32') {
      require('child_process').execSync(
        `icacls "${filePath}" /c /t /inheritance:d && icacls "${filePath}" /c /t /grant %username%:F && icacls "${filePath}"  /c /t /remove Administrator BUILTIN\\Administrators BUILTIN Everyone System Users && icacls "${filePath}"`,
        { stdio: [0, 1, 2] }
      );
    }
  } catch (e) {
    // console.warn('chmod failed on file ', filePath);
  }
  const key = new RSAKey(fs.readFileSync(filePath));
  yield put({ type: types.PRIVATE_KEY_INSTALLED });
  return key.exportKey('private', 'pem', 'pkcs1');
}

function* addEonListError() {
  yield put(
    eonListActions.ADD_ERROR(
      'Failed to connect to your EON.  Sometimes due to network instability it can take longer than we were willing to wait.  If the problem persists, try rebooting EON.'
    )
  );
}

function* retrieveScreenshot() {
  const { eonList } = yield select();
  const { selectedEon, eons } = eonList;
  const eon = eons[selectedEon];
  const pk = yield call(getPrivateKey);
  let screenshotsDir = path.join(require('os').homedir(), 'Desktop', 'eon_screenshots');
  let Client = require('ssh2-sftp-client');
  mkdirp.sync(screenshotsDir);
  let sftp = new Client();
  sftp.connect({
      host: eon.ip,
      port: '8022',
      username: 'root',
      privateKey: pk
  }).then(() => {
    return sftp.fastGet('/data/screenshots/screenshot.png', path.join(screenshotsDir,'EON_' + new Date().getTime() + '.png'));
  }).then((data) => {
    notify('Screenshot captured!', 'Workbench has saved the screenshot to:\n' + screenshotsDir);
  }).catch((err) => {
      console.log(err, 'catch error');
  });
}

function* handleRunCommand(action) {
  const { eonDetail } = yield select();
  const { lastRunCommand } = eonDetail;
  if (lastRunCommand === 'RebootEon') {
    yield put(eonListActions.ADD_ERROR("Connection to EON was lost... Rebooting."))
    yield put(push(routes.EON_LIST));
  } else if (lastRunCommand === 'TakeScreenshot') {
    yield delay(1000);
    yield call(retrieveScreenshot);
  }
}

function* handleSelectEon(action) {
  const { eonDetail } = yield select();
  const { activeTab } = eonDetail;
  yield call(getPrivateKey);
  yield put(eonDetailActions.CHANGE_TAB('console', activeTab));
  yield put(push(routes.EON_DETAIL));
}

// EXPORT ROOT SAGA
export function* eonSagas() {
  // console.warn("types:",types);
  
  yield all([
    takeLatest(types.RUN_COMMAND, handleRunCommand),
    takeLatest(eonListTypes.SELECT_EON, handleSelectEon),
    // takeLatest('@@router/LOCATION_CHANGE', routeWatcher),
    takeEvery(types.CONNECT_FAILED, addEonListError),
    // throttle(250,types.MESSAGE_RECEIVED,handleMessage),
  ]);
}
