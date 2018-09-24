import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const app = require('electron').remote.app
import { Redirect } from 'react-router';
import routes from '../../constants/routes.json';
import styles from './Styles.scss';
import PropTypes from 'prop-types';
import vehicleConnectionStatuses from '../../constants/vehicle_connection_statuses.json';
import Layout from '../Layout';
import LoadingIndicator from '../LoadingIndicator';
import ConnectedTime from './ConnectedTime';
import { LineChart, PieChart } from 'react-chartkick'
import Battery from './Widgets/Battery';
import BaseProcessList from './Widgets/BaseProcessList';
import InVehicleList from './Widgets/InVehicleList';
import ThermalList from './Widgets/ThermalList';
import InstallFork from './Widgets/InstallFork';

const propTypes = {
  install: PropTypes.func,
  eon: PropTypes.object,
  pid: PropTypes.string,
  fetchingPid: PropTypes.bool,
  sshConnectionError: PropTypes.object,
  sshConnectionStatus: PropTypes.string,
  tmuxError: PropTypes.string,
  tmuxAttached: PropTypes.bool,
  tmuxLog: PropTypes.array,
  tmuxStartedAt: PropTypes.instanceOf(Date),
  vehicleStarted: PropTypes.string,
  vehicleStartedAt: PropTypes.string,
  vehicleConnection: PropTypes.string,
  standardProcesses: PropTypes.object,
  thermal: PropTypes.object,
  connectedProcesses: PropTypes.object,
  network: PropTypes.string
};

class EonDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processesAndThermalsHeight: 0
    }
  }
  componentDidMount() {
    if (this.props.eon && this.props.pipeTmux) {
      this.props.pipeTmux();
    }
    
    // this.tmuxTimeout = setTimeout(() => {
    //   if (!this.props.tmuxAttached) {
    //     console.warn("Could not connect to tmux...");
    //     this.props.history.push(routes.EON_LIST);
    //   }
    // }, 3000);
  }
  componentWillUnmount() {
    this.props.closeTmux();
  }
  handleInstall = () => {
    // console.warn(this);
    this.props.install();
  }
  
  render() {
    const { network, thermal, eon, standardProcesses, sshConnectionError, sshConnectionStatus, connectedProcesses, vehicleConnection, tmuxAttached } = this.props;
    const vehicleConnectionInfo = vehicleConnectionStatuses[vehicleConnection];

    if (network === 'disconnected' || sshConnectionError) {
      <Redirect to={routes.EON_LIST} />
    }

    if (!tmuxAttached) {
      return <LoadingIndicator className={styles.loading_overlay} />;
    }
    
    return (
      <Layout hideLogo={true}>
        <div className={styles.container + " container-fluid"}>
          {eon && 
            <div className="row">
              <div className="col-12">
                <div className={styles.eon_bar}>
                  <ConnectedTime startedTime={this.props.tmuxStartedAt} />
                  <h3 className={styles.title + " no-select"}>
                    Connected to EON
                  </h3>
                  <h5 className={styles.subtext + " no-select"}>
                    {this.props.eon.ip}
                  </h5>
                  <div className={styles.subsubtext + " no-select"}>
                    {this.props.eon.mac}
                  </div>
                  {vehicleConnectionInfo &&
                    <div className={styles.connection}>
                      <span className={styles.connection_message}>{vehicleConnectionInfo.label}</span>
                    </div>
                  }
                  {!vehicleConnectionInfo && !(thermal.usbOnline === "true") && 
                    <div className={styles.connection}>
                      <span className={styles.connection_message}>Vehicle not connected.</span>
                    </div>
                  }
                  {thermal.usbOnline === "true" && 
                    <div className={styles.connection_connected}>
                      <span className={styles.connection_message}>Vehicle Connected</span>
                    </div>
                  }
                  <Link className={styles.disconnect_button + " btn btn-outline-danger"} to={routes.EON_LIST}>
                    Disconnect
                  </Link>
                </div>
              </div>
            </div>
          }
          
          <div className="row">
            <div className="col-8">
              <InstallFork />
            </div>
            <div className="col-4">
              <div className="col-12">
                <div className={styles.state_header}>
                  In Vehicle
                </div>
                <div className={styles.state_list}>
                  <InVehicleList items={connectedProcesses} />
                </div>
              </div>
              <div className="col-12">
                <div className={styles.state_header}>
                  Base Processes
                </div>
                <div className={styles.state_list}>
                  <BaseProcessList items={standardProcesses} />
                </div>
              </div>
              <div className="col-12">
                <div className={styles.state_header}>
                  Thermal
                </div>
                <div className={styles.state_list}>
                  <ThermalList items={thermal} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

EonDetail.propTypes = propTypes;

export default EonDetail;