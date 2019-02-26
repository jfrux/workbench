import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ZmqActions from '../../../../actions/zmq_actions';
import * as UiActions from '../../../../actions/ui_actions';
import * as EonActions from '../../../../actions/eon_detail_actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getZmqServicesState, getZmqServicesIdsSortedState,  getActiveTabState} from '../../../../selectors/selectors';
const propTypes = {
  services: PropTypes.object,
  activeTab: PropTypes.object,
  serviceIds: PropTypes.array
};

class StateTypeDropdown extends Component {
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
    const { serviceIds, services, activeService } = this.props;
    const stateTabs = serviceIds.map((key) => {
      const service = services[key];
      return (
        <DropdownItem onClick={() => { this.setService(key); }} id={key + "-tab-link"} key={key + "-tab-link"}>{service.label}</DropdownItem>
      );
    });
    return (<Dropdown nav isOpen={this.state.servicelistOpen} toggle={this.toggleServiceList}>
      <DropdownToggle nav caret>
        {activeService}
        {!activeService && "Inactive"}
      </DropdownToggle>
      <DropdownMenu className="service-list-dropdown">
        {stateTabs}
      </DropdownMenu>
    </Dropdown>
    );
  }
}

StateTypeDropdown.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...ZmqActions,...EonActions,...UiActions}, dispatch);
}

const mapStateToProps = (state) => {
  return {
    serviceIds: getZmqServicesIdsSortedState(state),
    services: getZmqServicesState(state),
    activeService: getActiveTabState(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateTypeDropdown);
