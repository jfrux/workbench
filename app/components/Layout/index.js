import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Comma from "../../images/comma.svg";
import windowsMenu from '../../menus/windows-menu';
import classnames from 'classnames';
import Header from './Header';
import * as networkScannerActions from '../../actions/network_scanner_actions';
import PropTypes from 'prop-types';
// import LoadingOverlay from '../LoadingOverlay';
import { TitleBar } from 'electron-react-titlebar';
import icon from '../../images/icons/36x36.png';
const isMac = /Mac/.test(navigator.userAgent);

import {
  NavItem,
  UncontrolledTooltip,
  NavLink,
  Nav } from 'reactstrap';

const propTypes = {
  appReady: PropTypes.bool,
}
class Layout extends React.PureComponent {
  
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  handleScanNetwork = () => {
    this.props.BEGIN_scanNetwork();
  }
  handleOpenUrl(url) {
    shell.openExternal(url);
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { appReady, title, contextActions, className } = this.props;
    let layoutClasses = [{
      'app-wrapper': true,
      'is-mac': isMac
    }];
    // if (!appReady) {
      // return <LoadingOverlay message={"Loading Workbench"} />;
    // }
    // const menu = AppMenu.createMenu();
    if (className) {
      layoutClasses.push(className);
    }
    // console.warn("appMenu:",);
    return (
      <div className={classnames(layoutClasses)}>
          <div className={'top-bar'}>
          {isMac && <span className={'title'}>{title}</span>}
          {!isMac && 
            <TitleBar menu={windowsMenu} icon={"https://github.com/openpilot-community/workbench/blob/master/resources/icons/36x36.png?raw=true"}>
              <span className={'title'}>{title}</span>
            </TitleBar>}
          </div>
        <div className={'left-bar'}>
          <Nav>
            {contextActions}
          </Nav>
          <Nav className={'bottom-nav'}>
            <NavItem className={'nav-item'}>
              <NavLink onClick={() => this.handleOpenUrl("https://comma.ai/")} id={'Tooltip-Comma'}><Comma style={{height: 18, width: 18 }} /></NavLink>

              <UncontrolledTooltip placement={'right'} target={'Tooltip-Comma'}>
                Comma.ai
              </UncontrolledTooltip>
            </NavItem>
            <NavItem className={'nav-item'}>
              <NavLink onClick={() => this.handleOpenUrl("https://github.com/openpilot-community/workbench")} id={'Tooltip-Workbench'}><i className="fab fa-github"></i></NavLink>
              <UncontrolledTooltip placement={'right'} target={'Tooltip-Workbench'}>
                Workbench GitHub
              </UncontrolledTooltip>
            </NavItem>
          </Nav>
        </div>
        
        <div className={'content'}>
        
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appReady: state.ui.appReady
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(networkScannerActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);