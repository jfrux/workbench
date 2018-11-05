import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EonDetail from '../components/EonDetail';
import * as EonActions from '../actions/eon_detail_actions';
import services from '../constants/service_list.yaml';
function mapStateToProps(state) {
  return {
    activeTab: state.eonDetail.activeTab,
    activeCommand: state.eonDetail.activeCommand,
    selectedEon: state.eonList.selectedEon,
    eon: state.eonList.eons[state.eonList.selectedEon],
    network: state.networkConnection.status,
    networkIp: state.networkConnection.ip,
    serviceIds: Object.keys(services).sort(),
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
