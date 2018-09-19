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
  updated: PropTypes.string,
  logcatd: PropTypes.string,
  pandad: PropTypes.string,
  thermald: PropTypes.string,
  ui: PropTypes.string,
  uploader: PropTypes.string,
  tombstoned: PropTypes.string,
  logmessaged: PropTypes.string,
  controlsd: PropTypes.string,
  gpsd: PropTypes.string,
  vehicleConnection: PropTypes.string,
  logMonoTime: PropTypes.string,
  thermal: PropTypes.string,
  cpu0: PropTypes.string,
  cpu1: PropTypes.string,
  cpu2: PropTypes.string,
  cpu3: PropTypes.string,
  mem: PropTypes.string,
  gpu: PropTypes.string,
  bat: PropTypes.string,
  freeSpace: PropTypes.string,
  batteryPercent: PropTypes.string,
  batteryStatus: PropTypes.string,
  fanSpeed: PropTypes.string,
  started: PropTypes.string,
  usbOnline: PropTypes.string,
  startedTs: PropTypes.string,
  thermalStatus: PropTypes.string,
  batteryCurrent: PropTypes.string,
  batteryVoltage: PropTypes.string
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
    
    console.warn("Component did mount...");
  }
  componentWillUnmount() {
    console.warn("Component will unmount...");
    
    this.props.closeTmux();
  }
  handleInstall = () => {
    // console.warn(this);
    this.props.install();
  }
  onResize = (width,height) => {
    console.log("width:",width);
    console.log("height:",height);
    let newHeight = height-400;
    console.log("thermalsHeight:",newHeight);
    this.setState({
      processesAndThermalsHeight: newHeight
    });
  }
  render() {
    const vehicleConnection = vehicleConnectionStatuses[this.props.vehicleConnection] || {
      "label": "Checking vehicle status..."
    };
    const processKeys = Object.keys(processInfo).sort();
    const thermalKeys = Object.keys(thermalInfo).sort();
    if (!this.props.tmuxAttached) {
      return <LoadingIndicator className={styles.loading_overlay} />;
    }
    // THERMAL ITEMS
    const thermals = thermalKeys.map((key) => {
      let thermalDetails = thermalInfo[key];
      let thermalStatus = this.props[key];
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
      let processStatus = this.props[key];

      return (
        <div key={key} className={styles.state_item}>
          <span className={styles.state_label}>{processDetails.label}</span>
          <span className={styles.state_status}>
            {processStatus && (processStatus === 'started') &&
              <i className="fa fa-check"></i>
            }
            {(processStatus !== 'started') &&
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
          {this.props.eon && 
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
                  <div className={styles.connection}>
                    <span className={styles.connection_message}>{vehicleConnection.label}</span>
                  </div>
                  <Link className={styles.disconnect_button + " btn btn-outline-danger"} to={routes.EON_LIST}>
                    Disconnect
                  </Link>
                </div>
              </div>
            </div>
          }
          
          <div className="row" style={{height: this.state.processesAndThermalsHeight}}>
            <div className="col-sm-6">
              <div className={styles.state_list}>
                {processes}
              </div>
            </div>
            <div className="col-sm-6">
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