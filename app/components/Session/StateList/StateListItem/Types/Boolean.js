import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StateListItemBase from './Base';
import { Badge } from 'reactstrap';
const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};

class BooleanListItem extends StateListItemBase {
  renderValue = () => {
    const { value } = this.props;
    if (value !== null) {
      return (<span className={"state-value"}>
        
        <Badge color={value ? 'success' : 'dark'}>
        {value + ''}
        </Badge>
      </span>);
    }
  }
};

export default BooleanListItem;