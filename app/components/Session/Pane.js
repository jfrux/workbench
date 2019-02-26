import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Redirect } from 'react-router';
import routes from '../../constants/routes.json';
import PropTypes from 'prop-types';
import { TabContent, Nav, NavItem, NavLink, TabPane } from 'reactstrap';
import commands from '../commands';
// import GoldenLayout from 'golden-layout';
import inflection from 'inflection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  title: PropTypes.string,
  allowCollapse: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
};

class Pane extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }
  togglePane() {
    if (this.props.allowCollapse) {
      this.setState({
        collapsed: !this.state.collapsed
      })
    }
  }
  render() {
    const { title, children, className, allowCollapse } = this.props;
    const { collapsed } = this.state;
    return (
      <div className={"pane " + className}>
        <button className={"pane-heading"} onClick={(ev) => { this.togglePane(ev); }}>
          {allowCollapse && <FontAwesomeIcon icon="caret-down" />} {title}
        </button>
        {!collapsed && 
          <div className={"pane-content"}>
            {children}
          </div>
        }
      </div>);
  }
}

Pane.propTypes = propTypes;

export default Pane;