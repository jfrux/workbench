import React, { Component } from 'react';
import IndicatorIcon from './IndicatorIcon';
import styles from './Styles.scss';
class LoadingIndicator extends Component {
  render() {
    return (<span className={this.props.className}>
      <IndicatorIcon icon={this.props.icon} />
    </span>);
  }
}

export default LoadingIndicator;
