import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../../LoadingIndicator';
import stateInfo from '../../../../constants/processes.json';
import styles from '../../Styles.scss';

const propTypes = {
  items: PropTypes.string
};

class StateList extends Component {
  render() {
    const { items } = this.props;
    const itemKeys = Object.keys(items).sort();

    return itemKeys.map((key) => {
      let processDetails = stateInfo[key];
      let processStatus = items[key];
      if (!processStatus) {
        return (
          <div key={key} className={styles.state_item}>
            <span className={styles.state_label}>{processDetails.label}</span>
            <span className={styles.state_status}>
              {processStatus && (processStatus === 'started' || processStatus == 'true' || processStatus == true) &&
                <i className="fa fa-check"></i>
              }
              {processStatus}
              {(processStatus !== 'started' && processStatus !== 'true') &&
                <span className={styles.state_loading_icon_wrap}>
                  <LoadingIndicator icon="fa fa-circle-notch" className={styles.state_spinner} />
                </span>
              }
            </span>
          </div>
        )
      }
    });
  }
}

export default StateList;