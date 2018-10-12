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
    status: state.eonDetail.status,
    selectedEon: state.eonList.selectedEon,
    eon: state.eonList.eons[state.eonList.selectedEon],
    network: state.networkConnection.status,
    networkIp: state.networkConnection.ip,
    vehicleConnection: state.eonDetail.vehicleConnection,
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
