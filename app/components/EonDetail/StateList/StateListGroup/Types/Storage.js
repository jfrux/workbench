import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StateListGroupBase from './Base';
import { Progress } from 'reactstrap';
const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};
class Storage extends StateListGroupBase {
  renderChildren = () => {
    const { rootKey, data } = this.props;
    const childKeys = data.keys;
    const usedSpace = parseInt(data['usedSpace']);
    let color = 'danger';

    // if (batteryStatus == 'Discharging') {
    //   if (usedSpace <= 20) {
    //     color = 'danger';
    //   } else if (usedSpace > 20 && usedSpace <= 85) {
    //     color = 'danger';
    //   } else if (usedSpace > 85 && usedSpace <= 100) {
    //     color = 'success';
    //   }
    // } else {
    //   color = 'success';
    // }
    return <Progress color={color} value={usedSpace}>{usedSpace}% used</Progress>;
  }
  // render() {
  //   const { label, icon, value } = this.props;
  // }
};

export default Storage;