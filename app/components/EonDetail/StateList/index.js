import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../LoadingIndicator';
import styles from '../Styles.scss';
import stateInfo from '../../../constants/state_details.json';
import { ListGroup, ListGroupItem } from 'reactstrap';
const propTypes = {
  items: PropTypes.string
};
class StateList extends Component {
  render() {
    const { items } = this.props;
    const stateInfoKeys = Object.keys(stateInfo).sort();
    const itemKeys = Object.keys(items).sort();
    let itemBlocks = itemKeys.map((key) => {
      let stateDetails, stateImg, stateIcon, stateStatus;
      if (stateInfoKeys.includes(key)) {
        stateDetails = stateInfo[key];
        stateImg = stateInfo['iconImg'];
        stateIcon = stateInfo['iconClassName'];
        stateStatus = items[key];
      } else {
        stateDetails = {
          "label": key,
          "description": "State of " + key,
          "iconImg": "",
          "iconClassName": "fa fa-info"
        };
        stateImg = stateDetails['iconImg'];
        stateIcon = stateDetails['iconClassName'];
        stateStatus = items[key];
        // console.log(key + ":", stateStatus);
        
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
      return (<ListGroupItem key={key} className={"card-list-group-item"}>
          <span key={key} className={styles.state_item}>
            <span className={styles.state_label}>
              <i className={stateIcon}></i> 
              {stateDetails.label}
            </span>
            {stateStatus &&
            <span className={styles.state_status}>
              {stateStatus}
            </span>
            }
          </span>
        </ListGroupItem>);
    });
    return (<ListGroup className={styles.state_card_list_group}>{itemBlocks}</ListGroup>);
  }
}

export default StateList;