import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EonActions from '../../../actions/eon_detail_actions';
import LoadingOverlay from '../../LoadingOverlay';
import { Row, Col, Button,Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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

  render() {
    const { open, loading, route, className } = this.props;
    let modalHeader = "Opening...";
    let modalBody = <div></div>
    if (loading || !route) {
      modalHeader = "Retrieving drive info...";
      modalBody = <LoadingOverlay message={"Loading drives..."} />;
    } else {
      modalHeader = route.label;
      modalBody = <div>Loaded!</div>;
    }
    if (route && route.segments) {   
      const segmentsList = route.segments.forEach((segment) => {
        return (
          <div className="segment">
            <div className="segmentIndex">{segment.number}</div>
            <div className="sesgmentLabel">{segment.label}</div>
            <div className="sesgmentActions">
              <a href={segment.roadVideo}>Road Video</a>
              <a href={segment.cabinVideo}>Cabin Video</a>
              <a href={segment.logFile}>Logs</a>
            </div>
          </div>
        )   
      });
    }

    return (<Modal isOpen={open} className={className}>
      <ModalHeader>{modalHeader}</ModalHeader>
      <ModalBody>
        {modalBody}
      </ModalBody>
      <ModalFooter>
        <Button color="primary">Do Something</Button>{' '}
        <Button color="secondary">Cancel</Button>
      </ModalFooter>
    </Modal>
    )
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
    open: (activeRouteId && activeRouteId.length > 0) || activeRouteLoading
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteModal);