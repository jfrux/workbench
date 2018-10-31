import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JSONPretty from 'react-json-pretty';
import stateListGroupTypes from './StateListGroup/Types';
import LoadingOverlay from '../../LoadingOverlay';
import zmq from 'zeromq';
import { Button, ButtonGroup, ButtonToolbar, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
// const JsonTable = require('ts-react-json-table');
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
    this.state = {
      messageCount: 0,
      messages: [],
      messagesCsv: null,
      data: null,
      waiting: true,
      sampling: false
    };
  }
  // USED TO CLEAN UP JSON STREAM
  // replacer(key, value) {
  //   // Filtering out properties
  //   // console.log(key, typeof value);
  //   if (typeof value === 'buffer') {
  //     return value.join("");
  //   }
  //   return value;
  // }
  onMessageReceived = (event_message) => {
    const msg = new EventMessage(event_message);
    const jsonData = JSON.parse(JSON.stringify(msg))[this.props.group.key];
    const state = this.state;
    let parsedJson;
    let newState = {
      ...state,
      waiting: false,
      data: jsonData,
      messageCount: this.state.messageCount+1
    };
    if (this.state.sampling) {
      newState.messages.push(jsonData);
      
      newState = {
        ...newState,
        messages: newState.messages
      };

      parsedJson = this.jsonParser.parse(newState.messages);

      newState = {
        ...newState,
        messagesCsv: parsedJson
      };
    }
    // console.log(JSON.stringify(jsonData));
      
    this.setState(newState);
  }
  clearSampling = () => {
    this.setState({
      messages: []
    });
  }
  toggleSampling = () => {
    this.setState({
      sampling: !this.state.sampling
    });
  }
  componentDidMount(props) {
    const { type, eon, group } = this.props;
    const { fields } = group;

    this.jsonParser = new Json2csvParser({ fields });
    this.sock = zmq.socket('sub');
    this.sock.subscribe('');
    this.addr = `tcp://${eon.ip}:${group.port}`;
    this.sock.on('message', this.onMessageReceived);
    this.sock.connect(this.addr);
  }
  componentWillUnmount() {
    this.sock.disconnect(this.addr);
  }
  render() {
    const { waiting, data, messageCount, messagesCsv, sampling } = this.state;
    let loadingMessage = "Waiting for messages...";
    
    if (waiting) {
      return <LoadingOverlay message={loadingMessage} />;
    }
    
    if (!waiting && data) {
      return (<div>
        <ButtonToolbar>
          <ButtonGroup className={"mr-2"}>
            <Button onClick={this.toggleSampling}>
              {sampling && 
                <FontAwesomeIcon icon="pause" style={{color: '#FFF' }} />
              }
              {!sampling && 
                <FontAwesomeIcon icon="circle" style={{color: 'RED' }} />
              }
            </Button>
          </ButtonGroup>
          <ButtonGroup className={"mr-2"}>
            <Button onClick={this.clearSampling}  disabled={!messageCount}>
              <FontAwesomeIcon icon="undo" />
            </Button>
          </ButtonGroup>
          <ButtonGroup className={"mr-2"}>
          </ButtonGroup>
        </ButtonToolbar>
        <div>Messages received: {messageCount}</div>
        {messagesCsv && 
          <Input type="textarea" className={"messages-output"} value={messagesCsv} name="messagesCsv" id="messagesCsv" readOnly />
        }
        <JSONPretty json={JSON.parse(JSON.stringify(data))} />
      </div>);
    } else {
      return (<div></div>);
    }
  }
}

export default StateList;