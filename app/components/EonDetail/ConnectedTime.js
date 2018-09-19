import React, { Component } from 'react';
const app = require('electron').remote.app
import PropTypes from 'prop-types';
import formatTime from '../../utils/format-time';
import styles from './ConnectedTime.css';
const propTypes = {
  tmuxStartedAt: PropTypes.date
};

class ConnectedTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }
  componentDidMount() {
    this.timer = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  tick() {
    const currentTime = new Date();
    var timeDifference = Math.abs((currentTime.getTime() - this.props.startedTime.getTime()) / 1000);

    this.setState({
      time: currentTime,
      connectedSeconds: timeDifference,
      friendlyTime: formatTime(timeDifference)
    });
  }

  render() {
    return <span className={styles.connected_time}>{this.state.friendlyTime}</span>;
  }
}

export default ConnectedTime;