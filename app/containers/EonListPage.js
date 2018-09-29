import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Eons from '../components/EonList';
import * as networkScannerActions from '../actions/network_scanner_actions';
import * as eonListActions from '../actions/eon_list_actions';
function mapStateToProps(state) {
  return {
    scanResults: state.networkScanner.scanResults,
    scanError: state.networkScanner.scanError,
    scanning: state.networkScanner.scanning,
    status: state.networkScanner.status,
    selectedEon: state.eonList.selectedEon,
    networkIp: state.networkConnection.ip,
    network: state.networkConnection.status,
    progress: state.networkScanner.progress,
    eons: state.eonList.eons
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...eonListActions,...networkScannerActions},dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Eons);
