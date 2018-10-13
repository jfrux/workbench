import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StateListItemBase from './Base';

const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};

class MapListItem extends StateListItemBase {
  // renderValue = () => {
  //   const { value } = this.props;
  //   if (value !== null) {
  //     return (<span className={"state-value"}>
  //       {}
  //       {value + ''}
  //     </span>);
  //   }
  // }
};

export default MapListItem;