import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
export default {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [
    'router',
    'fileList',
    'networkConnection',
    'eonDetail',
    'eonList.scanning',
    'eonList.scanError',
    'eonList.error',
    'eonList.sshConnectionStatus',
    'eonList.sshConnectionError',
    'eonList.progress'
  ]
};