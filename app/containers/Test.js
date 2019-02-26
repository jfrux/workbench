import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EonDetail from '../components/EonDetail';
import * as NetworkConnectionActions from '../actions/network_connection_actions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import rpc from '../rpc-client';
import ReactJson from 'react-json-view';
import * as types from '../constants/zmq_action_types';
import ReactList from 'react-list';
import serviceList from '../constants/service_list.yaml';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { initializeFileTypeIcons } from '@uifabric/file-type-icons';
// import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { faFile, faCaretRight, faCaretDown, faStream, faCode, faTerminal, faPause, faTimes, faPlay, faUndo, faCheck, faCircle, faQuestion, faSync, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import settings from 'electron-settings';
library.add(faFile, faCaretRight, faCaretDown, faStream, faCode, faTerminal, faPause, faTimes, faUndo, faPlay, faCheck, faCircle, faGithub, faQuestion, faSync, faChevronLeft, faPlus, faChevronRight);
initializeIcons(/* optional base url */);
initializeFileTypeIcons();
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(NetworkConnectionActions, dispatch);
}
import connectSockets from 'socket.io-client';
class Test extends React.PureComponent {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      service: "carControl",
      messagesReceived: 0,
      fields: [],
      messages: [],
      latestMessage: {}
    };
  }
  componentDidMount() {
    console.log("Attempting to connect to ZMQ.");
    const { service } = this.state;
    this.socket = connectSockets('http://localhost:12000');
    this.socket.on('connect', () => {
      console.log("Connected to ZMQ");
      this.socket.on(types.MESSAGE, (data) => {
        console.log("message:",data[service]);
        this.setState({
          ...data[service],
          messagesReceived: this.state.messages.length
        });
        console.warn(this.state.messagesReceived);
        console.clear();
      });
      this.socket.emit(types.DISCONNECT, "10.168.3.13", serviceList[service]);
      this.socket.emit(types.CONNECT, "10.168.3.13", serviceList[service]);
    });
  }
  renderItem = (index, key) => {
    return <div key={key}>{this.state.messages[index].AccelOverride}</div>;
  }
  //$ cd /data/openpilot/openpilot_tools && replay/unlogger.py '0812e2149c1b5609|2019-02-18--06-11-10' /data/media/0/realdata/
  render() {
    const { latestMessage, messagesReceived } = this.state;
    return (<div>
        {JSON.stringify(latestMessage,null,2)}
      </div>)
  }
}

export default Test;
