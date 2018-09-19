import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Logo from "./images/logo.svg";
import styles from './Styles.css';
import * as eonListActions from '../../actions/eon_list_actions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
const { shell } = require('electron')
class Layout extends React.PureComponent {
  handleOpenOPC() {
    shell.openExternal('https://opc.ai/');
  }
  componentDidMount() {
    this.props.retrieveEonFromSettings();
  }
  render() {
    const { backBtn, hideLogo, selectedEon } = this.props;
    return (
      <div className={styles.app_wrapper}>
        <div className={styles.header + " no-select"}>
          <div className={styles.brand}>
            {!hideLogo && <Logo />}
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
    selectedEon: state.eonList.selectedEon
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(eonListActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);