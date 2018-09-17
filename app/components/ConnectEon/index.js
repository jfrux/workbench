// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Styles.css';
import { Route, Redirect } from 'react-router'
import routes from '../../constants/routes.json';
import Layout from '../Layout';
import LoadingIndicator from '../LoadingIndicator';

const propTypes = {
  scanNetwork: PropTypes.func,
  scanResults: PropTypes.array,
  scanError: PropTypes.string,
  scanning: PropTypes.bool,
  status: PropTypes.string
};

const statusMessages = {
  eon_selected: {
    title: "Successfully linked EON",
    subtext: "",
    subsubtext: ""
  },
  scanning: {
    title: "Scanning your network...",
    subtext: "We're compiling a list of EON on the local network.",
    subsubtext: "This may take a minute."
  },
  scanned_has_results: {
    title: "Select your EON",
    subtext: "We found one or more EONs on the local network.",
    subsubtext: ""
  },
  scanned_no_results: {
    title: "Ouch, that sucks.",
    subtext: "We were unable to find EON on your network.",
    subsubtext: "Please verify that EON is connected to the same network as this computer."
  },
  not_scanned: {
    title: "Let's get started",
    subtext: "Workbench needs to locate EON on the local network.",
    subsubtext: "Press the button below to rip it and stick it."
  }
}

class ConnectEon extends Component {
  constructor() {
    super();
    this.state = {
      scanningStarted: false
    }
  }
  handleScanNetwork = () => {
    this.props.scanNetwork();
  }
  handleSelectEon = (index) => {
    this.props.selectEon(index);
    this.props.history.push('/');
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
    const backBtn = <div className={styles.backButton} data-tid="backButton">
      <Link className="btn btn-dark" to={routes.HOME}>
        <i className="fa fa-chevron-left" />
      </Link>
    </div>
    return (
      <Layout backBtn={backBtn} hideLogo={true}>
        <div className={styles.container + " container"}>
          <div className={styles.btnGroup}>
            <h3 className={styles.title}>
              {statusMesssage.title}
            </h3>
            <h5 className={styles.subtext}>
              {statusMesssage.subtext}
            </h5>
            <div className={styles.subsubtext}>
              {statusMesssage.subsubtext}
            </div>

            {scanResults &&
              <div className={styles.results + " btn-group-vertical"}>
                {scanResults.map((item,index) => {
                  return (<button key={index} className={styles.results_button + " btn btn-dark btn-block"} onClick={() => this.handleSelectEon(index)}>
                  <span className={styles.results_button_line}>{item.ip}</span>
                  <span className={styles.results_button_line}>{item.vendor}</span>
                </button>)
                })}
              </div>
            }
            {scanning && 
              <LoadingIndicator />
            }
            {status === "not_scanned" &&
              <button className="mt-4 btn btn-dark btn-block" onClick={this.handleScanNetwork} type="button">Begin Scan</button>
            }
            {status === "scanned_has_results" &&
              <button className="mt-5 btn btn-dark btn-block" onClick={this.handleScanNetwork} type="button">Scan Again</button>
            }
            {status === "scanned_no_results" &&
              <button className="mt-5 btn btn-dark btn-block" onClick={this.handleScanNetwork} type="button">Try Again</button>
            }
          </div>
        </div>
      </Layout>
    );
  }
}

ConnectEon.propTypes = propTypes;


export default ConnectEon;