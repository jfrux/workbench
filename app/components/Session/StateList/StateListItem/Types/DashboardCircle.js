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

class DashboardCircle extends StateListItemBase {
  name = 'dashboard-circle'
  getClassNames = () => {
    return classnames({
      "card-list-group-item": true,
      "list-group-item": true,
      "active": this.props.value === true,
      
    },this.name);
  }
}

export default DashboardCircle;