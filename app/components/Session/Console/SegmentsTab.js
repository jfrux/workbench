import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EonActions from '../../../actions/eon_detail_actions';
import RouteModal from './RouteModal';
import LoadingOverlay from '../../LoadingOverlay';
import moment from 'moment';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Media } from 'reactstrap';
const propTypes = {
  // routeKeys: PropTypes.array,
  segments: PropTypes.array,
  loading: PropTypes.bool
};

class SegmentsTab extends React.Component {
  componentDidMount() {
    const startTime = moment().subtract(14,'days');
    const endTime = moment();

    this.props.FETCH_SEGMENTS(startTime.valueOf(),endTime.valueOf());
  }
  handleRouteClick = (evt,route) => {
    this.props.SHOW_ROUTE(route.id);
  }
  render() {
    const { activeRouteId, routes, routesSorted, loading } = this.props;
    if (loading) return (<LoadingOverlay message={"Loading drives..."} />);
    const drives = routesSorted.map((routeKey) => {
      const drive = routes[routeKey];
      return (
        <div onClick={(evt) => { this.handleRouteClick(evt,drive)}} className="drive" key={drive.id}>
          <div className="drive-thumbnail">
            <img width="50" src={drive.thumbnail_url} />
          </div>
          <div className="drive-title">
            <span>{drive.label}</span>
            <span className={"meta"}>
              <span>{drive.git_repo}</span><span>{drive.git_branch}</span><span>{drive.version}</span>
            </span>
          </div>
          <div className="drive-download">
            <span>{drive.label}</span>
            <span className={"meta"}>
              <span>{drive.git_repo}</span><span>{drive.git_branch}</span><span>{drive.version}</span>
            </span>
          </div>
        </div>
      );
    });
    return (
      <div className="drives">
        <div className="drives-list">{drives}</div>
        {activeRouteId && <RouteModal />}
      </div>
    );
  }
}

SegmentsTab.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

const mapStateToProps = ({ eonDetail }) => {
  const { routes, activeRouteId, routesSorted, routesLoading } = eonDetail;
  // let routeKeys;

  if (!routesSorted || !routesSorted.length) return { loading: true };
  // routeKeys = Object.keys(routes).sort();
  return {
    routes,
    routesSorted,
    // routeKeys,
    activeRouteId,
    loading: routesLoading
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SegmentsTab);
