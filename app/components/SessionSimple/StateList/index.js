import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StateListItem from './StateListItem';
import LoadingOverlay from '../../LoadingOverlay';
import services from '../../../constants/service_list.yaml';
import JSONPretty from 'react-json-pretty';
import ReactJson from 'react-json-view';
import * as ZmqActions from '../../../actions/zmq_actions';
// import { ListGroup, Card, CardHeader, CardBody } from 'reactstrap'
import StateListToolbar from './StateListToolbar';
const propTypes = {
  messageCount: PropTypes.number,
  // messages: PropTypes.array,
  // messagesFile: PropTypes.string,
  // latestMessage: PropTypes.object,
  // sampling: PropTypes.bool,
  data: PropTypes.any,
  type: PropTypes.string,
  depth: PropTypes.number
};

class StateList extends React.PureComponent {
  service = services[this.props.type]
  
  componentDidMount(props) {
    this.props.CONNECT(this.props.type);
  }
  componentWillUnmount() {
    this.props.DISCONNECT(this.props.type);
  }
  render() {
    let { type, data, depth, messageCount } = this.props;
 
    let loadingMessage = "Waiting for messages...";
    
    if (!data || messageCount <= 0) {
      return <LoadingOverlay message={loadingMessage} />;
    }
    
    if (data) {
      return (
        <div>
          <div className={"state-toolbar"}>
            <StateListToolbar type={type} />
          </div>
          <div className={"state-data"}>
            <ReactJson 
              name={type} 
              src={data} 
              collapsed={depth} 
              style={{
                backgroundColor: '#000', 
                opacity: 1
              }}
              theme="brewer" />
          </div>
        </div>
      );
      return (<div><JSONPretty json={JSON.parse(JSON.stringify(data))} /></div>);
    } else {
      return (<div></div>);
    }
  }
}

StateList.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ZmqActions, dispatch);
}

const mapStateToProps = (state, {type}) => {
  let data;
  let messageCount = 0;
  let depth = 1;
  if (state.zmq.data && state.zmq.data[type]) {
    if (state.zmq.data[type].messages) {
      messageCount = state.zmq.data[type].messages.length;
    }
  }
  if (state.zmq.data && state.zmq.data[type] && state.zmq.data[type].latestMessage) {
    data = state.zmq.data[type].latestMessage;
  }
  if (state.ui && state.ui.stateListDepth >= 0) {
    depth = state.ui.stateListDepth;
  }
  return {
    data,
    messageCount,
    depth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateList);