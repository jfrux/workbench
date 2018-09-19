import React, { Component } from 'react';
import Circle from './Circle';
import styles from './Styles.css';

class LoadingIndicator extends Component {
  render() {
    return (<div className={this.props.className}>
      <Circle />
    </div>)
  }
}

export default LoadingIndicator;
