import React, { Component } from 'react';
import spinnerImage from '../../images/img_spinner_track@0.2x.png';
import styles from './Styles.scss';
class IndicatorIcon extends Component {
  render() {
    if (this.props.icon) {
      return <i className={[styles.circle,this.props.icon].join(' ')}></i>;
    } else {
      return <img className={styles.circle} src={spinnerImage} />;
    }
  }
}

export default IndicatorIcon;
