import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Redirect } from 'react-router';
import routes from '../../constants/routes.json';
import PropTypes from 'prop-types';
import Layout from '../Layout';
import LoadingOverlay from '../LoadingOverlay';
import SplitPane from 'react-split-pane';
import Pane from './Pane';
import { TabContent, Nav, NavItem, NavLink, TabPane } from 'reactstrap';
import Terminal from '../Terminal';
import EditorTabs from './Editor/EditorTabs';
import Editor from './Editor';
import FileList from './FileList';
import Console from './Console';
import commands from '../commands';
// import GoldenLayout from 'golden-layout';
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
  componentWillMount() {
    this.props.BOOTSTRAP_EON();
  }
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
    const { activeTab,activeFile, connecting, activeCommand, network, eon } = this.props;
    const commandKeys = Object.keys(commands);
    
    if (connecting) return (<LoadingOverlay message={"Connecting to EON..."} />);
    if (network === 'disconnected' || eon == null) {
      return (<Redirect to={routes.EON_LIST} />);
    }
    let stateTabs;

    let commandTabs = commandKeys.map((key,index) => {
      const command = new commands[key];
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
    if (activeCommand) {
      CommandPane = commands[activeCommand];
    }
    const editorHeight = activeFile ? "50%" : 0;
    const editorMinSize = activeFile ? 100 : 0;
    // const ELEMENT_MAP = {
    //   files: <FileList directory="/data/openpilot" />,
    //   states: StateTabs,
    //   commands: CommandTabs,
    //   editor: <Editor />,
    //   console: <Terminal eonIp={eon.ip} activeCommand={activeCommand} CommandPane={CommandPane} />,
    // };
    // const hasOpenedFiles = Object.keys(openedFiles).length;
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
          
          <SplitPane split="horizontal" size={editorHeight} minSize={editorMinSize}>
            <div className="editor-container">
              <EditorTabs />
              <Editor />
            </div>
            <SplitPane split="vertical" size={"50%"} minSize={100}>
            <Pane title="Terminal" className="eon-console" allowCollapse={false}>
              <Terminal CommandPane={CommandPane} eonIp={eon.ip} />
            </Pane>
            <Pane title="Console" className="state-console" allowCollapse={false}>
              <Console activeEvent={activeTab} />
            </Pane>
            </SplitPane>
          </SplitPane>
        </SplitPane>
      </Layout>
    );
  }
}

EonDetail.propTypes = propTypes;

export default EonDetail;