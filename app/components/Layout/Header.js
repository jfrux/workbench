import React from 'react';
export default class Header extends React.PureComponent {
  constructor() {
    super();
    this.onChangeIntent = this.onChangeIntent.bind(this);
    this.handleHeaderMouseDown = this.handleHeaderMouseDown.bind(this);
    this.handleHamburgerMenuClick = this.handleHamburgerMenuClick.bind(this);
    this.handleMaximizeClick = this.handleMaximizeClick.bind(this);
    this.handleMinimizeClick = this.handleMinimizeClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  onChangeIntent(active) {
    // we ignore clicks if they're a byproduct of a drag
    // motion to move the window
    if (window.screenX !== this.headerMouseDownWindowX || window.screenY !== this.headerMouseDownWindowY) {
      return;
    }
  }

  handleHeaderMouseDown(ev) {
    // the hack of all hacks, this prevents the term
    // iframe from losing focus, for example, when
    // the user drags the nav around
    ev.preventDefault();

    // persist start positions of a potential drag motion
    // to differentiate dragging from clicking
    this.headerMouseDownWindowX = window.screenX;
    this.headerMouseDownWindowY = window.screenY;
  }
  handleHamburgerMenuClick(event) {
    let {right: x, bottom: y} = event.currentTarget.getBoundingClientRect();
    x -= 15; // to compensate padding
    y -= 12; // ^ same
    this.props.openHamburgerMenu({x, y});
  }

  handleMaximizeClick() {
    if (this.props.maximized) {
      this.props.unmaximize();
    } else {
      this.props.maximize();
    }
  }

  handleMinimizeClick() {
    this.props.minimize();
  }

  handleCloseClick() {
    this.props.close();
  }

  componentWillUnmount() {
    delete this.clicks;
    clearTimeout(this.clickTimer);
  }

  getWindowHeaderConfig() {
    const {showHamburgerMenu, showWindowControls} = this.props;

    const defaults = {
      hambMenu: !this.props.isMac, // show by default on windows and linux
      winCtrls: !this.props.isMac // show by default on Windows and Linux
    };

    // don't allow the user to change defaults on macOS
    if (this.props.isMac) {
      return defaults;
    }

    return {
      hambMenu: showHamburgerMenu === '' ? defaults.hambMenu : showHamburgerMenu,
      winCtrls: showWindowControls === '' ? defaults.winCtrls : showWindowControls
    };
  }

  render() {
    const {isMac} = this.props;
    // const props = getTabsProps(this.props, {
    //   tabs: this.props.tabs,
    //   borderColor: this.props.borderColor,
    //   onClose: this.props.onCloseTab,
    //   onChange: this.onChangeIntent
    // });
    const props = this.props;
    const {borderColor} = props;
    let title = 'Workbench';
    // if (props.tabs.length === 1 && props.tabs[0].title) {
    //   // if there's only one tab we use its title as the window title
    //   title = props.tabs[0].title;
    // }
    const {hambMenu, winCtrls} = this.getWindowHeaderConfig();
    const left = winCtrls === 'left';
    const maxButtonHref = this.props.maximized
      ? './renderer/resources/icons.svg#restore-window'
      : './renderer/resources/icons.svg#maximize-window';

    return (
      <header
        className={`header_header ${isMac && 'header_headerRounded'}`}
        onMouseDown={this.handleHeaderMouseDown}
        onDoubleClick={this.handleMaximizeClick}
      >
        {!isMac && (
          <div
            className={`header_windowHeader header_windowHeaderWithBorder`}
            style={{borderColor}}
          >
            {hambMenu && (
              <svg
                className={`header_shape ${left ? 'header_hamburgerMenuRight' : 'header_hamburgerMenuLeft'}`}
                onClick={this.handleHamburgerMenuClick}
              >
                <use xlinkHref="./renderer/resources/icons.svg#hamburger-menu" />
              </svg>
            )}
            <span className="header_appTitle">{title}</span>
            {winCtrls && (
              <div className={`header_windowControls ${left ? 'header_windowControlsLeft' : ''}`}>
                <svg
                  className={`header_shape ${left ? 'header_minimizeWindowLeft' : ''}`}
                  onClick={this.handleMinimizeClick}
                >
                  <use xlinkHref="./renderer/resources/icons.svg#minimize-window" />
                </svg>
                <svg
                  className={`header_shape ${left ? 'header_maximizeWindowLeft' : ''}`}
                  onClick={this.handleMaximizeClick}
                >
                  <use xlinkHref={maxButtonHref} />
                </svg>
                <svg
                  className={`header_shape header_closeWindow ${left ? 'header_closeWindowLeft' : ''}`}
                  onClick={this.handleCloseClick}
                >
                  <use xlinkHref="./renderer/resources/icons.svg#close-window" />
                </svg>
              </div>
            )}
          </div>
        )}
      </header>
    );
  }
}