import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Eons from '../components/EonList';

import * as networkScannerActions from '../actions/network_scanner_actions';
import * as eonListActions from '../actions/eon_list_actions';
import * as uiActions from '../actions/ui_actions';

function mapStateToProps(state) {
  const { eonList, networkScanner, networkConnection } = state;
  const { eons, unresolvedEons } = eonList;
  const { selectedEon, error, eonToAdd, addingEon } = eonList;
  const { scanResults, scanError, scanning, foundCount, status, progress } = networkScanner;
  const eonIds = Object.keys(eons);
  const unresolvedEonIds = Object.keys(unresolvedEons);
  return {
    addingEon,
    eonToAdd,
    error,
    scanResults,
    scanError,
    scanning,
    foundCount,
    status,
    selectedEon,
    networkIp: networkConnection.ip,
    network: networkConnection.status,
    progress,
    eonIds,
    unresolvedEonIds
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...eonListActions,...networkScannerActions,...uiActions},dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Eons);
