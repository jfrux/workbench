// @flow
import React, { Component } from 'react';
import styles from './Styles.scss';
import { Redirect } from 'react-router';
import Eon from "../../images/device-icons/eon.svg";
import PropTypes from 'prop-types';
import routes from '../../constants/routes.json';
import Layout from '../Layout';
import NoConnection from './NoConnection';
import ProgressBar from './ProgressBar';
import LoadingIndicator from '../LoadingIndicator';
// import IpInput from './IpInput';
import statusMessages from '../../constants/scan_status_messages.json';
import sshConnectionStatusMessages from '../../constants/ssh_connection_status.json';
import * as networkMethods from '../../actions/network_connection_actions';
const propTypes = {
  sshConnectionStatus: PropTypes.string,
  sshConnectionError: PropTypes.object,
  scanNetwork: PropTypes.func,
  scanResults: PropTypes.array,
  scanError: PropTypes.string,
  scanning: PropTypes.bool,
  status: PropTypes.string,
  network: PropTypes.string,
  networkIp: PropTypes.string,
  progress: PropTypes.any
};

function ValidateIPaddress(ipaddress) 
{
 if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
  {
    return (true)
  }
  return (false)
}

class EonList extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      manualError: '',
      scanningStarted: false
    }
  }
  handleScanNetwork = () => {
    this.props.scanNetwork();
  }
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }
  handleSubmit = (event) => {
    const { value } = this.state;
    if (ValidateIPaddress(value)) {
      this.props.addManually(value);
      this.setState({value: ''});
    } else {
      this.setState({manualError: "Invalid IP Address"});
    }
    event.preventDefault();
  }
  handleSelectEon = (index) => {
    this.props.selectEon(index);
    this.props.history.push(routes.EON_DETAIL);
  }
  render() {
    const {
      sshConnectionError,
      sshConnectionStatus,
      scanResults,
      scanning,
      status,
      network,
      networkIp,
      progress
    } = this.props;

    const {
      scanningStarted
    } = this.state;
    let sshConnectionMessage = sshConnectionStatusMessages[sshConnectionStatus];
    const statusMessage = statusMessages[status];

    if (sshConnectionStatus === "not_connected") {
      sshConnectionMessage = null;
    }
    if (network === 'disconnected') {
      return <NoConnection />
    }
    
    return (
      <Layout>
        <div className={styles.container + " container"}>
          <h3 className={styles.title + " no-select"}>
            {statusMessage.title}
          </h3>
          
          <h5 className={styles.subtext + " no-select" + " " + styles[status]}>
            {statusMessage.subtext.replace("%scanResultsLength%",scanResults.length)}
          </h5>

          {sshConnectionMessage && 
            <div className={styles.ssh_message}>
              <span className={styles.ssh_connection_title}>{sshConnectionMessage.title}</span>
              <span className={styles.ssh_connection_subtext}>{sshConnectionMessage.subtext.replace("%sshConnectionError%",sshConnectionError)}</span>
            </div>
          }

          {!sshConnectionMessage && 
            <div className={styles.subsubtext + " no-select"}>
              {statusMessage.subsubtext}
            </div>
          }

          {!scanning && scanResults &&
            <div className={styles.results + " btn-group-vertical"}>
              {scanResults.map((item,index) => {
                const isSameNetwork = networkMethods.isSameNetwork(networkIp,item.ip);
                return (<button key={index} className={styles.results_button + " btn btn-dark btn-block"} onClick={() => this.handleSelectEon(index)}>
                <span className={styles.eon_icon}><Eon width="100%" height="100%" /></span>
                <span className={styles.results_button_ip}>{item.ip}</span>
                <span className={styles.results_button_mac}>{item.mac}</span>
                <span className={styles.results_button_selected}><i className="fa fa-chevron-right"></i></span>
              </button>)
              })}
            </div>
          }
          {scanning &&
            <div>
              <div className={styles.loading_overlay}>
                <LoadingIndicator />
              </div>
              <div className={styles.progress_overlay}>
                <ProgressBar progress={progress} />
              </div>
            </div>
          }

          {status === "eon_selected" &&
            <button className="mt-2 btn btn-dark btn-block" onClick={this.handleScanNetwork} type="button"><i className="fa fa-sync"></i> Refresh List</button>
          }
          {status === "not_scanned" &&
            <button className="mt-2 btn btn-dark btn-block" onClick={this.handleScanNetwork} type="button"><i className="fa fa-sync"></i> Begin Scan</button>
          }
          {status === "scanned_has_results" &&
            <button className="mt-2 btn btn-dark btn-block" onClick={this.handleScanNetwork} type="button"><i className="fa fa-sync"></i> Scan Again</button>
          }
          {status === "scanned_no_results" &&
            <button className="mt-2 btn btn-dark btn-block" onClick={this.handleScanNetwork} type="button"><i className="fa fa-sync"></i> Try Again</button>
          }
          {!scanning &&
            <div>
              <div className={styles.divider}>
                or
              </div>
              {this.state.manualError &&
                <div className={styles.manual_error + " alert alert-danger"}>
                  {this.state.manualError}
                </div>
              }
              
              <form onSubmit={this.handleSubmit} className={styles.form}>
                <input type="text" className={styles.add_field + " form-control text-light bg-dark"} value={this.state.value} onChange={this.handleChange} placeholder="___ . ___ . ___ . ___" />
                {this.state.value && 
                  <div className={styles.form_help_text}>Press Enter to add</div>
                }
                {!this.state.value && 
                  <div className={styles.form_help_text}>Add an EON manually by typing the IP address below</div>
                }
              </form>
            </div>
          }
        </div>
      </Layout>
    );
  }
}

EonList.propTypes = propTypes;


export default EonList;