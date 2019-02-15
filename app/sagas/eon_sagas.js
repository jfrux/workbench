import {
  all,
  call,
  put,
  takeLatest,
  takeEvery,
  select
} from 'redux-saga/effects';
const rpc = require('../rpc-client');
import toString from 'stream-to-string';
import { delay } from 'redux-saga';
import { push } from 'connected-react-router'
import { remote } from 'electron';
const { app } = remote;
import settings from 'electron-settings';
import mkdirp from 'mkdirp';
import RSAKey from 'rsa-key';
import path from 'path';
import fs from 'fs';
import arraySort from 'array-sort';
import * as routes from '../constants/routes.json';
import * as types from '../constants/eon_detail_action_types';
import * as eonListTypes from '../constants/eon_list_action_types';
import * as fileListActionTypes from '../constants/file_list_action_types';
import * as eonListActions from '../actions/eon_list_actions';
import * as eonDetailActions from '../actions/eon_detail_actions';
import * as fileListActions from '../actions/file_list_actions';
const Client = require('ssh2-sftp-client');
function* getPrivateKey() {
  const userHome = app.getPath('home');
  mkdirp.sync(path.join(userHome, '.ssh'));
  let filePath = path.join(userHome, '.ssh', 'openpilot_rsa');
  let userKeyPath = settings.get('eonSshKeyPath');
  if (userKeyPath) {
    filePath = userKeyPath;
  }
  console.warn("Using Key Path:",filePath);
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

/**
 * SFTP
 */
const rootRemoteDir = "/data/openpilot";
function* connect() {
  if (app.sftpClient) return;
  const { eonList } = yield select();
  const { selectedEon, eons } = eonList;
  const eon = eons[selectedEon];
  const pk = yield call(getPrivateKey);
  console.log(`[sftp] Attempting to connect to EON (${eon.ip})`);
  app.sftpClient = new Client();
  yield app.sftpClient.connect({
    host: eon.ip,
    port: '8022',
    username: 'root',
    privateKey: pk
  });
  console.log(`[sftp] Connected to EON (${eon.ip})`);
}

function* retrieveFile(remoteFile) {
  yield connect();
  console.log(`[sftp] Retrieving file ${remoteFile}...`);
  return yield app.sftpClient.get(remoteFile);
  console.log(`[sftp] Retrieved file ${remoteFile}`);
}

function* downloadFile(remoteFile,localFile) {
  yield connect();
  console.log(`[sftp] Downloading file ${remoteFile} to ${localFile}...`);
  return yield app.sftpClient.fastGet(remoteFile, localFile);
  console.log(`[sftp] Download complete for ${remoteFile} to ${localFile}...`);
}

function* downloadScreenshot() {
  let screenshotFile;
  let remoteScreenshotFile = '/data/screenshots/screenshot.png';
  let localScreenshotsDir = path.join(require('os').homedir(), 'Desktop', 'eon_screenshots');
  let localScreenshotsFile = path.join(localScreenshotsDir,'EON_' + new Date().getTime() + '.png');

  console.log(`[sftp] Downloading screenshot from EON...`);
  mkdirp.sync(localScreenshotsDir);
  try {
    screenshotFile = yield downloadFile(remoteScreenshotFile, localScreenshotsFile);
    console.log(`[sftp] Screenshot downloaded to ${localScreenshotsFile}.`);
    rpc.emit('notify', 'Screenshot captured!', 'Workbench has saved the screenshot to:\n' + localScreenshotsDir);
  } catch (e) {
    console.error(e);
    rpc.emit('notify', 'ERROR! Screenshot failed!', 'Workbench could not take a screenshot.');
  }
}
function* listDirectory(remotePath) {
  yield connect();
  return yield app.sftpClient.list(remotePath);
}
// function* listDirectoryDeep(file) {
//     console.log("path:", file.path);
//     let nextPath = path.join(file.path, file.name);
//     let items = yield listDirectory(file.path);
//     items.map((item) => {
//       return listDirectoryDeep(item.path);
//     });
//   };
//   const baseFileList = 
//   console.log(baseFileList);
//   return Promise.all(baseFileList.map((file) => {
    
//   }));
// }
function* refreshFileList() {
  let baseItems = {};
  const items = yield listDirectory(rootRemoteDir);
  items.forEach((item) => {
    baseItems[path.join(rootRemoteDir,item.name)] = item;
  });
  yield put(eonDetailActions.REFRESH_FILE_LIST_SUCCESS(baseItems));
}

function* handleRunCommand(action) {
  const { eonDetail } = yield select();
  const { lastRunCommand } = eonDetail;
  if (lastRunCommand === 'RebootEon') {
    yield put(eonListActions.ADD_ERROR("Connection to EON was lost... Rebooting."))
    yield put(push(routes.EON_LIST));
  } else if (lastRunCommand === 'TakeScreenshot') {
    yield delay(1000);
    yield call(downloadScreenshot);
  }
}

function* handleSelectEon() {
  const { eonDetail } = yield select();
  const { activeTab } = eonDetail;
  yield call(getPrivateKey);
  // yield put(eonDetailActions.CHANGE_TAB('androidLog', activeTab));
  yield put(push(routes.EON_DETAIL));
  yield call(connect);
}

function* handleFetchDirectory(data) {
  const { action, payload } = data;
  console.log("Fetching directory...",payload);
  let newFiles = [];
  let allFiles;
  try {
    allFiles = yield call(listDirectory,payload);
  } catch (e) {
    console.log("Failed to fetch directory...", e);
    yield delay(2000);
    return yield call(handleFetchDirectory,data);
  }
  let dirs = allFiles.filter((file) => {
    return (file.type === 'd');
  });
  let files = allFiles.filter((file) => {
    return (file.type !== 'd');
  });

  dirs = arraySort(dirs, 'name');
  files = arraySort(files, 'name');
  let filesByPath = {};
  newFiles = [
    ...dirs,
    ...files
  ]
  const disallow = [
    'pyc'
  ];
  const hide = [
    'gitignore',
    'gitkeep',
    'git'
  ];
  let items = newFiles.map((file) => {
    const filePath = path.join(payload,file.name);
    let fileSplit = filePath.split('.');
    let fileExt = fileSplit[fileSplit.length-1];
    if ((fileSplit.length-1) === 0) {
      fileExt = "";
    }
    const fileType = (fileExt) ? fileExt : "";
  
    // console.log(fileExt);
    let fileObj = {
      ...file,
      isDirectory: file.type === 'd',
      filePath,
      parentPath: payload,
      allowOpen: !disallow.includes(fileExt),
      hidden: hide.includes(fileExt),
      fileType
    }
    filesByPath[filePath] = fileObj;
    return fileObj;
  })
  yield put(fileListActions.FETCH_DIRECTORY_SUCCESS({
    filePath: payload,
    filesByPath,
    items
  }));
}

function* handleFetchFile(data) {
  const { action, payload } = data;
  console.log("Fetching file...",payload);
  let file = yield call(retrieveFile,payload.filePath);
  let fileContent = yield toString(file);
  console.log("Fetched file...",file);
  yield put(fileListActions.FETCH_FILE_SUCCESS({
    ...file,
    ...payload,
    isDirty: false,
    _original: "" + fileContent,
    content: "" + fileContent
  }));
}
// EXPORT ROOT SAGA
export function* eonSagas() {
  // console.warn("types:",types);
  
  yield all([
    takeLatest(types.RUN_COMMAND, handleRunCommand),
    takeLatest(eonListTypes.SELECT_EON, handleSelectEon),
    takeEvery(types.CONNECT_FAILED, addEonListError),
    takeEvery(fileListActionTypes.FETCH_DIRECTORY, handleFetchDirectory),
    takeEvery(fileListActionTypes.FETCH_FILE, handleFetchFile)
    // throttle(250,types.MESSAGE_RECEIVED,handleMessage),
  ]);
}
