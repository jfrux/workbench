import path from 'path';
export const API_BASE_URL = "https://api.commadotai.com/v1";

// export const VIDEO_BASE_URL = "https://video.comma.ai/hls";
export const VIDEO_BASE_URL = "https://my-comma-video.azureedge.net/hls";
export const THUMBNAIL_BASE_URL = "https://chffrprivate-vzn.azureedge.net/chffrprivate3/v2";
export const API_PROFILE_PATH = "/me/";
export const API_DEVICE_PATH = "devices/{{dongleId}}";

export function thumbnail_url() {
  return path.join(THUMBNAIL_BASE_URL,"{{dongleId}}/{{routeId}}/sec{{segmentNumber}}-{{size}}.jpg");
}

export function video_url() {
  return path.join(THUMBNAIL_BASE_URL,"{{dongleId}}/{{routeId}}/index.m3u8?v=2&s={{segmentNumber}}");
}

export function api_url(...paths) {
  return path.join(API_BASE_URL,...paths);
}

export function files_url() {
  return api_url("route/{{routeId}}/files");
}

export function profile_url(...paths) {
  return api_url(path.join(API_PROFILE_PATH,...paths));
}

export function device_url(...paths) {
  return api_url(path.join(API_DEVICE_PATH,...paths));
}

export const ENDPOINTS = {
     "profile" : profile_url(),
      "routes" : profile_url("routes"),
     "devices" : profile_url("devices"),
        "logs" : api_url("route/{{fullname}}"),
    "segments" : device_url("segments?from={{startTime}}&to={{endTime}}"),
 "annotations" : device_url("annotations/?from={{startTime}}&to={{endTime}}"),
       "video" : video_url(),
   "thumbnail" : thumbnail_url(),
       "files" : files_url()
};