import React from 'react';
import Circle from './Circle';
import styles from './Styles.css';

const LoadingIndicator = () => (
  <div className={styles.spinner}>
    <Circle />
  </div>
);

export default LoadingIndicator;
