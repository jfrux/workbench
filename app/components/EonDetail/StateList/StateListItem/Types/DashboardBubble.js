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
  
}

export default DashboardBubble;