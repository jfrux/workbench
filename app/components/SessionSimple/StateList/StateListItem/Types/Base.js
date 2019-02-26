import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { camelize, underscore, humanize } from 'inflection';

const propTypes = {
  field: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any
};

class StateListItemBase extends Component {
  name = "default"

  getValue = () => {
    return this.props.value;
  }

  getClassNames = () => {
    return classnames(["card-list-group-item","list-group-item",this.name]);
  }

  renderLabel = () => {
    return (<span className={"state-label"}>
    <i className={classnames({stateIcon: true})}></i> 
    {this.props.field}
    </span>);
  }

  renderValue = () => {
    const value = this.getValue();
    if (value !== null) {
      return (<span className={"state-value"}>
        {JSON.stringify(value) + ''}
      </span>);
    }
  }

  render() {
    const { field, value } = this.props;
    return (<ListGroupItem className={this.getClassNames()}>
      <span className={"state-item"}>
        {this.renderLabel()}
        {this.renderValue()}
      </span>
    </ListGroupItem>);
  }
}

StateListItemBase.propTypes = propTypes;

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(ZmqActions, dispatch);
// }

const mapStateToProps = (state, {type, field}) => {
  const { zmq } = state;
  const { data } = zmq;
  let value;
  if (data[type] && data[type].latestMessage && data[type].latestMessage[field] ) {
    value = state.zmq.data[type]['latestMessage'][field];
  }
  return {
    value
  };
};

export default connect(
  mapStateToProps
)(StateListItemBase);