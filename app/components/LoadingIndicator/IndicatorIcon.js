import React, { Component } from 'react';
import spinnerImage from '../../images/img_spinner_track@0.2x.png';
class IndicatorIcon extends Component {
  render() {
    if (this.props.icon) {
      return <i className={['circle',this.props.icon].join(' ')}></i>;
    } else {
      return <img className={'circle'} src={spinnerImage} />;
    }
  }
}

export default IndicatorIcon;
