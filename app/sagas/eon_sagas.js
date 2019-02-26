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
import moment from 'moment';
import inflection from 'inflection';
import arraySort from 'array-sort';
import * as routes from '../constants/routes.json';
import dataParams from '../constants/data_params';
import * as types from '../constants/eon_detail_action_types';
import * as eonListTypes from '../constants/eon_list_action_types';
import * as fileListActionTypes from '../constants/file_list_action_types';
import * as eonListActions from '../actions/eon_list_actions';
import * as eonDetailActions from '../actions/eon_detail_actions';
import * as fileListActions from '../actions/file_list_actions';
import Moment from 'react-moment';
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

function* saveActiveFile() {
  const { fileList } = yield select();
  const { activeFile, openedFiles } = fileList;
  const currentFile = openedFiles[activeFile];
  const contentBuffer = Buffer.from(currentFile.content);
  yield connect();
  console.log(`[sftp] Saving ${activeFile}...`);
  const savedFile = yield app.sftpClient.put(contentBuffer, activeFile);
  yield put(fileListActions.SAVE_ACTIVE_FILE_SUCCESS());
  return {
    savedFile
  };
}

function* retrieveFile(remoteFile, mergeWith={}) {
  yield connect();
  console.log(`[sftp] Retrieving file ${remoteFile}...`);
  const retrievedFile = yield app.sftpClient.get(remoteFile);
  return {
    retrievedFile,
    mergeWith
  };
}

