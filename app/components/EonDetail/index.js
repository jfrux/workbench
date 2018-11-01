import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Redirect } from 'react-router';
import routes from '../../constants/routes.json';
import PropTypes from 'prop-types';
import Layout from '../Layout';
import StateList from './StateList';
import { TabContent, Nav, NavItem, NavLink, TabPane } from 'reactstrap';
import Terminal from '../Terminal';

const propTypes = {
  activeTab: PropTypes.string,
  eon: PropTypes.object,
  messagesReceived: PropTypes.number,
  selectedEon: PropTypes.string,
  serviceIds: PropTypes.array,
  services: PropTypes.object
};

class EonDetail extends Component {
  setTab = (tab) => {
    this.props.CHANGE_TAB(tab);
  }
  render() {
    const { activeTab, network, devices, currentStateKeys, eon, services, serviceIds } = this.props;
    if (network === 'disconnected' || eon == null) {
      return (<Redirect to={routes.EON_LIST} />);
    }
    let stateTabs, statePanes;
    
    stateTabs = serviceIds.map((key) => {
      const service = services[key];
      return (
        <NavItem key={key + "-tab-link"}>
          <NavLink
            className={classnames({
              test: true,
              "no-select": true,
              active: serviceIds.length && activeTab === key,
              disabled: !serviceIds.length
            })}
            onClick={() => { this.setTab(key); }}
            >
            {service.label}
          </NavLink>
        </NavItem>
      );
    });
    statePanes = serviceIds.map((key) => {
      const service = services[key];
      return (
        <TabPane key={key + "-tab-pane"} tabId={key}>
          {activeTab === key && <StateList type={key} />}
        </TabPane>
      );
    });

    const contextActions = [
      <NavItem key={1} className={"nav_item"}>
        <NavLink tag={Link} to={routes.EON_LIST} className={"nav_link"}><i className="fas fa-chevron-left"></i></NavLink>
      </NavItem>
    ];

    return (
      <Layout className={'eon-detail'} title={`${this.props.eon.ip}`} contextActions={contextActions}>
        <Nav tabs className={'tab-list'}>
          <NavItem key={"console-tab-link"}>
            <NavLink className={classnames({
                test: true,
                "no-select": true,
                active: serviceIds.length && activeTab === 'console',
                disabled: !serviceIds.length
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