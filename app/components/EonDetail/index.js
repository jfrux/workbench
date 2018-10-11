import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const app = require('electron').remote.app;
import Textarea from 'react-textarea-autosize';
import classnames from 'classnames';
import { Redirect } from 'react-router';
import LazyLoad from 'react-lazy-load';
import routes from '../../constants/routes.json';
import styles from './Styles.scss';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import PropTypes from 'prop-types';
import vehicleConnectionStatuses from '../../constants/vehicle_connection_statuses.json';
import Layout from '../Layout';
import LoadingIndicator from '../LoadingIndicator';
import * as commaEndpoints from '../../constants/comma_endpoints.json';
// import ConnectedTime from './ConnectedTime';
import { LineChart, PieChart } from 'react-chartkick';
import Battery from './Widgets/Battery';
import commands from '../../constants/commands.json';
import StateList from './StateList';
import ThermalStateList from './StateList/ThermalStateList';
import LoadingOverlay from '../LoadingOverlay';
import TaskDialog from '../TaskDialog';
import DriveViewer from './DriveViewer';
import { Row, CardHeader,TabContent, Nav, NavItem, NavLink, TabPane, Col, Card, CardBody, CardText, CardTitle, CardSubtitle, ListGroup, ListGroupItem } from 'reactstrap';
// import io from 'socket.io-client';
const propTypes = {
  stateRequestFatal: PropTypes.bool,
  stateRequestAttempts: PropTypes.number,
  activeTab: PropTypes.string,
  drives: PropTypes.any,
  installError: PropTypes.any,
  devices: PropTypes.any,
  isLoggedIn: PropTypes.any,
  apiRequest: PropTypes.func,
  auth: PropTypes.object,
  install: PropTypes.func,
  eon: PropTypes.object,
  selectedEon: PropTypes.string,
  sshConnectionError: PropTypes.object,
  sshConnectionStatus: PropTypes.string,
  vehicleStarted: PropTypes.string,
  vehicleStartedAt: PropTypes.string,
  vehicleConnection: PropTypes.string,
  healthState: PropTypes.object,
  thermal: PropTypes.object,
  gpsLocation: PropTypes.object,
  network: PropTypes.string,
  tmuxError: PropTypes.any,
  sshStatus: PropTypes.any,
  fingerprint: PropTypes.any,
  currentStateKeys: PropTypes.array,
  fingerprintString: PropTypes.string
};

class EonDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      processesAndThermalsHeight: 0
    };
  }
  componentDidMount() {
    const { eon, SELECT_EON } = this.props;
    console.log("mounted detail screen");
    console.log(eon);
    console.log(SELECT_EON);
    if (eon && this.props.SELECT_EON) {
      this.props.SELECT_EON(eon.id);
    }
  }
  componentWillUnmount() {
    this.props.STOP_POLLING();
  }
  setTab(tab) {
    this.props.CHANGE_TAB(tab);
  }
  openDrive(driveIndex) {
    this.props.OPEN_DRIVE(driveIndex);
  }
  render() {
    const { activeTab, installing, network, fingerprint, stateRequestFatal, stateRequestAttempts, drives, devices, installError, tmuxError, fingerprintString, currentStateKeys, tmuxStartedAt, thermal, serviceState, eon, selectedEon, healthState, sshConnectionError, sshStatus, sshConnectionStatus, gpsState, vehicleConnection, tmuxAttached } = this.props;
    const vehicleConnectionInfo = vehicleConnectionStatuses[vehicleConnection];
    // const { usbOnline } = thermal;
    // console.warn("sshConnectionError:",sshConnectionError);
    if (network === 'disconnected' || eon == null || installError || stateRequestFatal) {
      return (<Redirect to={routes.EON_LIST} />);
    }
    if (fingerprint) {
      currentStateKeys.push('fingerprint');
    }
    // if (!tmuxAttached) {
    //   return <LoadingIndicator className={styles.loading_overlay} />;
    // }
    let stateBlocks;
    let loadingMessage = "Connecting...";

    if (!installing && stateRequestAttempts > 0) {
      loadingMessage = loadingMessage + " (retrying " + stateRequestAttempts + ")";
    } else {
      loadingMessage = "Setting up EON for Workbench...";
    }
    // if (installing || !currentStateKeys.length) {
    //   stateBlocks = <LoadingOverlay message={loadingMessage} />;
    // } else {
    //   stateBlocks = currentStateKeys.map((key) => {
    //     const items = this.props[key];
    //     return (<Card key={key} className={"state-card"}>
    //       <CardBody className={"state-card-body"}>
    //         <CardHeader className={"state-card-header"}>{key}</CardHeader>
    //         <StateList items={items} />
    //       </CardBody>
    //     </Card>);
    //   });
    // }
    // vidurl example:
    // https://video.comma.ai/hls/0812e2149c1b5609/0ccfd8331dfb6f5280753837cefc9d26_2018-10-06--19-56-04/index.m3u8
    let drivesList;
    if (drives) {
      const drivesKeys = Object.keys(drives).sort(function(a, b){
        let parsedA = moment(a, "YYYY-MM-DD--HH-mm-SS");
        let parsedB = moment(b, "YYYY-MM-DD--HH-mm-SS");
        // console.log("a",parsedA);
        // console.log("b",parsedB);
        return parsedB.valueOf()-parsedA.valueOf();
      });
      drivesList = drivesKeys.map((key) => {
        const route = drives[key];
        const thumbnail = `${commaEndpoints.Thumbnail.Base}${commaEndpoints.Thumbnail.Endpoint.tiny.replace(":segment_string",route.sig_path)}`;
        return (<LazyLoad key={key} height={70}>
          <ListGroupItem tag="a" href="#" onClick={(ev) => {this.openDrive(key); ev.preventDefault(); return false;}}>
            <span className={"thumbnail"}><img src={thumbnail} /></span>
            <span className={"details"}>
            <strong>{route.start_geocode} to {route.end_geocode}</strong><br />
            <Moment format="dddd MMM. DD, YYYY hh:mm:SS a" tz="America/Los_Angeles">{route.start_time}</Moment>
            </span>
          </ListGroupItem>
        </LazyLoad>);
      });
    }

    let devicesList;

    if (devices) {
      // const devicesKeys = Object.keys(devices);
      devicesList = devices.map((device,index) => {
        return (<div key={index}>{device.alias} {device.device_type}</div>);
      });
    }
    const contextActions = [
      <NavItem key={1} className={styles.nav_item}>
        <NavLink tag={Link} to={routes.EON_LIST} className={"nav_link"}><i className="fas fa-chevron-left"></i></NavLink>
      </NavItem>
    ];

    return (
      <Layout title={this.props.eon.ip} contextActions={contextActions}>
        <DriveViewer />
        <Nav tabs className={styles.tabs_list}>
          <NavItem>
            <NavLink
              className={classnames({active: !installing && currentStateKeys.length && activeTab === '1',
              disabled: installing || !currentStateKeys.length})}
              onClick={() => { this.setTab('1'); }}
              >
              EON
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({active: !installing && currentStateKeys.length && activeTab === '2',
              disabled: installing || !currentStateKeys.length})}
              onClick={() => { this.setTab('2'); }}>
              Panda
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({active: !installing && currentStateKeys.length && activeTab === '4',
              disabled: installing || !currentStateKeys.length})}
              onClick={() => { this.setTab('4'); }}>
              Vehicle
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <ThermalStateList />
            {stateBlocks}
          </TabPane>
          <TabPane tabId="2">
            <ListGroup className={"route-list"}>
              {drivesList}
            </ListGroup>
          </TabPane>
          <TabPane tabId="3">
            {devicesList}
          </TabPane>
          <TabPane tabId="4">
            {fingerprintString && 
            <Card className={"state-card"}>
              <CardBody className={"state-card-body"}>
                <CardHeader className={"state-card-header"}>Fingerprint</CardHeader>
                <Textarea autoFocus className={styles.fingerprint_input + " form-control text-light"} rows="4" defaultValue={fingerprintString} />
              </CardBody>
            </Card>
            }
            {!fingerprintString && 
              <Card className={"state-card"}>
                <CardBody className={"state-card-body"}>
                  <CardHeader className={"state-card-header"}>Fingerprint</CardHeader>
                  <p>Waiting for vehicle...</p>
                </CardBody>
              </Card>
            }
          </TabPane>
        </TabContent>
      </Layout>
    );
  }
}

EonDetail.propTypes = propTypes;

export default EonDetail;