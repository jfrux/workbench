import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JSONPretty from 'react-json-pretty';
import stateListGroupTypes from './StateListGroup/Types';
import { getItemsState } from '../../../selectors/state_list_selectors';
import LoadingOverlay from '../../LoadingOverlay';
import zmq from 'zeromq';
var inflection = require( 'inflection' );
import serviceList from '../../../constants/service_list.yaml';
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
    const jsonData = JSON.parse(JSON.stringify(msg.toJSON()))[this.props.type] ;
    this.setState({
      waiting:false,
      data: jsonData,
      messageCount: this.state.messageCount+1
    });
  }
  componentDidMount(props) {
    const { type, eon } = this.props;
    const service = serviceList[inflection.camelize(type,true)];
    this.sock = zmq.socket('sub');
    this.sock.subscribe('');
    this.addr = `tcp://${eon.ip}:${service[0]}`;
    // this.sock.on('exit',onClose);
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
    // let { rootKeys, items, rootKeyToComponent } = this.props;
    // rootKeys = rootKeys.sort();
    
    // let rootBlocks = rootKeys.map((key) => {
    //   if (!key) {
    //     console.warn("Received an empty key...");
    //     return;
    //   }

    //   const rootData = this.props[key];
    //   const rootComponentKey = rootKeyToComponent[key];
      
    //   if (rootComponentKey) {
    //     const StateListGroupTag = this.components[rootComponentKey];
    //     return (<StateListGroupTag key={key} rootKey={key} data={rootData} />);
    //   } else {
    //     console.warn(`No component could be found for rootKey ${key}`)
    //     return (<StateListGroup key={key} rootKey={key} data={rootData} />);
    //   }
    // });
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

// function mapStateToProps(state,ownProps) {
//   const eon = state.eonDetail.eon;
//   // const itemsState = state.eonDetail[ownProps.type];
//   return {
//     eon
//   };
// }

// export default connect(
//   mapStateToProps
// )(StateList);

export default StateList