import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StateListItemBase from './Base';

const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};

class ArrayOfValues extends StateListItemBase {
  renderValue = () => {
    const { value } = this.props;
    if (value !== null) {
      if (Array.isArray(value)) {
        return (<span className={"state-value"}>
          {value.map((item, index) => {
            return (
            <span key={index} className={"sub-value"}>{item + ""}</span>);
          })}
        </span>);
      }
    }
  }
};

export default ArrayOfValues;