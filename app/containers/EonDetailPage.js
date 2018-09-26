import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EonDetail from '../components/EonDetail';
import * as EonActions from '../actions/eon_detail_actions';

function mapStateToProps(state) {
  const healthState = state.eonDetail.health;
  const serviceState = state.eonDetail.service;
  const thermalState = state.eonDetail.thermal;

  return {
    sshConnectionError: state.eonList.sshConnectionError,
    sshConnectionStatus: state.eonList.sshConnectionStatus,
    status: state.eonDetail.status,
    eon: state.eonList.scanResults[state.eonList.selectedEon],
    pid: state.eonDetail.pid,
    fetchingPid: state.eonDetail.fetchingPid,
    tmuxAttached: state.eonDetail.tmuxAttached,
    tmuxError: state.eonDetail.tmuxError,
    tmuxLog: state.eonDetail.tmuxLog,
    tmuxStartedAt: state.eonDetail.tmuxStartedAt,
    network: state.networkConnection.status,
    networkIp: state.networkConnection.ip,
    vehicleConnection: state.eonDetail.vehicleConnection,
    healthState,
    thermalState,
    serviceState
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EonDetail);
