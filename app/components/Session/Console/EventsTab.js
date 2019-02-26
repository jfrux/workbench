import React from 'react';
import StateList from '../StateList';
import StateListToolbar from '../StateList/StateListToolbar';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EonActions from '../../../actions/eon_detail_actions';

const propTypes = {

}
class EventsTab extends React.Component {
  render() {
    return (
      <div>
        <StateListToolbar />
        <StateList />
      </div>
    );
  }
}

EventsTab.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsTab);