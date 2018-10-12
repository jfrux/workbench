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
    const batteryTempInt = parseInt(data['temperature']);
    const thermalColor = data['thermalColor'];
    const batteryTemp = data['temperature'];
    const batteryPercentage = parseInt(data['percent']);
    const batteryStatus = data['status'];
    let color = 'success';
    let tempColor;
    switch (thermalColor) {
      case "green":
        tempColor = 'primary';
        break;
      case "yellow":
        tempColor = 'warning';
        break;
      case "red":
        tempColor = 'danger';
        break;
    }
    if (batteryStatus == 'Discharging') {
      if (batteryPercentage <= 20) {
        color = 'danger';
      } else if (batteryPercentage > 20 && batteryPercentage <= 85) {
        color = 'danger';
      } else if (batteryPercentage > 85 && batteryPercentage <= 100) {
        color = 'primary';
      }
    } else {
      color = 'primary';
    }
    return [
      <Progress key={1} color={tempColor} value={batteryTempInt} max={63}>{batteryTemp}</Progress>,
      <Progress key={2} color={color} value={batteryPercentage}>{batteryPercentage}% ({batteryStatus})</Progress>
    ];
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