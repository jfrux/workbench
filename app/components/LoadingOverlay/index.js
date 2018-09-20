import React, { Component } from 'react';
import styles from './Styles.scss';
import LoadingIndicator from '../LoadingIndicator';

class LoadingOverlay extends Component {
  render() {
    return (
      <div className={styles.loading_overlay}>
        <LoadingIndicator className={styles.loading_indicator_wrap} />
        {(this.props.message || this.props.message2) && 
          <div className={styles.loading_message}>
            {this.props.message && 
              <span className={styles.line1}>
                {this.props.message}
              </span>
            }
            {this.props.message2 && 
              <span className={styles.line2}>
                {this.props.message2}
              </span>
            }
          </div>
        }
      </div>
    );
  }
}

export default LoadingOverlay;
