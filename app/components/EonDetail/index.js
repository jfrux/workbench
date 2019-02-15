import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Redirect } from 'react-router';
import routes from '../../constants/routes.json';
import PropTypes from 'prop-types';
import Layout from '../Layout';
import SplitPane from 'react-split-pane';
import Pane from './Pane';
import StateList from './StateList';
import StateListToolbar from './StateList/StateListToolbar';
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
    const { activeTab,openedFiles,activeCommand, network, devices, currentStateKeys, eon, services, serviceIds } = this.props;
    const commandKeys = Object.keys(commands);
    
    if (network === 'disconnected' || eon == null) {
      return (<Redirect to={routes.EON_LIST} />);
    }
    let stateTabs;

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
   
    // const ELEMENT_MAP = {
    //   files: <FileList directory="/data/openpilot" />,
    //   states: StateTabs,
    //   commands: CommandTabs,
    //   editor: <Editor />,
    //   console: <Terminal eonIp={eon.ip} activeCommand={activeCommand} CommandPane={CommandPane} />,
    // };
    const hasOpenedFiles = Object.keys(openedFiles).length;
    console.log("hasOpenedFiles:",hasOpenedFiles);
    return (
      <Layout className={'eon-detail'} title={`${this.props.eon.ip}`} contextActions={contextActions}>
        <SplitPane split="vertical" size={"20%"} minSize={200}>
          <div>
            <SplitPane split="horizontal" size={"70%"} minSize={100}>
              { 
                //Openpilot File Browser
              }
              <Pane title="Files" className="file-list" allowCollapse={true}>
                <FileList directory="/data/openpilot" />
              </Pane>
              { 
                //Command Tasks List
              }
              <Pane title="Tasks" className="commands task-list" allowCollapse={true}>
                <Nav tabs className={'tab-list command-list'}>
                  {commandTabs}
                </Nav>
              </Pane>
            </SplitPane>
          </div>
          
          {hasOpenedFiles && 
            <SplitPane split="horizontal" size={"50%"} minSize={100}>
              <div><Editor /></div>
              <SplitPane split="vertical" size={"50%"} minSize={100}>
              <Pane title="Terminal" className="eon-console" allowCollapse={false}>
                <Terminal CommandPane={CommandPane} eonIp={eon.ip} />
              </Pane>
              <Pane title="Console" className="state-console" allowCollapse={false}>
                  <div className={"state-toolbar"}>
                    <StateListToolbar />
                  </div>
                  {activeTab && 
                    <StateList />
                  }
              </Pane>
              </SplitPane>
            </SplitPane>
          }
          {!hasOpenedFiles && 
            <div>
            <SplitPane split="vertical" size={"50%"} minSize={100}>
              <Pane title="Terminal" className="eon-console" allowCollapse={false}>
                <Terminal CommandPane={CommandPane} eonIp={eon.ip} />
              </Pane>
              <Pane title="Console" className="state-console" allowCollapse={false}>
                  <div className={"state-toolbar"}>
                    <StateListToolbar />
                  </div>
                  {activeTab && 
                    <StateList />
                  }
              </Pane>
            </SplitPane></div>
          }
        </SplitPane>
      </Layout>
    );
  }
}

EonDetail.propTypes = propTypes;

export default EonDetail;