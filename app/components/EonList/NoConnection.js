import React, { Component } from 'react';
import styles from './Styles.scss';
import { Redirect } from 'react-router';
import Eon from "../../images/device-icons/eon.svg";
import PropTypes from 'prop-types';
import routes from '../../constants/routes.json';
import Layout from '../Layout';
import LoadingOverlay  from '../LoadingOverlay';
import statusMessages from '../../constants/scan_status_messages.json';
const propTypes = {
  
};


class NoConnection extends Component {
  render() {
    return (
    <LoadingOverlay message="Network Not Connected" message2="Connect to the same network as an EON" />
    )
  }
}

export default NoConnection;