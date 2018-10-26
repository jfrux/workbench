import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JSONPretty from 'react-json-pretty';
import stateListGroupTypes from './StateListGroup/Types';
import { getItemsState } from '../../../selectors/state_list_selectors';
import LoadingOverlay from '../../LoadingOverlay';
import zmq from 'zeromq';
const EventMessage = require('../../../messages/event');

const propTypes = {
  type: PropTypes.string,
  items: PropTypes.array,
  eon: PropTypes.object
};

class StateList extends Component {
  components = stateListGroupTypes
  constructor(props) {
    super(props);
    this.sock = zmq.socket('sub');
    this.state = {};
  }
  onMessageReceived = (event_message) => {
    const msg = new EventMessage(event_message);
    const jsonData = JSON.parse(JSON.stringify(msg.toJSON()))[this.props.group.key];
    console.warn(`jsonData`,jsonData);

    this.setState({
      waiting:false,
      data: jsonData,
      messageCount: this.state.messageCount+1
    });
  }
  componentDidMount(props) {
    const { type, eon, group } = this.props;
    // const service = serviceList[inflection.camelize(type,true)];
    this.sock = zmq.socket('sub');
    this.sock.subscribe('');
    this.addr = `tcp://${eon.ip}:${group.port}`;
    // this.sock.on('exit',onClose);
    console.warn(`Connecting to ${this.addr}`)
    this.sock.on('message', this.onMessageReceived);
    this.setState({
      waiting: true,
      messageCount: 0
    });
    this.sock.connect(this.addr);
  }
  componentWillUnmount() {
    this.sock.disconnect(this.addr);
  }
  render() {
    const { waiting, data } = this.state;
    let loadingMessage = "Waiting for messages...";

    if (waiting) {
      return <LoadingOverlay message={loadingMessage} />;
    }

    if (!waiting && data) {
      return (<div><JSONPretty id="json-pretty" json={data}></JSONPretty></div>);
    } else {
      return (<div></div>);
    }
  }
}

export default StateList;