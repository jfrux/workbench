import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const app = require('electron').remote.app
import routes from '../../constants/routes.json';
import styles from './Styles.scss';
import PropTypes from 'prop-types';
import processInfo from '../../constants/processes.json';
import thermalInfo from '../../constants/thermal.json';
import vehicleConnectionStatuses from '../../constants/vehicle_connection_statuses.json';
import Layout from '../Layout';
import LoadingIndicator from '../LoadingIndicator';
import ConnectedTime from './ConnectedTime';
import ReactResizeDetector from 'react-resize-detector';

const propTypes = {
  install: PropTypes.func,
  eon: PropTypes.object,
  pid: PropTypes.string,
  fetchingPid: PropTypes.bool,
  tmuxError: PropTypes.string,
  tmuxAttached: PropTypes.bool,
  tmuxLog: PropTypes.array,
  tmuxStartedAt: PropTypes.instanceOf(Date),
  vehicleStarted: PropTypes.string,
  vehicleStartedAt: PropTypes.string,
  vehicleConnection: PropTypes.string,
  standardProcesses: PropTypes.object,
  thermal: PropTypes.object,
  connectedProcesses: PropTypes.object
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
    
    this.tmuxTimeout = setTimeout(() => {
      if (!this.props.tmuxAttached) {
        console.warn("Could not connect to tmux...");
        this.props.history.push(routes.EON_LIST);
      }
    }, 3000);
    
  }
  componentWillUnmount() {
    this.props.closeTmux();
  }
  handleInstall = () => {
    // console.warn(this);
    this.props.install();
  }
  
  render() {
    const { standardProcesses, thermal, eon, connectedProcesses, vehicleConnection, tmuxAttached } = this.props;
    const vehicleConnectionInfo = vehicleConnectionStatuses[vehicleConnection];
    const processKeys = Object.keys(standardProcesses).sort();
    const connectedKeys = Object.keys(connectedProcesses).sort();
    const thermalKeys = Object.keys(thermalInfo).sort();

    if (!tmuxAttached) {
      return <LoadingIndicator className={styles.loading_overlay} />;
    }
    // THERMAL ITEMS
    const thermals = thermalKeys.map((key) => {
      let thermalDetails = thermalInfo[key];
      let thermalStatus = thermal[key];
      let thermalImg = thermalInfo['iconImg'];
      let thermalIcon = thermalInfo['iconClassName'];

      return (
        <div key={key} className={styles.state_item}>
          <span className={styles.state_label}><i className={thermalIcon}></i> {thermalDetails.label}</span>
          <span className={styles.state_status}>
            {!thermalStatus &&
              <span className={styles.state_loading_icon_wrap}>
                <LoadingIndicator icon="fa fa-circle-notch" className={styles.state_spinner} />
              </span>
            }
            {thermalStatus}
          </span>
        </div>
      )
    });

    // PROCESS ITEMS
    const processes = processKeys.map((key) => {
      let processDetails = processInfo[key];
      let processStatus = standardProcesses[key];

      return (
        <div key={key} className={styles.state_item}>
          <span className={styles.state_label}>{processDetails.label}</span>
          <span className={styles.state_status}>
            {processStatus && (processStatus === 'started' || processStatus === 'true') &&
              <i className="fa fa-check"></i>
            }
            {processStatus}
            {(processStatus !== 'started' && processStatus !== 'true') &&
              <span className={styles.state_loading_icon_wrap}>
                <LoadingIndicator icon="fa fa-circle-notch" className={styles.state_spinner} />
              </span>
            }
          </span>
        </div>
      )
    });

    const processesInVehicle = connectedKeys.map((key) => {
      let processDetails = processInfo[key];
      let processStatus = connectedProcesses[key];
      return (
        <div key={key} className={styles.state_item}>
          <span className={styles.state_label}>{processDetails.label}</span>
          <span className={styles.state_status}>
            {processStatus && (processStatus === 'started' || processStatus == 'true' || processStatus == true) &&
              <i className="fa fa-check"></i>
            }
            {processStatus}
            {(processStatus !== 'started' && processStatus !== 'true') &&
              <span className={styles.state_loading_icon_wrap}>
                <LoadingIndicator icon="fa fa-circle-notch" className={styles.state_spinner} />
              </span>
            }
          </span>
        </div>
      )
    });
    
    return (
      <Layout hideLogo={true}>
        <div className={styles.container + " container"}>
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
                  
                  <Link className={styles.disconnect_button + " btn btn-outline-danger"} to={routes.EON_LIST}>
                    Disconnect
                  </Link>
                </div>
              </div>
            </div>
          }
          
          <div className="row">
             <div className="col-md-4">
              <div className={styles.state_header}>
                In Vehicle
              </div>
              <div className={styles.state_list}>
                {processesInVehicle}
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.state_header}>
                Base Processes
              </div>
              <div className={styles.state_list}>
                {processes}
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.state_header}>
                Thermal
              </div>
              <div className={styles.state_list}>
                {thermals}
              </div>
            </div>
            
          </div>
        </div>
        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
      </Layout>
    );
  }
}

EonDetail.propTypes = propTypes;

export default EonDetail;