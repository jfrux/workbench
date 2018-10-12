import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../../LoadingIndicator';
import classnames from 'classnames';
import stateInfo from '../../../../constants/state_details.json';
import { ListGroup, ListGroupItem } from 'reactstrap';
const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};
class StateListItem extends Component {
  render() {
    const { label, icon, value } = this.props;
    return (<ListGroupItem className={"card-list-group-item"}>
      <span className={"state-item"}>
        <span className={"state-label"}>
          <i className={classnames({stateIcon: true})}></i> 
          {label}
        </span>
        {value &&
        <span className={"state-value"}>
          {value}
        </span>
        }
      </span>
    </ListGroupItem>);
  }
}

export default StateListItem;