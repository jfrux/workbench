import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Session from '../components/Session';
import * as EonActions from '../actions/eon_detail_actions';
import {getHasOpenedFiles} from '../selectors/get_opened_files_keys';
// import { debugOnlyWastedRenderDetector } from "wastedrendersdetector";

function mapStateToProps({ eonDetail, fileList, networkConnection, eonList }) {
  // let hasOpenedFiles = getHasOpenedFiles(fileList.openedFiles);
  // activeTab,activeFile, connecting, activeCommand, network, eon, serviceIds
  return {
    activeTab: eonDetail.activeTab,
    activeFile: fileList.activeFile,
    connecting: eonDetail.connecting,
    activeCommand: eonDetail.activeCommand,
    network: networkConnection.status,
    eon: eonList.eons[eonList.selectedEon]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Session);
