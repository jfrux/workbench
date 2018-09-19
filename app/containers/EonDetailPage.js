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
    vehicleConnection: state.eonDetail.vehicleConnection
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EonDetail);
