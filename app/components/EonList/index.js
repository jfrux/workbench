// @flow
import React, { Component } from 'react';
import styles from './Styles.scss';
import Eon from "../../images/device-icons/eon.svg";
import PropTypes from 'prop-types';
import routes from '../../constants/routes.json';
import Layout from '../Layout';
import LoadingIndicator from '../LoadingIndicator';
import statusMessages from '../../constants/scan_status_messages.json';
const propTypes = {
  scanNetwork: PropTypes.func,
  scanResults: PropTypes.array,
  scanError: PropTypes.string,
  scanning: PropTypes.bool,
  status: PropTypes.string
};
function ValidateIPaddress(ipaddress) 
{
 if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
  {
    return (true)
  }
return (false)
}

class ConnectEon extends Component {
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
      scanNetwork,
      scanResults,
      scanError,
      scanning,
      status
    } = this.props;
    const {
      scanningStarted
    } = this.state;
    const statusMesssage = statusMessages[status]
    console.log(scanResults);
    return (
      <Layout>
        <div className={styles.container + " container"}>
          <h3 className={styles.title + " no-select"}>
            {statusMesssage.title}
          </h3>
          <h5 className={styles.subtext + " no-select"}>
            {statusMesssage.subtext}
          </h5>
          <div className={styles.subsubtext + " no-select"}>
            {statusMesssage.subsubtext}
          </div>
          {scanResults &&
            <div className={styles.results + " btn-group-vertical"}>
              {scanResults.map((item,index) => {
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
            <div className={styles.loading_overlay}>
              <LoadingIndicator />
            </div>
          }

          {status === "eon_selected" &&
            <button className="mt-5 btn btn-dark btn-block" onClick={this.handleScanNetwork} type="button"><i className="fa fa-sync"></i> Refresh List</button>
          }
          {status === "not_scanned" &&
            <button className="mt-4 btn btn-dark btn-block" onClick={this.handleScanNetwork} type="button"><i className="fa fa-sync"></i> Begin Scan</button>
          }
          {status === "scanned_has_results" &&
            <button className="mt-5 btn btn-dark btn-block" onClick={this.handleScanNetwork} type="button"><i className="fa fa-sync"></i> Scan Again</button>
          }
          {status === "scanned_no_results" &&
            <button className="mt-5 btn btn-dark btn-block" onClick={this.handleScanNetwork} type="button"><i className="fa fa-sync"></i> Try Again</button>
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
              
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="ip_address" id="ip_address" value={this.state.value} onChange={this.handleChange} className={styles.add_field + " form-control text-light bg-dark"} placeholder="Add IP Address Manually" />
              </form>
            </div>
          }
        </div>
      </Layout>
    );
  }
}

ConnectEon.propTypes = propTypes;


export default ConnectEon;