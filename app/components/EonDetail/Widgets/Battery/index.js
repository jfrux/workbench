import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Styles.scss';
const propTypes = {
  status: PropTypes.string,
  percentage: PropTypes.string
};

class Battery extends Component {
  render() {
    return (<span className={styles.battery}></span>);
  }
}

export default Battery