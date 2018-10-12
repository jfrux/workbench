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
  renderValue = () => {
    const { value } = this.props;
    const color = this.getColor();
    const max = this.getMax();
    if (value !== null) {
      return <span className={"state-value"}><Progress color={color} value={value} max={max}>{value}</Progress></span>;
    }
  }
};

export default ProgressBar;