import * as types from '../constants/file_list_action_types';

export function TOGGLE_VISIBILITY(filePath) {
  return {
    type: types.TOGGLE_VISIBILITY,
    payload: filePath
  };
}
export function FETCH_DIRECTORY(directory) {
  return {
    type: types.FETCH_DIRECTORY,
    payload: directory
  };
}
export function FETCH_DIRECTORY_SUCCESS(files) {
  console.log(files);
  return {
    type: types.FETCH_DIRECTORY_SUCCESS,
    payload: files
  };
}
export function FETCH_FILE(file) {
  return {
    type: types.FETCH_FILE,
    payload: file
  };
}
export function FETCH_FILE_SUCCESS(file) {
  return {
    type: types.FETCH_FILE_SUCCESS,
    payload: file
  };
}
export function UPDATE_CONTENT(filePath,content) {
  return {
    type: types.UPDATE_CONTENT,
    payload: {
      filePath,
      content
    }
  };
}
export function SAVE_ACTIVE_FILE() {
  return {
    type: types.SAVE_ACTIVE_FILE
  };
}

export function SAVE_ACTIVE_FILE_SUCCESS() {
  return {
    type: types.SAVE_ACTIVE_FILE_SUCCESS
  };
}
export function CLOSE_FILE(file) {
  return {
    type: types.CLOSE_FILE,
    payload: file
  };
}