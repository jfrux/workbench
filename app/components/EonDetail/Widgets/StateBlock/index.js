import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../../LoadingIndicator';
import stateInfo from '../../../../constants/thermal.json';
import styles from './Styles.scss';

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.string
};

class StateBlock extends Component {
  render() {
    const { label, value } = this.props;
    <div className={styles.state_block}>
      <span className={styles.state_block_trim}></span>
      <span className={styles.state_block_content}>
        <span className={styles.state_block_value}>{value}</span>
        <span className={styles.state_block_label}>{label}</span>
      </span>
    </div>
  }
}

export default StateBlock;