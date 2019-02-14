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