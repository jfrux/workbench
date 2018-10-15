import * as types from '../constants/system_action_types';
import settings from 'electron-settings';
import humanizeDuration from 'humanize-duration';
const initialState = {
  "network": null,
  "uptime": null,
  "avg_load": null, //ie. "5.88 5.86 5.80 5/1392 28921"
  "system": null,
  "memory": null
};
const sufixes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const getBytes = (bytes) => {
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return !bytes && '0 Bytes' || (bytes / Math.pow(1024, i)).toFixed(2) + " " + sufixes[i];
};
export default function systemReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE:
      // console.log("actionPayload",action.payload);
      return {
        ...state,
        ...action.payload,
        uptimeFriendly: humanizeDuration(action.payload.uptime*1000),
        networkUsage: action.payload.network.wlan0 ? {
          rx: action.payload.network.wlan0[0],
          rxFriendly: getBytes(action.payload.network.wlan0[0]),
          tx: action.payload.network.wlan0[1],
          txFriendly: getBytes(action.payload.network.wlan0[1])
        } : null
      };
    default:
      return state;
  }
}