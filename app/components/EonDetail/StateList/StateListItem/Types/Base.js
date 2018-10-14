import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { camelize, underscore, humanize } from 'inflection';
const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
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
    {this.props.label}
  </span>);
  }
  renderValue = () => {
    const value = this.getValue();
    if (value !== null) {
      return (<span className={"state-value"}>
        {value + ''}
      </span>);
    }
  }
  render() {
    const { label, icon, value } = this.props;
    return (<ListGroupItem className={this.getClassNames()}>
      <span className={"state-item"}>
        {this.renderLabel()}
        {this.renderValue()}
      </span>
    </ListGroupItem>);
  }
}

export default StateListItemBase;