import { createSelector } from 'reselect';
// selector
const getMessageCount = ({ zmq, eonDetail }) => {
  if (zmq.data && zmq.data[eonDetail.activeTab]) {
    if (zmq.data[eonDetail.activeTab].messages) {
      return zmq.data[eonDetail.activeTab].messages.length;
    }
  }
};
// reselect function
export const getMessageCountState = createSelector(
  [ getMessageCount ],
  (messageCount) => messageCount
)

// STATE LIST DEPTH
const getDepth = ({ ui }) => {
  if (ui && ui.stateListDepth) {
    return ui.stateListDepth;
  }
}

export const getDepthState = createSelector(
  [ getDepth ],
  (depth) => depth
)

// ACTIVE STATE LIST
const getActiveTab = ({ eonDetail }) => {
  // console.log("getActiveTab:", eonDetail.activeTab);
  return eonDetail.activeTab;
}

export const getActiveTabState = createSelector(
  [ getActiveTab ],
  (activeTab) => {
    // console.log("getActiveTabState:", activeTab);
    return activeTab;
  }
);

// ZMQ PAUSED
const getZmqPaused = ({ zmq }) => {
  return zmq.paused;
};

export const getZmqPausedState = createSelector(
  [ getZmqPaused ],
  (paused) => paused
)
// ZMQ SORTED SERVICE IDS
const getZmqServicesIdsSorted = ({ zmq }) => {
  return zmq.serviceIds
}

export const getZmqServicesIdsSortedState = createSelector(
  [ getZmqServicesIdsSorted ],
  (services) => services
)
// ZMQ SERVICES
const getZmqServices = ({ zmq }) => {
  return zmq.services;
}

export const getZmqServicesState = createSelector(
  [ getZmqServices ],
  (services) => services
)

const getZmqData = ({ eonDetail, zmq }) => {
  return zmq.data[eonDetail.activeTab];
}

export const getZmqDataState = createSelector(
  [ getZmqData ],
  (data) => data
)
