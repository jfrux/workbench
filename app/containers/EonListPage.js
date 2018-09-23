import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Eons from '../components/EonList';
import * as eonListActions from '../actions/eon_list_actions';

function mapStateToProps(state) {
  return {
    sshConnectionStatus: state.eonList.sshConnectionStatus,
    sshConnectionError: state.eonList.sshConnectionError,
    scanNetwork: state.eonList.scanNetwork,
    scanResults: state.eonList.scanResults,
    scanError: state.eonList.scanError,
    scanning: state.eonList.scanning,
    status: state.eonList.status,
    networkIp: state.networkConnection.ip,
    network: state.networkConnection.status,
    progress: state.eonList.progress
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(eonListActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Eons);
