import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EonDetail from '../components/EonDetail';
import * as EonActions from '../actions/eon_detail_actions';

function mapStateToProps(state) {
  return {
    messagesReceived: state.eonDetail.messagesReceived,
    connected: state.eonDetail.connected,
    connecting: state.eonDetail.connecting,
    activeTab: state.eonDetail.activeTab,
    installing: state.eonDetail.installing,
    installError: state.eonDetail.installError,
    selectedEon: state.eonList.selectedEon,
    eon: state.eonList.eons[state.eonList.selectedEon],
    network: state.networkConnection.status,
    networkIp: state.networkConnection.ip,
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
