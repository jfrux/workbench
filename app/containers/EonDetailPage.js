import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EonDetail from '../components/EonDetail';
import * as EonActions from '../actions/eon_detail_actions';

function mapStateToProps(state) {
  return {
    activeTab: state.eonDetail.activeTab,
    devices: state.eonDetail.devices,
    drives: state.eonDetail.drives,
    installing: state.eonDetail.installing,
    stateRequestFatal: state.eonDetail.stateRequestFatal,
    stateRequestAttempts: state.eonDetail.stateRequestAttempts,
    installError: state.eonDetail.installError,
    isLoggedIn: state.eonDetail.auth ? state.eonDetail.auth.isLoggedIn : false,
    sshConnectionError: state.eonList.sshConnectionError,
    sshConnectionStatus: state.eonList.sshConnectionStatus,
    status: state.eonDetail.status,
    sshStatus: state.eonDetail.sshStatus,
    eon: state.eonList.eons[state.eonList.selectedEon],
    pid: state.eonDetail.pid,
    fetchingPid: state.eonDetail.fetchingPid,
    tmuxAttached: state.eonDetail.tmuxAttached,
    tmuxError: state.eonDetail.tmuxError,
    tmuxLog: state.eonDetail.tmuxLog,
    tmuxStartedAt: state.eonDetail.tmuxStartedAt,
    network: state.networkConnection.status,
    networkIp: state.networkConnection.ip,
    vehicleConnection: state.eonDetail.vehicleConnection,
    thermal: state.eonDetail.thermal,
    health: state.eonDetail.health,
    carState: state.eonDetail.carState,
    carControl: state.eonDetail.carControl,
    gpsLocation: state.eonDetail.gpsLocation,
    fingerprint: state.eonDetail.fingerprint,
    currentStateKeys: state.eonDetail.currentStateKeys,
    fingerprintString: state.eonDetail.fingerprintString
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EonDetail);
