import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StateListItemBase from './Base';
import ProgressBar from './ProgressBar';
const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};

class Temperature extends ProgressBar {
  getMax = () => {
    return 65;
  }
  getColor() {
    return 'danger';
  }
};

export default Temperature;