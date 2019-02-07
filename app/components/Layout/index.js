import { shell } from 'electron';
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
            <TitleBar menu={windowsMenu} icon={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAALEsAACxLAaU9lqkAAALDSURBVFhH7ZU/TFNRFMZPsBsdnHSwsWLUikrbR9tXSKsV/0HSRBONOlQWrE2jLCwGHJTB6KQbGyiYghRf7YUCCoqEPwIONgwkdmM0aVNdYNNT73tUpO2JifHdTv2SX3rSnO9+X95rbqGiinTTkn8fJK8Mw+KlZZi5WB7UrM+XozDbYsq32KHktT64K+XAsru8qJnJ68/yLXZo+cY42Pcin8qLbQ/CUmCCz0X62MagwbS9aDabMRgMYmNjY+EBeqNmLtwc5XORFm/HoWG/tlRTU4PpdBp/KxAIlB6kF26euXCH8blI8x0M3Ae0pVAolK+ypVQqhVVVVaWH6YGaOddBPKHZLl7ooLYkSVK+ypYymQwajcbSw/RA5pmzXUShmW4G8uHtRa/Xi+FwGCORCGazWTQYDIUH6YV8COFDN1Ho/SNeyFJiiMVimEgkSr7XDdcRhHePiULTTxi4aguW3W43bm5uYm1t4fe64jqKMPWUKDTVwwsd15bUH3Brayuura2h3+/fNsuyjL29vQX897XgPIbwtocoNNnHwFmnLVVXV2N7ezuaTH/uJRWPx6O9QkVRNNTZ5/MV7PwzzhPIs6lCQ3Fw2miTSBxWhIlB4h4aj8XBIdEmkTjsCAmFKDSWYOBw0CaR1NcjjI4Rr4xNM6h30SaRqJnxKaJQbJ4XctMmkUg88/UcUUj5xEAS/M9OoWYqK0ShkVVeyEObRGLnmdFVolD0CwP7KdokEvtJhOEUUWh4nRc6TZtEYuMX68t1otDQ1zjYztAmkdiakGcT91DkGy90jjaJxHoWYfA7UejFBgPrBdokEut5hIEN4pX1/2RQ10ybRFLHH8LzH0ShAZwES1OOT7RRFBZfDvrxDZ+LNID3oXMlBy33ctDcxVE//4YOO2pW57Ja6EG+xQ5dze2CEQzCKD6EV2ViK+uWll1RRboI4BdIk2xIFFBxogAAAABJRU5ErkJggg=="}>
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