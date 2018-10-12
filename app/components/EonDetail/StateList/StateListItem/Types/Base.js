import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { capitalize } from 'inflection';
const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};

class StateListItemBase extends Component {
  renderLabel = () => {
    return (<span className={"state-label"}>
    <i className={classnames({stateIcon: true})}></i> 
    {this.props.label}
  </span>);
  }
  renderValue = () => {
    const { value } = this.props;
    if (value !== null) {
      return (<span className={"state-value"}>
        {value + ''}
      </span>);
    }
  }
  render() {
    const { label, icon, value } = this.props;
    return (<ListGroupItem className={"card-list-group-item"}>
      <span className={"state-item"}>
        {this.renderLabel()}
        {this.renderValue()}
      </span>
    </ListGroupItem>);
  }
}

export default StateListItemBase;