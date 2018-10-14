import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StateListGroupBase from './Base';
import { Progress } from 'reactstrap';
const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};
class Dashboard extends StateListGroupBase {
  name = "dashboard"
}

export default Dashboard;