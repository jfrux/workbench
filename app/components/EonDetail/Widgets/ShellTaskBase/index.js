import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Styles.scss';
const propTypes = {
  // requiresPrompt: PropTypes.bool,
  // percentage: PropTypes.string
};

class ShellTaskBase extends Component {
  constructor() {
    super();
    this.state = {
      buttonLabel: null,
      requiresPrompt: false,
      promptQuestion: null,
      shellCommand: null
    }
  }
  handleButtonClick = () => {
    if (shellCommand) {
      
    }
  }
  render() {
    const { buttonLabel } = this.props;
    return (
      <div>
      {buttonLabel && <button className="btn btn-dark" onClick={this.handleButtonClick}>{buttonLabel}</button>}
      </div>
    );
  }
}

export default ShellTaskBase