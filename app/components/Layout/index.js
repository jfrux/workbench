import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Comma from "../../images/comma.svg";
const { shell } = require('electron');
import * as networkScannerActions from '../../actions/network_scanner_actions';
import PropTypes from 'prop-types';
import {
  NavItem,
  UncontrolledTooltip,
  NavLink,
  Nav } from 'reactstrap';

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
    const { backBtn, scanning, title, hideLogo, selectedEon, contextActions } = this.props;
    return (
      <div className={'app-wrapper'}>
        <div className={'top-bar'}>
          <span className={'title'}>{title}</span>
        </div>

        <div className={'left-bar'}>
          <Nav style={{marginTop:'36px'}}>
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
    selectedEon: state.eonList.selectedEon,
    scanning: state.networkScanner.scanning
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(networkScannerActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);