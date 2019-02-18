import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EonDetail from '../components/EonDetail';
import * as EonActions from '../actions/eon_detail_actions';
import services from '../constants/service_list.yaml';
import {getHasOpenedFiles} from '../selectors/get_opened_files_keys';
import getSortedServiceIds from '../selectors/get_sorted_service_ids';
// import { debugOnlyWastedRenderDetector } from "wastedrendersdetector";

function mapStateToProps({eonDetail,eonList,networkConnection}) {
  // let hasOpenedFiles = getHasOpenedFiles(fileList.openedFiles);
  let serviceIds = getSortedServiceIds();
  return {
    activeTab: eonDetail.activeTab,
    activeCommand: eonDetail.activeCommand,
    selectedEon: eonList.selectedEon,
    terminalPort: eonList.terminalPort,
    eon: eonList.eons[eonList.selectedEon],
    network: networkConnection.status,
    networkIp: networkConnection.ip,
    connecting: eonDetail.connecting,
    connected: eonDetail.connected,
    serviceIds,
    services
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EonDetail);
