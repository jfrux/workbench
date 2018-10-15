import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StateListItemBase from './Base';
function isAnyObject(value) {
  return value != null && (typeof value === 'object' || typeof value === 'function');
}
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
            if (typeof value === 'object') {
              const keys = Object.keys(item);
              
              return (<div key={index}>
                {keys.map((key,subIndex) => {
                  const subItem = item[key];
                  return (<span key={index + '-' + subIndex} className={"sub-sub-value"}>{key}: {subItem + ""}</span>);
                })}
                </div>);
            }
            
          })}
        </span>);
      }
    }
  }
};

export default ArrayOfValues;