import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ConnectEon from '../components/ConnectEon';
import * as ConnectEonActions from '../actions/connect_eon';

function mapStateToProps(state) {
  return {
    scanNetwork: state.connectEon.scanNetwork,
    scanResults: state.connectEon.scanResults,
    scanError: state.connectEon.scanError,
    scanning: state.connectEon.scanning,
    status: state.connectEon.status
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConnectEonActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectEon);
