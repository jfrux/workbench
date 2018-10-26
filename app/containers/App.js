import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EonDetail from '../components/EonDetail';
import * as NetworkConnectionActions from '../actions/network_connection_actions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faPause, faUndo, faCheck, faCircle, faTimesOctagon, faSync, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/pro-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(faPause,faUndo, faCheck,faCircle, faGithub, faTimesOctagon, faSync, faChevronLeft, faPlus, faChevronRight);

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(NetworkConnectionActions, dispatch);
}
class App extends React.Component {
  componentDidMount() {
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