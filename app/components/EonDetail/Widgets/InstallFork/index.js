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
      buttonLabel: "Install Openpilot Fork",
      requiresPrompt: true,
      promptQuestion: "Enter the full Git Clone URL",
      shellCommand: commands.INSTALL_FORK
    }
  }
  // render() {
  //   return (button);
  // }
}

export default InstallFork