function* downloadFile(remoteFile,localFile) {
  yield connect();
  console.log(`[sftp] Downloading file ${remoteFile} to ${localFile}...`);
  return app.sftpClient.fastGet(remoteFile, localFile);
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

function* downloadRoute(route) {
  // let route;
  // let route = '/data/screenshots/screenshot.png';
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

function* refreshFileList() {
  let baseItems = {};
  const items = yield listDirectory(rootRemoteDir);
  items.forEach((item) => {
    baseItems[path.join(rootRemoteDir,item.name)] = item;
  });
  yield put(eonDetailActions.REFRESH_FILE_LIST_SUCCESS(baseItems));
}

function* apiRequest(endpointUrl) {
  const { eonDetail } = yield select();
  const { auth } = eonDetail;
  const { commaUser } = auth;

  const { accessToken } = commaUser;
  if (!accessToken) return ;
  // console.log(accessToken);
  const req = yield call(fetch,endpointUrl,{
    headers: {
      "content-type": "application/json",
      "Authorization": `JWT ${accessToken}`
    }
  });
  const resp = yield req.json();

  return resp;
};
const groupBy = (arr, k, fn = () => true) =>
  arr.reduce((r, c) => (fn(c[k]) ? r[c[k]] = [...r[c[k]] || [], c] : null, r), {});

import {ENDPOINTS} from '../constants/comma_endpoints';
function buildEndpointUrl(key, tokens = {}) {
  let endpoint = ENDPOINTS[key];

  let tokenKeys = [];
  // console.log(endpoint);
  if (tokens) {
    tokenKeys = Object.keys(tokens);
  }

  if (tokenKeys.length) {
    tokenKeys.forEach((tokenKey) => {
      const tokenValue = tokens[tokenKey];
      // const length = endpoint.length
      // console.log(`replacing ${tokenKey} with ${tokenValue}`)
      endpoint = endpoint.replace(/\{\{([a-zA-Z0-9\.]+)\}\}/,tokenValue);
    });
  }

  return endpoint;
}

function* getProfile() {
  let results;
  const endpoint = buildEndpointUrl('profile');

  try {
    results = yield apiRequest(endpoint);
    yield put(eonDetailActions.FETCH_PROFILE_SUCCESS(results));
  } catch (e) {
    yield put(eonDetailActions.FETCH_PROFILE_FAILED(e));
  }
};
function formattedTime(seconds) {
  var sec_num = parseInt(seconds, 10); // don't forget the second param
  if (sec_num > 0) {
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    let timeGroups = [];

    if (hours > 0) {
      timeGroups.push(hours);
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    timeGroups.push(minutes);
    timeGroups.push(seconds);
    return timeGroups.join(":");
  } else {
    return "00:00";
  }
}
function* getRoutes() {
  let results;
  const endpoint = buildEndpointUrl('routes');
  let routes, routeDates, routeKeys, routesSorted;
  // try {
    results = yield apiRequest(endpoint);
    routes = results.routes;
    routes = Object.keys(routes).map((routeKey) => {
      const route = routes[routeKey];
      let start_time = moment(route.start_time);
      let end_time = moment(route.end_time);
      const duration = end_time.diff(start_time,'seconds');
      const duration_formatted = formattedTime(duration);
      let label;

      if (route.start_geocode !== route.end_geocode) {
        label =  `${route.start_geocode} to ${route.end_geocode}`;
      } else {
        label = `${route.start_geocode}`;
      }
      return {
        ...route,
        start_time,
        end_time,
        label,
        duration,
        duration_formatted,
        id: routeKey
      };
    });
    routes = routes.sort((a,b) => {
      return new Date(b.start_time) - new Date(a.start_time);
    });
    console.log(routes);
    yield put(eonDetailActions.FETCH_ROUTES_SUCCESS(routes));
  // } catch (e) {
  //   yield put(eonDetailActions.FETCH_ROUTES_FAILED(e));
  // }
};

function* getDevices() {
  let results;
  const endpoint = buildEndpointUrl('devices');

  try {
    results = yield apiRequest(endpoint);
    yield put(eonDetailActions.FETCH_DEVICES_SUCCESS(results));
  } catch (e) {
    yield put(eonDetailActions.FETCH_DEVICES_FAILED(e));
  }
};

function* getLogs(fullname) {
  let results;
  const endpoint = buildEndpointUrl('logs', { fullname });

  try {
    results = yield apiRequest(endpoint);
    yield put(eonDetailActions.FETCH_LOGS_SUCCESS(results));
  } catch (e) {
    yield put(eonDetailActions.FETCH_LOGS_FAILED(e));
  }
};

function removeEndOfUrl(the_url)
{
    var the_arr = the_url.split('/');
    the_arr.pop();
    return( the_arr.join('/') );
}
// https://api.commadotai.com/v1/devices/0812e2149c1b5609/segments/?from=1549140451443&to=1550350051444
// https://api.commadotai.com/v1/devices/0812e2149c1b5609/segments?from=1549141200000&to=1550350800000
function* getSegments({type, payload}) {
  const { startTime, endTime } = payload;
  const { eonDetail } = yield select();
  const { dataParams } = eonDetail;
  const { dongleId } = dataParams;
  let results,routesData = [], segments, segmentsGroupedByRouteId, routesSorted, routesById = {}, routeKeys;
  // console.log("times:",payload);
  const endpoint = buildEndpointUrl('segments', { dongleId: dongleId.value, startTime, endTime });

  // try {
    results = yield apiRequest(endpoint);
    segments = results;
    segmentsGroupedByRouteId = groupBy(segments,"canonical_route_name");
    routeKeys = Object.keys(segmentsGroupedByRouteId);

    routesData = routeKeys.map((routeKey) => {
      let segments = segmentsGroupedByRouteId[routeKey];
      const segmentIds = [];
      if (segments) {
        // segment_thumb_sec =
        segments = segments.map((segment) => {
          let start_time = moment.utc(segment.start_time_utc_millis);
          let end_time = moment.utc(segment.end_time_utc_millis);
          let calendar_time = start_time.local().calendar();
          const duration = end_time.diff(start_time,'seconds');
          const duration_formatted = formattedTime(duration);
          let label, sublabel, current_sec_length = 0;
          current_sec_length = (segment.start_time_utc_millis-segments[0].start_time_utc_millis) / 1000;
          let base_url = removeEndOfUrl(segment.url);
          let current_time = Math.ceil((current_sec_length+1)/10)*10;
          // console.log(calendar_time);
          label =  `${calendar_time}`;
          segmentIds.push(segment.number);
          sublabel =  `${segment.start_lat} ${segment.start_lng} to ${segment.end_lat} ${segment.end_lng}`;
          return {
            ...segment,
            start_time,
            end_time,
            label,
            sublabel,
            duration,
            base_url,
            current_time,
            calendar_time,
            duration_formatted,
            thumbnail_url: path.join(base_url,`sec${current_time}-tiny.jpg`)
          };
        });

        const numOfSegments = segmentIds.length;
        let midpointSegmentIndex = 0, midpointSegment;
        if (numOfSegments > 1) {
          midpointSegmentIndex = Math.round(numOfSegments/2);
        }
        const firstSegment = segments[0];
        midpointSegment = segments[midpointSegmentIndex];
        const lastSegment = segments[numOfSegments-1];

        // console.log("midpointSegmentIndex:",midpointSegmentIndex);
        // console.log("midpointSegment:",midpointSegment);
        const start_time = firstSegment.start_time;
        const start_lat = firstSegment.start_lat;
        const start_lng = firstSegment.start_lng;

        const end_time = lastSegment.end_time;
        const end_lat = lastSegment.end_lat;
        const end_lng = lastSegment.end_lng;

        const calendar_time = start_time.calendar();
        const duration = end_time.diff(start_time,'seconds');
        const duration_formatted = formattedTime(duration);
        const avg_sec_length = duration / segments.length;
        // map thumbnails;
        let sec_number = Math.round(duration / 2);
        sec_number = Math.ceil((sec_number+1)/10)*10;
        // console.log("base_url:",base_url);
        // console.log("sec_number:",sec_number);
        // const thumbnail_url = path.join(base_url,`sec${sec_number}-tiny.jpg`)
        const thumbnail_url = midpointSegment.thumbnail_url;
        const git_repo = firstSegment.git_remote.replace('git@github.com:','').replace('https://github.com/').replace(".git","");
        const git_commit_short = firstSegment.git_commit.slice(0,7);
        const cabana_url = `https://community.comma.ai/cabana/?route=${routeKey}`;
        const sharable_cabana_url = `https://community.comma.ai/cabana/?route=${routeKey}&max=19&url=${firstSegment.base_url}`;

        return {
          ...firstSegment,
          start_time,
          start_lat,
          git_repo,
          cabana_url,
          sharable_cabana_url,
          git_commit_short,
          start_lng,
          end_time,
          id: routeKey,
          end_lat,
          end_lng,
          calendar_time,
          duration,
          duration_formatted,
          segments,
          thumbnail_url
        };
      }
    });
    routesData = routesData.sort((a,b) => {
      return b.start_time - a.start_time;
    });
    console.log(routesData);
    routesData.forEach((route) => {
      routesById[route.id] = route;
    });
    routesSorted = routesData.map((route) => {
      return route.id;
    });
    yield put(eonDetailActions.FETCH_SEGMENTS_SUCCESS( routesById, routesSorted));
  // } catch (e) {
  //   yield put(eonDetailActions.FETCH_ROUTES_FAILED(e));
  // }
};

function* getFileLinks({type, payload}) {
  const routeId = payload;
  const endpoint = buildEndpointUrl('files', { routeId });
  try {
    const results = yield apiRequest(endpoint);
    yield put(eonDetailActions.FETCH_ROUTE_FILE_LINKS_SUCCESS(routeId, results));
  } catch (e) {
    yield put(eonDetailActions.FETCH_ROUTE_FILE_LINKS_FAILED(e));
  }

}

function* getAnnotations(dongleId, startTime, endTime) {
  let results;
  const endpoint = buildEndpointUrl('annotations', { dongleId, startTime, endTime });

  try {
    results = yield apiRequest(endpoint);
    yield put(eonDetailActions.FETCH_ANNOTATIONS_SUCCESS(results));
  } catch (e) {
    yield put(eonDetailActions.FETCH_ANNOTATIONS_FAILED(e));
  }
};

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

// const dataParamKeys = Object.keys(dataParams).sort();

function* mergeContentWithDataParam(retrievedFile, mergeWith ) {
  const fileContents = yield toString(retrievedFile);
  // console.log(`[sftp] Merging filecontent for ${mergeWith.name}...`);
  return {
    ...mergeWith,
    value: fileContents
  };
}

function* handleFetchAuthFile() {
  const authFilePath = '/data/data/ai.comma.plus.offroad/files/persistStore/persist-auth';
  console.log("Fetching auth file...", authFilePath);
  try {
    let { retrievedFile } = yield call(retrieveFile,authFilePath);
    // console.log(retrievedFile);
    let fileContent = yield toString(retrievedFile);
    let json;
    if (fileContent) {
      json = JSON.parse(fileContent);
      json = {
        ...json,
        commaUser: JSON.parse(json.commaUser),
        googleUser: JSON.parse(json.googleUser)
      }
    }
    if (json) {
      // console.log("Fetched auth config...",json);
      yield put(eonDetailActions.FETCH_AUTH_FILE_SUCCESS({
        ...json
      }));
    } else {
      yield put(eonDetailActions.FETCH_AUTH_FILE_FAILED("Failed to parse auth config"));
    }
  } catch (e) {
    yield put(eonDetailActions.FETCH_AUTH_FILE_FAILED(e.message));
  }
}
function* handleFetchDataParams() {
  const dataParamsPath = '/data/params/d';
  // console.log("Fetching data params...",dataParams);
  let dataParamFiles, dataParamDirList, fileDataParams,dataParamResults,dataParamFilePromises, dataParamsMerged, finalDataParams;
  try {
    dataParamDirList = yield call(listDirectory,dataParamsPath);
    dataParamFiles = dataParamDirList.filter((file) => {
      return (file.type !== 'd');
    });
    dataParamsMerged = dataParamFiles.map((dataFile) => {
      const paramId = inflection.camelize(dataFile.name,true);
      // console.log("paramId",paramId);
      const baseParam = dataParams[paramId];
      // console.log("baseParam",baseParam);
      if (baseParam) {
        return {
          ...baseParam,
          ...dataFile
        };
      } else {
        return {
          ...dataFile,
          error: "No base param info."
        }
      }
    });
    console.log("dataParamsMerged",dataParamsMerged);
    dataParamFilePromises = yield all(dataParamsMerged.map((paramFile) => call(retrieveFile,path.join(dataParamsPath,paramFile.name),paramFile)));
    console.log("dataParamFilePromises",dataParamFilePromises);
    fileDataParams = yield all(dataParamFilePromises.map(({retrievedFile,mergeWith}) => call(mergeContentWithDataParam,retrievedFile,mergeWith)));
    console.log("fileDataParams",fileDataParams);
    finalDataParams = {};

    fileDataParams.forEach((final) => {
      finalDataParams[final.id] = final;
    });

    yield put(eonDetailActions.FETCH_DATA_PARAMS_SUCCESS(finalDataParams));
  } catch (e) {
    console.log("Failed to fetch data params...", e);
    yield put(eonDetailActions.FETCH_DATA_PARAMS_FAILED(e));
    yield delay(2000);

    dataParamResults = yield call(handleFetchDataParams);
  }

}

function* handleBootstrapEON() {
  yield call(getPrivateKey);
  yield call(connect);
  yield put(eonDetailActions.FETCH_AUTH_FILE());
  yield put(eonDetailActions.FETCH_DATA_PARAMS());
}

function* handleSelectEon() {
  const { eonDetail } = yield select();
  const { activeTab } = eonDetail;
  console.log("SELECTED EON!");
  yield put(push(routes.EON_DETAIL));
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
  let {retrievedFile} = yield call(retrieveFile,payload.filePath);
  // console.log(retrievedFile);
  let fileContent = yield toString(retrievedFile);
  console.log("Fetched file...",retrievedFile);
  yield put(fileListActions.FETCH_FILE_SUCCESS({
    ...retrievedFile,
    ...payload,
    isDirty: false,
    _original: "" + fileContent,
    content: "" + fileContent
  }));
}

function* handleShowRoute({type, payload}) {
  console.log(arguments);
  const routeId = payload;
  // need to fetch filelinks;
  try {
    yield getFileLinks({type: types.FETCH_ROUTE_FILE_LINKS, payload: routeId});
    //get updated route info with filelinks;
    console.log("Fetching file links...", routeId);
    yield put(eonDetailActions.SHOW_ROUTE_SUCCESS(routeId));
  } catch (e) {
    console.log("Failed to SHOW ROUTE", e);
    yield put(eonDetailActions.SHOW_ROUTE_FAILED(e));
  }
}

function* handleFetchDirectorySuccess() {
}

// EXPORT ROOT SAGA
export function* eonSagas() {
  yield all([
    takeLatest(types.RUN_COMMAND, handleRunCommand),
    takeLatest(eonListTypes.SELECT_EON, handleSelectEon),
    // takeEvery(types.CONNECT_FAILED, addEonListError),
    takeEvery(types.BOOTSTRAP_EON, handleBootstrapEON),
    takeEvery(fileListActionTypes.SAVE_ACTIVE_FILE, saveActiveFile),
    takeEvery(fileListActionTypes.FETCH_DIRECTORY, handleFetchDirectory),
    takeEvery(fileListActionTypes.FETCH_FILE, handleFetchFile),
    // takeEvery(fileListActionTypes.FETCH_DIRECTORY_SUCCESS, handleFetchDirectorySuccess),
    takeEvery(types.FETCH_DATA_PARAMS, handleFetchDataParams),
    takeEvery(types.FETCH_PROFILE, getProfile),
    takeEvery(types.FETCH_ROUTES, getRoutes),
    takeEvery(types.FETCH_DEVICES, getDevices),
    takeEvery(types.FETCH_LOGS, getLogs),
    takeEvery(types.FETCH_SEGMENTS, getSegments),
    takeEvery(types.FETCH_ANNOTATIONS, getAnnotations),
    takeEvery(types.FETCH_ROUTE_FILE_LINKS, getFileLinks),
    takeEvery(types.FETCH_AUTH_FILE, handleFetchAuthFile),
    takeEvery(types.SHOW_ROUTE, handleShowRoute)
    // throttle(250,types.MESSAGE_RECEIVED,handleMessage),
  ]);
}
