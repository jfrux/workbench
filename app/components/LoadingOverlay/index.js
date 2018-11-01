import React, { Component } from 'react';
import LoadingIndicator from '../LoadingIndicator';

class LoadingOverlay extends Component {
  render() {
    return (
      <div className={"loading_overlay"}>
        <LoadingIndicator className={"loading_indicator_wrap"} />
        {(this.props.message || this.props.message2) && 
          <div className={"loading_message"}>
            {this.props.message && 
              <span className={"line1"}>
                {this.props.message}
              </span>
            }
            {this.props.message2 && 
              <span className={"line2"}>
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
