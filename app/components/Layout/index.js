import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Logo from "../../images/logo.svg";
import styles from './Styles.scss';
import * as eonListActions from '../../actions/eon_list_actions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
const { shell } = require('electron')
class Layout extends React.PureComponent {
  handleOpenOPC() {
    shell.openExternal('https://opc.ai/');
  }
  // componentDidMount() {
  //   // this.props.retrieveEonFromSettings();
  // }
  render() {
    const { backBtn, hideLogo, selectedEon } = this.props;
    return (
      <div className={styles.app_wrapper + (hideLogo ? " thin-wrapper" : "")}>
        <div className={styles.header + " no-select"}>
        {!hideLogo && 
          <div className={styles.brand}>
           
          </div>
        }
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