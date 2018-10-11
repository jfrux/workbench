import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../LoadingIndicator';
import styles from '../Styles.scss';
import stateInfo from '../../../constants/state_details.json';
import StateListItem from './StateListItem';
import { ListGroup, ListGroupItem } from 'reactstrap';
const propTypes = {
  items: PropTypes.array
};
class StateList extends Component {
  render() {
    const { items } = this.props;
    if (!items) {
      return <div></div>;
    }

    const stateInfoKeys = Object.keys(stateInfo).sort();
    const itemKeys = Object.keys(items).sort();
    let itemBlocks = itemKeys.map((key) => {
      let stateDetails, stateImg, stateIcon, stateStatus;
      if (stateInfoKeys.includes(key)) {
        stateDetails = stateInfo[key];
        stateImg = stateInfo['iconImg'];
        stateIcon = stateInfo['iconClassName'];
        console.warn("stateDetails:",stateDetails);
        if (typeof stateStatus === 'string') {
          stateStatus = items[key];
        } else {
          stateStatus = JSON.stringify(items[key]);
        }
      } else {
        stateDetails = {
          "label": key,
          "description": "State of " + key,
          "iconImg": "",
          "iconClassName": "fa fa-info"
        };
        stateImg = stateDetails['iconImg'];
        stateIcon = stateDetails['iconClassName'];
        if (typeof stateStatus === 'string') {
          stateStatus = items[key];
        } else {
          stateStatus = JSON.stringify(items[key]);
        }
        
      }
      if (typeof stateStatus === 'boolean') {
        stateStatus = <i className="fas fa-check"></i>;
      }
      if (!items) {
        return;
      }
      if (!stateStatus) {
        return;
      }
      return (<StateListItem 
        key={key} 
        label={stateDetails.label} 
        value={stateStatus} 
      />);
    });
    return (<ListGroup className={"state-card-list-group"}>{itemBlocks}</ListGroup>);
  }
}

export default StateList;