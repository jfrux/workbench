import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StateList from './index';

const propTypes = {
  items: PropTypes.array
};

class ThermalStateList extends StateList {

}

ThermalStateList.propTypes = propTypes;

function mapStateToProps(state) {
  const { thermal } = state;
  
  return {
    ...thermal,
    items: Object.keys(thermal)
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(EonActions, dispatch);
// }

export default connect(
  mapStateToProps
)(ThermalStateList);