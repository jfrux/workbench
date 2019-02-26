import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EonActions from '../../../actions/eon_detail_actions';
import LoadingOverlay from '../../LoadingOverlay';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Media } from 'reactstrap';
const propTypes = {
  // routeKeys: PropTypes.array,
  routes: PropTypes.array,
  loading: PropTypes.bool
};

class RoutesTab extends React.Component {
  componentDidMount() {
    this.props.FETCH_ROUTES();
  }
  render() {
    const { routes, loading } = this.props;
    // console.log(this.props);
    if (loading) return (<LoadingOverlay message={"Loading Routes..."} />);
    const routesFields = routes.map((route) => {
      return (
        <div className="route" key={route.id}>
          <div className="route-thumbnail">
            <img object src="https://via.placeholder.com/64" alt="Generic placeholder image" />
          </div>
          <div className="route-title">
            <span>{route.label}</span>
          </div>
          <div className="route-links">
            <ul>
              <li><a href="#">Cabana</a></li>
              <li><a href="#">Explorer</a></li>
              <li><a href="#">Download</a></li>
            </ul>
          </div>
        </div>
      );
    });
    return (
      <div>
        {routesFields}
      </div>
    );
  }
}

RoutesTab.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

const mapStateToProps = ({ eonDetail }) => {
  const { routes, routesLoading } = eonDetail;
  // let routeKeys;

  if (!routes || !routes.length) return { loading: true };
  // routeKeys = Object.keys(routes).sort();
  return {
    routes,
    // routeKeys,
    loading: routesLoading
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutesTab);