import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EonDetail from '../components/EonDetail';
import * as NetworkConnectionActions from '../actions/network_connection_actions';

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