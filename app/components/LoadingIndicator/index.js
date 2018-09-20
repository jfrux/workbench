import React, { Component } from 'react';
import IndicatorIcon from './IndicatorIcon';
import styles from './Styles.scss';
class LoadingIndicator extends Component {
  render() {
    return (<div className={this.props.className}>
      <IndicatorIcon icon={this.props.icon} />
    </div>)
  }
}

export default LoadingIndicator;
