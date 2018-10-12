import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Logo from "../../images/logo.svg";
import Comma from "../../images/comma.svg";
import styles from './Styles.scss';
import * as networkScannerActions from '../../actions/network_scanner_actions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
const { shell } = require('electron');
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
              <NavLink className={"nav-link"} onClick={() => this.handleOpenUrl("https://comma.ai/")}><Comma style={{height: 18, width: 18 }} /></NavLink>
            </NavItem>
            <NavItem className={'nav-item'}>
              <NavLink className={"nav-link"} onClick={() => this.handleOpenUrl("https://github.com/openpilot-community/workbench")}><i className="fab fa-github"></i></NavLink>
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