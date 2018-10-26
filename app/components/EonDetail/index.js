import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Redirect } from 'react-router';
import routes from '../../constants/routes.json';
import styles from './Styles.scss';
import PropTypes from 'prop-types';
import vehicleConnectionStatuses from '../../constants/vehicle_connection_statuses';
import Layout from '../Layout';
import serviceList from '../../constants/service_list.yaml';
import StateList from './StateList';
import { TabContent, Nav, NavItem, NavLink, TabPane } from 'reactstrap';
import Terminal from '../Terminal';

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
    const { installing, activeTab, network, fingerprint, stateRequestFatal, devices, installError, currentStateKeys, eon } = this.props;
    // const vehicleConnectionInfo = vehicleConnectionStatuses[vehicleConnection];
    if (network === 'disconnected' || eon == null || installError || stateRequestFatal) {
      return (<Redirect to={routes.EON_LIST} />);
    }
    if (fingerprint) {
      currentStateKeys.push('fingerprint');
    }
    const stateGroupKeys = Object.keys(serviceList);
    let stateTabs, statePanes;
    // console.warn("stateGroupKeys",stateGroupKeys);
    
    stateTabs = stateGroupKeys.map((key) => {
      const stateGroup = serviceList[key];
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
            {stateGroup.label}
          </NavLink>
        </NavItem>
      );
    });
    statePanes = stateGroupKeys.map((key) => {
      const stateGroup = serviceList[key];
      return (
        <TabPane key={key + "-tab-pane"} tabId={key}>
          {activeTab === key &&
            <StateList type={key} eon={this.props.eon} group={stateGroup} />
          }
        </TabPane>
      );
    });

    const contextActions = [
      <NavItem key={1} className={styles.nav_item}>
        <NavLink tag={Link} to={routes.EON_LIST} className={"nav_link"}><i className="fas fa-chevron-left"></i></NavLink>
      </NavItem>
    ];

    return (
      <Layout title={`${this.props.eon.ip}`} contextActions={contextActions}>
        <Nav tabs className={'tab-list'}>
          <NavItem key={"console-tab-link"}>
            <NavLink className={classnames({
                test: true,
                active: !installing && stateGroupKeys.length && activeTab === 'console',
                disabled: installing || !stateGroupKeys.length
              })}
              onClick={() => { this.setTab('console'); }}>
              Console
            </NavLink>
          </NavItem>
          {stateTabs}
        </Nav>
        <TabContent className={'tab-content'} activeTab={activeTab}>
          <TabPane className={"console-tab"} key={"console-tab-pane"} tabId={'console'}>
            <Terminal eonIp={eon.ip} />
          </TabPane>
          {statePanes}
        </TabContent>
      </Layout>
    );
  }
}

EonDetail.propTypes = propTypes;

export default EonDetail;