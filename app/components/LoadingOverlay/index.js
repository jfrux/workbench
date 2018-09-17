import React from 'react';
import display from 'newsy-tv/config/display';
import styles from './Styles.css';
import LoadingIndicator from 'app/components/LoadingIndicator';

const LoadingOverlay = (props = {}) => (
  <div className={styles.loading-indicator}>
    <LoadingIndicator />
  </div>
);

export default LoadingOverlay;
