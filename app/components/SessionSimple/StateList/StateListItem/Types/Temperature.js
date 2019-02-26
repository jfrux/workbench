import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

class Temperature extends ProgressBar {
  getValue = () => {
    return parseInt(this.props.value);
  }
  getMax = () => {
    return 65;
  }
  getColor = () => {
    return 'danger';
  }
};

export default Temperature;