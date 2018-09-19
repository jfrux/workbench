import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const app = require('electron').remote.app
import routes from '../../constants/routes.json';
import styles from './Styles.css';
import PropTypes from 'prop-types';
import processInfo from '../../constants/processes.json';
import Layout from '../Layout';
import LoadingIndicator from '../LoadingIndicator';
import ConnectedTime from './ConnectedTime';

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
  vehicleConnection: PropTypes.string
};

class EonDetail extends Component {
  
  componentDidMount() {
    if (this.props.eon && this.props.pipeTmux) {
      this.props.pipeTmux();
    }
    
    this.tmuxTimeout = setTimeout(() => {
      if (!this.props.tmuxAttached) {
        console.warn("Could not connect to tmux...");
        this.props.history.push(routes.EON_DETAIL);
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
  render() {
    const processKeys = Object.keys(processInfo);
    if (!this.props.tmuxAttached) {
      return <LoadingIndicator className={styles.loading_overlay} />;
    }

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
              <LoadingIndicator className={styles.state_spinner} />
            }
          </span>
        </div>
      )
    });
    
    return (
      <Layout hideLogo={true}>
        <div className={styles.container + " container"}>
          {this.props.eon && 
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
              <Link className={styles.disconnect_button + " btn btn-outline-danger btn-block"} to={routes.EON_LIST}>
                Disconnect
              </Link>
            </div>
          }
          
          <div className={styles.state_list}>
            <div className={this.props.vehicle_connection} className={styles.state_item}>
              <span className={styles.state_label}>Vehicle Connection</span>
              <span className={styles.state_status}>{this.props.vehicleConnection}</span>
            </div>
            {processes}
          </div>
        </div>
      </Layout>
    );
  }
}

EonDetail.propTypes = propTypes;

export default EonDetail;