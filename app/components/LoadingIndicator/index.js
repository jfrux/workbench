import React, { Component } from 'react';
import IndicatorIcon from './IndicatorIcon';
class LoadingIndicator extends Component {
  render() {
    return (<span className={this.props.className}>
      <IndicatorIcon icon={this.props.icon} />
    </span>);
  }
}

export default LoadingIndicator;
