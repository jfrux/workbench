import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StateListItem from './StateListItem';
import LoadingOverlay from '../../LoadingOverlay';
import services from '../../../constants/service_list.yaml';
import JSONPretty from 'react-json-pretty';
import * as ZmqActions from '../../../actions/zmq_actions';
import { ListGroup, Card, CardHeader, CardBody, } from 'reactstrap'
const propTypes = {
  // messageCount: PropTypes.number,
  // messages: PropTypes.array,
  // messagesFile: PropTypes.string,
  // latestMessage: PropTypes.object,
  // sampling: PropTypes.bool,
  data: PropTypes.any,
  type: PropTypes.string
};

class StateList extends React.PureComponent {
  service = services[this.props.type]
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
    this.props.CONNECT(this.props.type);
  }
  componentWillUnmount() {
    this.props.DISCONNECT(this.props.type);
  }
  render() {
    let { type, data } = this.props;
    // let { fields } = this.service;

    // let items = fields.map((field) => {
    //   return <StateListItem key={field} type={type} field={field} />
    // });
    let loadingMessage = "Waiting for messages...";
    
    if (!data) {
      return <LoadingOverlay message={loadingMessage} />;
    }
    
    if (data) {
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

  if (state.zmq.data && state.zmq.data[type] && state.zmq.data[type].latestMessage) {
    data = state.zmq.data[type].latestMessage;
  }
  return {
    data
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateList);