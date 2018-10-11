import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../LoadingIndicator';
import styles from '../Styles.scss';
import stateInfo from '../../../constants/state_details.json';
import { ListGroup, ListGroupItem } from 'reactstrap';
const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};
class StateListItem extends Component {
  render() {
    const { label, value } = this.props;
    return (<ListGroupItem className={"card-list-group-item"}>
      <span className={"state-item"}>
        <span className={"state-label"}>
          <i className={"state-icon"}></i> 
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