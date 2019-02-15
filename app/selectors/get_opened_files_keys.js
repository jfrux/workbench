import { createSelector } from 'reselect'

const getOpenedFilesKeys = (openedFiles) => {
  return Object.keys(openedFiles);
};

export const getOpenedFilesKeysSelector = createSelector(
  [getOpenedFilesKeys],
  (openedFiles) => {
    return openedFiles;
  }
)

export const getHasOpenedFiles = createSelector(
  [getOpenedFilesKeysSelector],
  (keys) => {
    return keys.length > 0;
  }
)

// export default getOpenedFilesKeysSelector;