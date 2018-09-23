import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Styles.scss';
const propTypes = {
  progress: PropTypes.any
};

class ProgressBar extends Component {
  render() {
    const { progress } = this.props;
    return (
      <div className={styles.progress}>
        <div className="progress-bar progress-bar-striped bg-warning progress-bar-animated" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={{ width: progress + "%" }}></div>
      </div>
    )
  }
}

export default ProgressBar;