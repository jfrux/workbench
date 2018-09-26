import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EonDetail from '../components/EonDetail';
import * as EonActions from '../actions/eon_detail_actions';

function mapStateToProps(state) {
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
    thermal: state.eonDetail.thermal,
    health: state.eonDetail.health,
    gpsLocation: state.eonDetail.gpsLocation,
    currentStateKeys: state.eonDetail.currentStateKeys
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EonDetail);
