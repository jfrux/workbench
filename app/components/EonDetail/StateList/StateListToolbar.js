import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ZmqActions from '../../../actions/zmq_actions';
import * as UiActions from '../../../actions/ui_actions';
import services from '../../../constants/service_list.yaml';
import getSortedServiceIds from '../../../selectors/get_sorted_service_ids';
import * as EonActions from '../../../actions/eon_detail_actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { debugOnlyWastedRenderDetector } from "wastedrendersdetector";

const propTypes = {
  paused: PropTypes.bool,
  depth: PropTypes.number,
  messageCount: PropTypes.number
};

class StateListToolbar extends Component {
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
    const { depth, messageCount, paused, type, serviceIds, services } = this.props;
    const activeService = services[type];
    const stateTabs = serviceIds.map((key) => {
      const service = services[key];
      return (
        <DropdownItem onClick={() => { this.setService(key); }} id={key + "-tab-link"} key={key + "-tab-link"}>{service.label}</DropdownItem>
      );
    });
    return (
      <Nav>
        <NavItem>
          <NavLink href="#" onClick={this.togglePause}>
            {paused && <FontAwesomeIcon icon={"play"} />}
            {!paused && <FontAwesomeIcon icon={"pause"} />}
          </NavLink>
        </NavItem>
        <Dropdown nav isOpen={this.state.servicelistOpen} toggle={this.toggleServiceList}>
          <DropdownToggle nav caret>
            {activeService.label}
            {!type && "Inactive"}
          </DropdownToggle>
          <DropdownMenu className="service-list-dropdown">
            {stateTabs}
          </DropdownMenu>
        </Dropdown>
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
  return bindActionCreators({...ZmqActions,...EonActions,...UiActions}, dispatch);
}

const mapStateToProps = (state) => {
  let messageCount = 0;
  let depth = 1;
  let paused = false;
  let type = state.eonDetail.activeTab;

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
    serviceIds: getSortedServiceIds(),
    services,
    messageCount,
    depth,
    paused,
    type
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(debugOnlyWastedRenderDetector(StateListToolbar));