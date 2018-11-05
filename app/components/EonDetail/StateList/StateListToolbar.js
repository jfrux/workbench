import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ZmqActions from '../../../actions/zmq_actions';
import * as UiActions from '../../../actions/ui_actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  paused: PropTypes.bool,
  depth: PropTypes.number,
  messageCount: PropTypes.number
};

class StateListToolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  setDepth = (depth) => {
    this.props.SET_STATE_LIST_DEPTH(depth);
  }
  togglePause = () => {
    this.props.TOGGLE_PAUSE();
  }

  render() {
    const { depth, messageCount, paused } = this.props;
    return (
      <Nav>
        <NavItem>
          <NavLink href="#" onClick={this.togglePause}>
            {paused && <FontAwesomeIcon icon={"play"} />}
            {!paused && <FontAwesomeIcon icon={"pause"} />}
          </NavLink>
        </NavItem>
        <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle nav caret>
            Depth: {depth + ""}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => { this.setDepth(0); }}>0</DropdownItem>
            <DropdownItem onClick={() => { this.setDepth(1); }}>1</DropdownItem>
            <DropdownItem onClick={() => { this.setDepth(2); }}>2</DropdownItem>
            <DropdownItem onClick={() => { this.setDepth(3); }}>3</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavItem>
          <NavLink disabled href="#">Messages: {messageCount}</NavLink>
        </NavItem>
      </Nav>
    )
  }
}

StateListToolbar.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...ZmqActions,...UiActions}, dispatch);
}

const mapStateToProps = (state, {type}) => {
  let messageCount = 0;
  let depth = 1;
  let paused = false;

  if (state.zmq.data && state.zmq.data[type]) {
    if (state.zmq.data[type].messages) {
      messageCount = state.zmq.data[type].messages.length;
    }
  }

  if (state.ui && state.ui.stateListDepth) {
    depth = state.ui.stateListDepth;
  }
  paused = state.zmq.paused;
  return {
    messageCount,
    depth,
    paused
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateListToolbar);