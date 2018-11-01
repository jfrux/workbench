import React, { Component } from 'react';
import LoadingOverlay  from '../LoadingOverlay';

class NoConnection extends Component {
  render() {
    return (
    <LoadingOverlay message="Network Not Connected" message2="Connect to the same network as an EON" />
    );
  }
}

export default NoConnection;