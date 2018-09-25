import React, { Component } from 'react';
import ShellTaskBase from '../ShellTaskBase';
import PropTypes from 'prop-types';
import styles from './Styles.scss';
import commands from '../../../../constants/commands.json';

const propTypes = {
  status: PropTypes.string,
  percentage: PropTypes.string
};

class InstallFork extends ShellTaskBase {
  constructor() {
    super();
    this.state = {
      
    }
  }
  // render() {
  //   return (button);
  // }
}

export default InstallFork