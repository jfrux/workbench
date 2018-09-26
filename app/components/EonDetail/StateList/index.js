import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../LoadingIndicator';
import styles from './Styles.scss';
import stateInfo from '../../../constants/state_details.json';

const propTypes = {
  items: PropTypes.string
};

class StateList extends Component {
  render() {
    const { items } = this.props;
    const itemKeys = Object.keys(stateInfo).sort();

    return (itemKeys.map((key) => {
      let stateDetails = stateInfo[key];
      let stateImg = stateInfo['iconImg'];
      let stateIcon = stateInfo['iconClassName'];
      let stateStatus = items[key];

      return (
        <span key={key} className={styles.state_item}>
          <span className={styles.state_label}><i className={stateIcon}></i> {stateDetails.label}</span>
          {stateStatus &&
            <span className={styles.state_status}>
              {stateStatus}
            </span>
          }
          {!stateStatus &&
            <span className={styles.state_loading_icon_wrap}>
              <LoadingIndicator icon="fa fa-circle-notch" className={styles.state_spinner} />
            </span>
          }
        </span>
      )
    }));
  }
}

export default StateList;