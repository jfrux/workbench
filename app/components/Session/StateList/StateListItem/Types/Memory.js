import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

class Memory extends ProgressBar {
  getMax = () => {
    return 2140;
  }
};

export default Memory;