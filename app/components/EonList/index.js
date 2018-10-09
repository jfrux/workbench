// @flow
import React, { Component } from 'react';
import styles from './Styles.scss';
import Eon from "../../images/device-icons/eon.svg";
import PropTypes from 'prop-types';
import routes from '../../constants/routes.json';
import Layout from '../Layout';
import NoConnection from './NoConnection';
import ProgressBar from './ProgressBar';
import LoadingIndicator from '../LoadingIndicator';
import { Container, ListGroup, Collapse, Card, CardBody, ListGroupItem } from 'reactstrap';
import statusMessages from '../../constants/scan_status_messages.json';
import sshConnectionStatusMessages from '../../constants/ssh_connection_status.json';

const propTypes = {
  scanNetwork: PropTypes.func,
  scanResults: PropTypes.object,
  scanError: PropTypes.string,
  scanning: PropTypes.bool,
  status: PropTypes.string,
  selectedEon: PropTypes.any,
  network: PropTypes.string,
  networkIp: PropTypes.string,
  progress: PropTypes.any
};

function ValidateIPaddress(ipaddress) 
{
 if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
  {
    return (true);
  }
  return (false);
}

class EonList extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      manualError: '',
      scanningStarted: false
    };
  }
  componentWillMount() {
    this.props.resetScanNetwork();
  }
  handleScanNetwork = () => {
    this.props.BEGIN_scanNetwork();
  }
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }
  addEon = (eon) => {
    this.props.REMOVE_SCANNED_RESULT(eon.id);
    this.props.ADD_EON({
      ip: eon.ip,
      mac: "00:00:00:00:00"
    });
  }
  handleSubmit = (event) => {
    const { value } = this.state;
    if (ValidateIPaddress(value)) {
      this.setState({
        manualError: ''
      });
      this.props.ADDED_EON({
        ip: value
      });
      this.props.ADD_EON({
        ip: value,
        mac: "00:00:00:00:00"
      });
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
      eons,
      networkIp,
      selectedEon,
      progress
    } = this.props;
    const { manualError } = this.state;
    const scanResultsList = Object.keys(scanResults);
    const eonList = Object.keys(eons);
    console.log("scanResults:",scanResults);
    console.log("scanResultsList:",scanResultsList);
    console.log("eons:",eons);
    console.log("eonList:",eonList);
    // if (selectedEon !== null) {
    //   // console.warn("SSH CONNECTION ERROR!",sshConnectionError);
    //   return (<Redirect to={routes.EON_DETAIL} />); 
    // }
    if (network === 'disconnected') {
      return <NoConnection />;
    }
    
    return (
      <Layout title="Workbench">
        <Collapse isOpen={scanning}>
          <Card body inverse className={"scanning-message"}>
            <CardBody className={"scanning-message-body"}>
              Scanning for EON...
            </CardBody>
          </Card>
        </Collapse>
        
        <Collapse isOpen={manualError.length > 0}>
          <Card body inverse color="danger" className={styles.error_message}>
            <CardBody className={styles.error_message_body}>
              {this.state.manualError}
            </CardBody>
          </Card>
        </Collapse>
        
        <div className={styles.found_eons}>
          {(scanResultsList.length > 0) && 
            <span>
            <div className={styles.list_group_header}>
              Found {scanResults.length} New EON(s)
            </div>
            <ListGroup>
              {scanResultsList.map((key,index) => {
                let scanResult = scanResults[key];
                // console.log("scanResult:",scanResult);
                if (scanResult) {
                  return (<ListGroupItem key={index} onClick={() => { this.addEon(scanResult);}} className={styles.results_button} tag="button">
                      <span className={styles.eon_icon}><Eon width="100%" height="100%" /></span>
                      <span className={styles.results_details}>
                        <span className={styles.results_button_ip}>{scanResult.ip}</span>
                        <span className={styles.results_button_mac}>{scanResult.mac}</span>
                      </span>
                      <span className={styles.results_button_selected}><i className="fa fa-plus"></i></span>
                    </ListGroupItem>);
                } else {
                  return (
                    <ListGroupItem key={index} onClick={() => { this.handleSelectEon(scanResult.id);}} className={styles.results_button} tag="button">
                    </ListGroupItem>
                  )
                }
              })}
            </ListGroup>
            </span>
          }
        </div>

        <div className={styles.existing_eons}>
          {eons && 
            <span>
            {(scanResultsList.length > 0) &&
              <div className={styles.list_group_header}>
                Previously Added EONs
              </div>
            }
            <ListGroup>
              {eonList.map((key,index) => {
                let eon = eons[key];
                console.log("eon:",eon);
                return (<ListGroupItem key={index} onClick={() => { this.handleSelectEon(eon.id);}} className={styles.results_button} tag="button">
                    <span className={styles.eon_icon}><Eon width="100%" height="100%" /></span>
                    <span className={styles.results_details}>
                      <span className={styles.results_button_ip}>{eon.ip}</span>
                      <span className={styles.results_button_mac}>{eon.mac}</span>
                    </span>
                    <span className={styles.results_button_selected}><i className="fa fa-chevron-right"></i></span>
                  </ListGroupItem>);
              })}
            </ListGroup>
            </span>
          }
        </div>
          
          <Collapse isOpen={!scanning}>
          <div className={styles.add_form_area}>
            <form onSubmit={this.handleSubmit} className={styles.form}>
              <input type="text" className={styles.add_field + " form-control"} value={this.state.value} onChange={this.handleChange} placeholder="___.___.___.___" />
              <button className={styles.add_ip_button + " btn btn-primary"} type="submit"><i className="fa fa-plus"></i></button>
            </form>
          </div>
          </Collapse>
      </Layout>
    );
  }
}

EonList.propTypes = propTypes;

export default EonList;