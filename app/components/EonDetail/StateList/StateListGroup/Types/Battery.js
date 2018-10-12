import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StateListGroupBase from './Base';
import { Progress } from 'reactstrap';
const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};

class Battery extends StateListGroupBase {
  renderChildren = () => {
    const { rootKey, data } = this.props;
    const childKeys = data.keys;
    const batteryPercentage = data['percent'];
    const batteryStatus = data['status'];
    let color = 'success';

    if (batteryPercentage <= 20) {
      color = 'danger';
    } else if (batteryPercentage > 20 && batteryPercentage <= 50) {
      color = 'warning';
    } else if (batteryPercentage > 50 && batteryPercentage <= 100) {
      color = 'success';
    }
    return <Progress color="success" value={batteryPercentage}>{batteryPercentage}% ({batteryStatus})</Progress>;
    return childKeys.map((childKey) => {
      const childValue = data[childKey];
      const childComponent = data.childKeyToComponent[childKey];
      return this.renderChild({
        rootKey,
        key: childKey,
        value: childValue,
        component: childComponent
      });
    });
  }
  // render() {
  //   const { label, icon, value } = this.props;
  // }
};

export default Battery;