import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EonDetail from '../components/EonDetail';
import * as NetworkConnectionActions from '../actions/network_connection_actions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import notify from '../utils/notify';
import { faPause, faTimes, faPlay, faUndo, faCheck, faCircle, faQuestion, faSync, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import settings from 'electron-settings';
library.add(faPause, faTimes, faUndo, faPlay, faCheck, faCircle, faGithub, faQuestion, faSync, faChevronLeft, faPlus, faChevronRight);

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(NetworkConnectionActions, dispatch);
}
class App extends React.Component {
  componentDidMount() {
    settings.watch("config",() => {
      
      notify('Workbench config updated!');
    });
    settings.watch("keymaps",() => {
      notify('Workbench keymaps updated!');
    });
    settings.watch("eonSshKeyPath",() => {
      notify('Workbench SSH Key Path updated!', 'Disconnect / reconnect to EON to use new key.');
    });
    this.props.setupNetworkEvents();
  }
  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);