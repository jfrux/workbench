import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EonActions from '../../../actions/eon_detail_actions';
import LoadingOverlay from '../../LoadingOverlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Media } from 'reactstrap';
const propTypes = {
  open: PropTypes.bool,
  loading: PropTypes.bool,
  route: PropTypes.object,
  className: PropTypes.string
};

class RouteModal extends React.Component {
  // constructor(props) {
  //   super(props);
    
  //   this.state = {
  //     modal: false
  //   };

  //   this.toggle = this.toggle.bind(this);
  // }

  // toggle() {
  //   this.setState(prevState => ({
  //     modal: !prevState.modal
  //   }));
  // }
  close = () => {
    this.props.HIDE_ROUTE();
  }
  render() {
    const { open, loading, route, className } = this.props;
    let modalHeader = "Opening...";
    let modalBody = <div></div>;
    let segmentsList;
    console.log(route);
    if (route && route.label) {
      modalHeader = route.label;
    }
    if (route && route.segments && route.fileLinks) {
      segmentsList = route.segments.map((segment,index) => {
        return (
          <div className="segment" key={`${route.id}_${segment.number}`}>
            <div className="segment-thumb"><img src={segment.thumbnail_url} /></div>
            <div className="segment-label">{segment.label}</div>
            <div className="segment-actions">
              <a className="btn btn-secondary" href={route.fileLinks.cameras[segment.number]}>Road</a>
              <a className="btn btn-secondary" href={route.fileLinks.dcameras[segment.number]}>Cabin</a>
              <a className="btn btn-secondary" href={route.fileLinks.logs[segment.number]}>Logs</a>
            </div>
          </div>
        )
      });
    }

    return (<div className={"command-box drive-modal"}>
      <h3>{modalHeader}</h3>
      <Button onClick={(evt) => { this.close(); }} className={"command-close"}><FontAwesomeIcon icon="times"></FontAwesomeIcon></Button>
      <div className={"command-body"}>
        {segmentsList}
      </div>
      <ButtonGroup className={"command-button-bar"}>
        <Button onClick={(evt) => { this.close(); }}>Close</Button>
      </ButtonGroup>
    </div>);
  }
}

RouteModal.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

const mapStateToProps = ({ eonDetail }) => {
  const { activeRouteId, activeRouteLoading, activeRouteError, routes } = eonDetail;
  return {
    route: activeRouteId ? routes[activeRouteId] : null,
    loading: activeRouteLoading,
    error: activeRouteError,
    open: (activeRouteId && activeRouteId.length > 0)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteModal);