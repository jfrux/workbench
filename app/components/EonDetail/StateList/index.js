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
// <ReactJson
//               name={type}
//               src={data}
//               collapsed={depth}
//               style={{
//                 backgroundColor: '#000',
//                 opacity: 1
//               }}
//               theme="brewer" />
StateList.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ZmqActions, dispatch);
}

const mapStateToProps = ({eonDetail, zmq, ui}) => {
  let data;
  let messageCount = 0;
  let depth = 1;
  let type = eonDetail.activeTab;
  if (zmq.data && zmq.data[type]) {
    if (zmq.data[type].messages) {
      messageCount = zmq.data[type].messages.length;
    }
  }
  if (zmq.data && zmq.data[type] && zmq.data[type].latestMessage) {
    data = zmq.data[type].latestMessage;
  }
  if (ui && ui.stateListDepth >= 0) {
    depth = ui.stateListDepth;
  }
  return {
    data,
    type,
    messageCount,
    depth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateList);
