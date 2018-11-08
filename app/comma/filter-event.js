import capnpLog from '../capnp/log.capnp';

export function filterEvent(which) {
    switch (which) {
        case capnpLog["Event_Which"].MODEL:
        case capnpLog["Event_Which"].LIVE20:
        case capnpLog["Event_Which"].LIVE100:
        case capnpLog["Event_Which"].LIVE_MPC:
        case capnpLog["Event_Which"].INIT_DATA:
        case capnpLog["Event_Which"].CAR_STATE:
        case capnpLog["Event_Which"].LIVE_CALIBRATION:
            return true;
        default:
            return false;
    }
}