import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Logo from "../../images/logo.svg";
import Comma from "../../images/comma.svg";
import styles from './Styles.scss';
import * as eonListActions from '../../actions/eon_list_actions';
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
const { shell } = require('electron')
class Layout extends React.PureComponent {
  
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  handleScanNetwork = () => {
    this.props.scanNetwork();
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
    const { backBtn, scanning, title, hideLogo, selectedEon } = this.props;
    return (
      <div className={styles.app_wrapper + (hideLogo ? " thin-wrapper" : "")}>
        <div className={styles.top_bar + " no-select"}>
          <span className={styles.title}>{title}</span>
        </div>

        <div className={styles.left_bar}>
          <Nav className={"mt-5"}>
            <NavItem className={styles.nav_item}>
              <NavLink className={styles.nav_link} onClick={this.handleScanNetwork}><i className={"fa fa-sync" + (scanning ? " fa-spin" : "")}></i></NavLink>
            </NavItem>
            <NavItem className={styles.nav_item}>
              <NavLink tag={Link} to={routes.EON_LIST} className={styles.nav_link}><i className="fas fa-list"></i></NavLink>
            </NavItem>
          </Nav>
          <Nav className={styles.bottom_nav}>
            <NavItem className={styles.nav_item}>
              <NavLink className={styles.nav_link} onClick={() => this.handleOpenUrl("https://comma.ai/")}><Comma style={{height: 18, width: 18 }} /></NavLink>
            </NavItem>
            <NavItem className={styles.nav_item}>
              <NavLink className={styles.nav_link} onClick={() => this.handleOpenUrl("https://github.com/openpilot-community/workbench")}><i className="fab fa-github"></i></NavLink>
            </NavItem>
          </Nav>
        </div>
        
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedEon: state.eonList.selectedEon,
    scanning: state.eonList.scanning
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(eonListActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);