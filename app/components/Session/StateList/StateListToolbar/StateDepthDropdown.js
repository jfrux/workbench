import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ZmqActions from '../../../../actions/zmq_actions';
import * as UiActions from '../../../../actions/ui_actions';
import * as EonActions from '../../../../actions/eon_detail_actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { getDepthState } from '../../../../selectors/selectors';

const propTypes = {
  paused: PropTypes.bool,
  depth: PropTypes.number,
  messageCount: PropTypes.number
};

class StateDepthDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      servicelistOpen: false,
      dropdownOpen: false
    };
  }
  toggleServiceList = () => {
    this.setState({
      servicelistOpen: !this.state.servicelistOpen
    });
  }
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  setService = (serviceKey) => {
    this.props.DISCONNECT(this.props.type);
    this.props.CHANGE_TAB(serviceKey);
    this.props.CONNECT(serviceKey);
  }
  setDepth = (depth) => {
    this.props.SET_STATE_LIST_DEPTH(depth);
  }
  togglePause = () => {
    this.props.TOGGLE_PAUSE();
  }

  render() {
    const { depth } = this.props;
    return (
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
    );
  }
}

StateDepthDropdown.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...ZmqActions,...EonActions,...UiActions}, dispatch);
}

const mapStateToProps = (state, props) => {
  return {
    depth: getDepthState(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateDepthDropdown);
