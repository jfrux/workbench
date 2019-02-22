import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavItem, NavLink } from 'reactstrap';
import { getMessageCountState } from '../../../../selectors/selectors';
const propTypes = {
  messageCount: PropTypes.number
};

class StateMessages extends Component {
  render() {
    const { messageCount } = this.props;
    return (
    <NavItem>
      <NavLink disabled href="#">Messages: {messageCount}</NavLink>
    </NavItem>
    )
  }
}

StateMessages.propTypes = propTypes;


const mapStateToProps = (state) => {
  return {
    messageCount: getMessageCountState(state)
  };
};

export default connect(
  mapStateToProps
)(StateMessages);