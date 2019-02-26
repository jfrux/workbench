import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StateListItemBase from './Base';
import { Progress } from 'reactstrap';

const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};

class ProgressBar extends StateListItemBase {
  getColor = () => {
    return 'primary';
  }
  getMax = () => {
    return 100;
  }
  getValue = () => {
    return parseInt(this.props.value);
  }
  getValueFriendly = () => {
    return this.props.value;
  }
  renderValue = () => {
    const color = this.getColor();
    const max = this.getMax();
    const value = this.getValue();
    const valueFriendly = this.getValueFriendly();
    if (value !== null) {
      return <span className={"state-value"}><Progress color={color} value={value} max={max}>{valueFriendly}</Progress></span>;
    }
  }
};

export default ProgressBar;