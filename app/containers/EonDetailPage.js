import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EonDetail from '../components/EonDetail';
import * as EonActions from '../actions/eon_detail_actions';

function mapStateToProps(state) {
  const connectedProcesses = {
    controlsd: state.eonDetail.controlsd,
    controlsd: state.eonDetail.controlsd,
    visiond: state.eonDetail.visiond,
    sensord: state.eonDetail.sensord,
    orbd: state.eonDetail.orbd,
    ubloxd: state.eonDetail.ubloxd
  };

  const standardProcesses = {
    updated: state.eonDetail.updated,
    logcatd: state.eonDetail.logcatd,
    pandad: state.eonDetail.pandad,
    thermald: state.eonDetail.thermald,
    gpsd: state.eonDetail.gpsd,
    ui: state.eonDetail.ui,
    uploader: state.eonDetail.uploader,
    tombstoned: state.eonDetail.tombstoned,
    logmessaged: state.eonDetail.logmessaged
  }

  const thermal = {
    cpu0: state.eonDetail.cpu0,
    cpu1: state.eonDetail.cpu1,
    cpu2: state.eonDetail.cpu2,
    cpu3: state.eonDetail.cpu3,
    mem: state.eonDetail.mem,
    gpu: state.eonDetail.gpu,
    bat: state.eonDetail.bat,
    usbOnline: state.eonDetail.usbOnline,
    logMonoTime: state.eonDetail.logMonoTime,
    freeSpace: state.eonDetail.freeSpace,
    batteryPercent: state.eonDetail.batteryPercent,
    batteryStatus: state.eonDetail.batteryStatus,
    fanSpeed: state.eonDetail.fanSpeed,
    started: state.eonDetail.started,
    startedTs: state.eonDetail.startedTs,
    thermalStatus: state.eonDetail.thermalStatus,
    batteryCurrent: state.eonDetail.batteryCurrent,
    batteryVoltage: state.eonDetail.batteryVoltage
  }

  return {
    status: state.eonDetail.status,
    eon: state.eonList.selectedEon,
    pid: state.eonDetail.pid,
    fetchingPid: state.eonDetail.fetchingPid,
    tmuxAttached: state.eonDetail.tmuxAttached,
    tmuxError: state.eonDetail.tmuxError,
    tmuxLog: state.eonDetail.tmuxLog,
    tmuxStartedAt: state.eonDetail.tmuxStartedAt,
    network: state.networkConnection.status,
    vehicleConnection: state.eonDetail.vehicleConnection,
    standardProcesses,
    thermal,
    connectedProcesses
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EonDetail);
