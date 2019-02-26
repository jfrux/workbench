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
import { getZmqDataState, getDepthState } from '../../../selectors/selectors';
// import { ListGroup, Card, CardHeader, CardBody } from 'reactstrap'
const propTypes = {
  depth: PropTypes.number,
  data: PropTypes.any
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
    let { data, depth } = this.props;

    if (!data) {
      let loadingMessage = "Waiting for messages...";
      return <LoadingOverlay message={loadingMessage} />;
    }

    if (data) {
      return (
        <div>
          <div className={"state-data"}>
          <ReactJson
            name={"data"}
            src={data.latestMessage}
            collapsed={depth}
            style={{
              backgroundColor: '#000',
              opacity: 1
            }}
            theme="brewer" />
          </div>
        </div>
      );
      // return (<div><JSONPretty json={JSON.parse(JSON.stringify(data))} /></div>);
    } else {
      return (<div></div>);
    }
  }
}
StateList.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ZmqActions, dispatch);
}

const mapStateToProps = (state) => {
  return {
    depth: getDepthState(state),
    data: getZmqDataState(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateList);
