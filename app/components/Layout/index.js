import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Logo from "./images/logo.svg";
import styles from './Styles.css';
import * as ConnectEonActions from '../../actions/connect_eon';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
const { shell } = require('electron')
class Layout extends React.PureComponent {
  handleOpenOPC() {
    shell.openExternal('https://opc.ai/');
  }
  render() {
    const { backBtn, hideLogo, selectedEon } = this.props;
    return (
      <div className={styles.app_wrapper}>
        <div className={styles.header + " no-select"}>
          <div className={styles.brand}>
            {backBtn}
            {!hideLogo && <Logo />}
          </div>
          <div className={styles.eon_status + " no-select"}>
            {selectedEon && 
              <div>
                <div className={styles.label}>
                Selected EON
                </div>
                <div className={styles.eon_name}>
                {selectedEon.mac}
                </div>
                <div className={styles.eon_ip}>
                {selectedEon.ip}
                </div>
              </div>
            }
          </div>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
        <div className={styles.footer + " no-select"}>Built with <i className={styles.heart + " fa fa-heart"} /> by <a href="#" onClick={() => this.handleOpenOPC()}>The Openpilot Community</a></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedEon: state.connectEon.selectedEon
  };
}

export default connect(
  mapStateToProps
)(Layout);