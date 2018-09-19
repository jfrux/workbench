import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EonDetail from '../components/EonDetail';
import * as EonActions from '../actions/eon_detail_actions';

function mapStateToProps(state) {
  return {
    status: state.eonDetail.status,
    eon: state.eonList.selectedEon,
    pid: state.eonDetail.pid,
    fetchingPid: state.eonDetail.fetchingPid,
    tmuxAttached: state.eonDetail.tmuxAttached,
    tmuxError: state.eonDetail.tmuxError,
    tmuxLog: state.eonDetail.tmuxLog,
    tmuxStartedAt: state.eonDetail.tmuxStartedAt,
    updated: state.eonDetail.updated,
    logcatd: state.eonDetail.logcatd,
    pandad: state.eonDetail.pandad,
    thermald: state.eonDetail.thermald,
    ui: state.eonDetail.ui,
    uploader: state.eonDetail.uploader,
    tombstoned: state.eonDetail.tombstoned,
    logmessaged: state.eonDetail.logmessaged,
    controlsd: state.eonDetail.controlsd,
    gpsd: state.eonDetail.gpsd,
    vehicleConnection: state.eonDetail.vehicleConnection,
    logMonoTime: state.eonDetail.logMonoTime,
    thermal: state.eonDetail.thermal,
    cpu0: state.eonDetail.cpu0,
    cpu1: state.eonDetail.cpu1,
    cpu2: state.eonDetail.cpu2,
    cpu3: state.eonDetail.cpu3,
    mem: state.eonDetail.mem,
    gpu: state.eonDetail.gpu,
    bat: state.eonDetail.bat,
    freeSpace: state.eonDetail.freeSpace,
    batteryPercent: state.eonDetail.batteryPercent,
    batteryStatus: state.eonDetail.batteryStatus,
    fanSpeed: state.eonDetail.fanSpeed,
    started: state.eonDetail.started,
    usbOnline: state.eonDetail.usbOnline,
    startedTs: state.eonDetail.startedTs,
    thermalStatus: state.eonDetail.thermalStatus,
    batteryCurrent: state.eonDetail.batteryCurrent,
    batteryVoltage: state.eonDetail.batteryVoltage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EonDetail);
