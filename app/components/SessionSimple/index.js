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
// import Editor from '../Editor';
import commands from '../commands';
import inflection from 'inflection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const propTypes = {
  activeTab: PropTypes.string,
  eon: PropTypes.object,
  messagesReceived: PropTypes.number,
  selectedEon: PropTypes.string,
  serviceIds: PropTypes.array,
  services: PropTypes.object
};

class SessionSimple extends React.PureComponent {
  setTab = (tab) => {
    this.props.CHANGE_TAB(tab);
  }
  showCommand = (tab) => {
    this.props.SHOW_COMMAND(tab);
  }
  runCommand = (command) => {
    this.props.RUN_COMMAND(command);
  }
  toggleLiveData = () => {
    this.props.TOGGLE_DATA();
  }
  render() {
    const { activeTab, activeCommand, network, devices, currentStateKeys, eon, services, serviceIds } = this.props;
    const commandKeys = Object.keys(commands);

    if (network === 'disconnected' || eon == null) {
      return (<Redirect to={routes.EON_LIST} />);
    }
    let stateTabs, statePanes;
    let commandTabs = commandKeys.map((key,index) => {
      const command = new commands[key];
      console.log(command);
      return (<NavItem key={key + "-tab-link"}>
        <NavLink
          className={classnames({
            test: true,
            "no-select": true,
            active: commandKeys.length && activeCommand === key,
            disabled: !commandKeys.length
          })} onClick={() => { this.showCommand(key); }}>
          {command.name}
        </NavLink>
      </NavItem>
      );
    });

    stateTabs = serviceIds.map((key) => {
      const service = services[key];
      return (
        <NavItem className={classnames({ hide: service.hide })} key={key + "-tab-link"}>
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
        <TabPane key={key + "-tab-pane"} className={key + "-tab-pane"} tabId={key}>
          {activeTab === key && <StateList type={key} />}
        </TabPane>
      );
    });

    const contextActions = [
      <NavItem key={1} className={"nav_item"}>
        <NavLink tag={Link} to={routes.EON_LIST} className={"nav_link"}>
          <FontAwesomeIcon icon="chevron-left" />
        </NavLink>
      </NavItem>
    ];
    let CommandPane;
    const isLiveDataTab = (activeTab === 'live_data' || serviceIds.includes(activeTab));
    if (activeCommand) {
      CommandPane = commands[activeCommand];
    }

  // STASHING THIS FOR LATER.
  // <NavItem key={"editor-tab-link"}>
  //   <NavLink className={classnames({
  //       "no-select": true,
  //       active: activeTab === 'editor',
  //       disabled: !serviceIds.length
  //     })}
  //     onClick={() => { this.setTab('editor'); }}>
  //     <span className={"icon"}><FontAwesomeIcon icon="code" /></span> Code Editor
  //   </NavLink>
  // </NavItem>
    return (
      <Layout className={'eon-detail'} title={`${this.props.eon.ip}`} contextActions={contextActions}>
        <Nav tabs className={'tab-list'}>
          <NavItem key={"console-tab-link"}>
            <NavLink className={classnames({
                "no-select": true,
                active: activeTab === 'console',
                disabled: !serviceIds.length
              })}
              onClick={() => { this.setTab('console'); }}>
              <span className={"icon"}><FontAwesomeIcon icon="terminal" /></span> Console
            </NavLink>

            {activeTab === 'console' &&
              <Nav tabs className={'command-list'}>
                {commandTabs}
              </Nav>
            }
          </NavItem>
          <NavItem key={"live_data-tab-link"}>
            <NavLink className={classnames({
                "no-select": true,
                active: serviceIds.length && isLiveDataTab,
                disabled: !serviceIds.length
              })}
              onClick={() => { this.setTab('live_data'); }}>
              <span className={"icon"}><FontAwesomeIcon icon="stream" /></span> Live Data
            </NavLink>

            {(activeTab === 'live_data' || serviceIds.includes(activeTab)) &&
              <Nav tabs className={'command-list'}>
                {stateTabs}
              </Nav>
            }
          </NavItem>


        </Nav>
        <TabContent className={'tab-content'} activeTab={activeTab}>
          <TabPane className={"console-tab console-tab-pane"} key={"console-tab-pane"} tabId={'console'}>
            <Terminal eonIp={eon.ip} activeCommand={activeCommand} CommandPane={CommandPane} />
          </TabPane>
          <TabPane className={"editor-tab editor-tab-pane"} key={"editor-tab-pane"} tabId={'editor'}>
            <Editor eonIp={eon.ip} />
          </TabPane>
          {statePanes}
        </TabContent>
      </Layout>
    );
  }
}

SessionSimple.propTypes = propTypes;

export default SessionSimple;
