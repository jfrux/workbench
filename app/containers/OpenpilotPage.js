import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Openpilot from '../components/Openpilot';
import * as OpenpilotActions from '../actions/openpilot';

function mapStateToProps(state) {
  return {
    status: state.openpilot.status,
    eon: state.connectEon.selectedEon,
    pid: state.openpilot.pid,
    fetchingPid: state.openpilot.fetchingPid,
    tmuxAttached: state.openpilot.tmuxAttached,
    tmuxError: state.openpilot.tmuxError,
    tmuxLog: state.openpilot.tmuxLog,
    tmuxStartedAt: state.openpilot.tmuxStartedAt,
    updated: state.openpilot.updated,
    logcatd: state.openpilot.logcatd,
    pandad: state.openpilot.pandad,
    thermald: state.openpilot.thermald,
    ui: state.openpilot.ui,
    uploader: state.openpilot.uploader,
    tombstoned: state.openpilot.tombstoned,
    logmessaged: state.openpilot.logmessaged,
    controlsd: state.openpilot.controlsd,
    gpsd: state.openpilot.gpsd,
    vehicleConnection: state.openpilot.vehicleConnection
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(OpenpilotActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Openpilot);
