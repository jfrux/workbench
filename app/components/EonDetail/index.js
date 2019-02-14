import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Redirect } from 'react-router';
import routes from '../../constants/routes.json';
import PropTypes from 'prop-types';
import Layout from '../Layout';
import SplitPane from 'react-split-pane';
import StateList from './StateList';
import { TabContent, Nav, NavItem, NavLink, TabPane } from 'reactstrap';
import Terminal from '../Terminal';
import Editor from './Editor';
import FileList from './FileList';
import commands from '../commands';
// import GoldenLayout from 'golden-layout';
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
class EonDetail extends React.PureComponent {
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
    const StateTabs = <Nav tabs className={'tab-list'}>
      <Nav tabs className={'command-list'}>
        {stateTabs}
      </Nav>
    </Nav>;
    // const ELEMENT_MAP = {
    //   files: <FileList directory="/data/openpilot" />,
    //   states: StateTabs,
    //   commands: CommandTabs,
    //   editor: <Editor />,
    //   console: <Terminal eonIp={eon.ip} activeCommand={activeCommand} CommandPane={CommandPane} />,
    // };
  
    return (
      <Layout className={'eon-detail'} title={`${this.props.eon.ip}`} contextActions={contextActions}>
          <SplitPane split="vertical" size={"20%"} minSize={200}>
            <div>
              <SplitPane split="horizontal" size={"70%"} minSize={100}>
                <div className="file-list"><FileList directory="/data/openpilot" /></div>
                <div className="commands">
                  <Nav tabs className={'tab-list'}>
                    <Nav tabs className={'command-list'}>
                      {commandTabs}
                    </Nav>
                  </Nav>
                </div>
              </SplitPane>
          </div>
          <SplitPane split="horizontal" size={"50%"} minSize={100}>
            <div><Editor /></div>
            
            <SplitPane split="vertical" size={"50%"} minSize={100}>
              <div><Terminal eonIp={eon.ip} /></div>
              <div><StateList type={serviceIds[0]} /></div>
            </SplitPane>
          </SplitPane>

        </SplitPane>
      </Layout>
    );
  }
}

EonDetail.propTypes = propTypes;

export default EonDetail;