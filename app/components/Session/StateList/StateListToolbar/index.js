import React, { Component } from 'react';
import { Nav } from 'reactstrap';
import StateMessages from './StateMessages';
import StateDepthDropdown from './StateDepthDropdown';
import StateTypeDropdown from './StateTypeDropdown';
const propTypes = {};

class StateListToolbar extends Component {
  render() {
    return (
      <Nav className="events-toolbar">
        <StateDepthDropdown />
        <StateTypeDropdown />
        <StateMessages />
      </Nav>
    )
  }
}
// <NavItem>
//   <NavLink href="#" onClick={this.togglePause}>
//     {paused && <FontAwesomeIcon icon={"play"} />}
//     {!paused && <FontAwesomeIcon icon={"pause"} />}
//   </NavLink>
// </NavItem>
StateListToolbar.propTypes = propTypes;

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({}, dispatch);
// }

const mapStateToProps = (state, props) => {
  return {};
};

export default StateListToolbar;
