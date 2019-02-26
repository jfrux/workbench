import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { camelize, underscore, humanize } from 'inflection';
import StateListItemBase from './Base';
const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};

class DashboardBubble extends StateListItemBase {
  name = 'dashboard-bubble'
  getColor = () => {
    const value = this.getValue();
    if (value > 63) {
      // onroad not allowed
      return 'danger';
    } else if (value > 60) {
      // hysteresis between onroad not allowed and engage not allowed
      return 'danger';
    } else if (value < 90) {
      // hysteresis between engage not allowed and uploader not allowed
      return 'danger';
    } else if (value > 85) {
      // uploader not allowed
      return 'warning';
    } else if (value > 75) {
      // hysteresis between uploader not allowed and all good
      return 'success';
    } else {
      // all good
      return 'success';
    }
  }
  getValue = () => {
    if (typeof this.props.value === "number") {
      return Math.round(this.props.value);
    } else {
      return this.props.value;
    }
  }
}

export default DashboardBubble;