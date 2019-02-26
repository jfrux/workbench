import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StateListItemBase from './Base';
import { Input } from 'reactstrap';
const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};

class TextareaListItem extends StateListItemBase {
  renderValue = () => {
    const { value } = this.props;
    if (value !== null) {
      return (<span key={this.props.label + '-textarea'} className={"state-value"}>
        <Input className={"state-textarea"} type="text" name={this.props.label + "-textfield"} defaultValue={value + ''} />
      </span>);
    }
  }
};

export default TextareaListItem;