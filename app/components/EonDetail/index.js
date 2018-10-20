import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Redirect } from 'react-router';
import LazyLoad from 'react-lazy-load';
import routes from '../../constants/routes.json';
import styles from './Styles.scss';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import PropTypes from 'prop-types';
import vehicleConnectionStatuses from '../../constants/vehicle_connection_statuses';
import Layout from '../Layout';
import * as commaEndpoints from '../../constants/comma_endpoints.json';
import vehicleStateGroups from '../../constants/vehicle_state_groups';
import StateList from './StateList';
import LoadingOverlay from '../LoadingOverlay';
import { TabContent, Nav, NavItem, NavLink, TabPane, ListGroupItem } from 'reactstrap';
import {Terminal, XTerm} from '../Terminal';
const propTypes = {
  connecting: PropTypes.bool,
  connected: PropTypes.bool,
  activeTab: PropTypes.string,
  installError: PropTypes.any,
  isLoggedIn: PropTypes.any,
  install: PropTypes.func,
  eon: PropTypes.object,
  messagesReceived: PropTypes.number,
  selectedEon: PropTypes.string,
  currentStateKeys: PropTypes.array
};

class EonDetail extends Component {
  componentDidMount() {
    const { eon, SELECT_EON } = this.props;
    if (eon && this.props.SELECT_EON) {
      this.props.SELECT_EON(eon.id);
    }
    this.socket = new WebSocket(`ws://${eon}:4000/`);
    if (!eon) {
      return;
    }
  }
  setTab(tab) {
    this.props.CHANGE_TAB(tab);
  }
  openDrive(driveIndex) {
    this.props.OPEN_DRIVE(driveIndex);
  }
  render() {
    const { installing, activeTab, messagesReceived, connecting, network, fingerprint, stateRequestFatal, stateRequestAttempts, drives, devices, installError, tmuxError, fingerprintString, currentStateKeys, tmuxStartedAt, thermal, serviceState, eon, selectedEon, healthState, sshConnectionError, sshStatus, sshConnectionStatus, gpsState, vehicleConnection, tmuxAttached } = this.props;
    const vehicleConnectionInfo = vehicleConnectionStatuses[vehicleConnection];
    if (network === 'disconnected' || eon == null || installError || stateRequestFatal) {
      return (<Redirect to={routes.EON_LIST} />);
    }
    if (fingerprint) {
      currentStateKeys.push('fingerprint');
    }
    const stateGroupKeys = Object.keys(vehicleStateGroups);
    // if (!tmuxAttached) {
    //   return <LoadingIndicator className={styles.loading_overlay} />;
    // }
    let stateBlocks, stateTabs, statePanes;
    let loadingMessage = "Connecting...";

    if (!installing && stateRequestAttempts > 0) {
      loadingMessage = loadingMessage + " (retrying " + stateRequestAttempts + ")";
    } else {
      loadingMessage = "Setting up EON for Workbench...";
    }
    if (installing || !stateGroupKeys.length || connecting) {
      return <LoadingOverlay message={loadingMessage} />;
    }
    
    stateTabs = stateGroupKeys.map((key) => {
      return (
        <NavItem key={key + "-tab-link"}>
          <NavLink
            className={classnames({
              test: true,
              active: !installing && stateGroupKeys.length && activeTab === key,
              disabled: installing || !stateGroupKeys.length
            })}
            onClick={() => { this.setTab(key); }}
            >
            {key}
          </NavLink>
        </NavItem>
      );
    });
    statePanes = stateGroupKeys.map((key) => {
      const items = vehicleStateGroups[key];
      return (
        <TabPane key={key + "-tab-pane"} tabId={key}>
          {activeTab === key &&
          <StateList type={key} items={items} />
          }
        </TabPane>
      )
    });
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
      <Layout title={`${this.props.eon.ip} (Messages Received: ${messagesReceived})`} contextActions={contextActions}>
        <Nav tabs className={styles.tabs_list}>
          <NavItem key={"console-tab-link"}>
            <NavLink
              className={classnames({
                test: true,
                active: !installing && stateGroupKeys.length && activeTab === '0',
                disabled: installing || !stateGroupKeys.length
              })}
              onClick={() => { this.setTab('0'); }}
              >
              Console
            </NavLink>
          </NavItem>
          {stateTabs}
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane key={"console-tab-pane"} tabId={'0'}>
            {activeTab === '0' &&
              <XTerm ref='xterm' style={{
                addons:['attach', 'fit', 'fullscreen', 'search'],
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                height: '100%'
              }} />
            }
          </TabPane>
          {statePanes}
        </TabContent>
      </Layout>
    );
  }
}

EonDetail.propTypes = propTypes;

export default EonDetail;