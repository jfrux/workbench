import React, { Component } from 'react';
const app = require('electron').remote.app;
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import moment from 'moment';
import * as commaEndpoints from '../../constants/comma_endpoints.json';
import * as EonActions from '../../actions/eon_detail_actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const propTypes = {
  activeDrive: PropTypes.number,
  driveData: PropTypes.object,
  driveVideoUrl: PropTypes.string
};

class DriveViewer extends Component {
  close = () => {
    this.props.CLOSE_DRIVE();
  }

  render() {
    const { activeDrive, driveData, driveVideoUrl } = this.props;
    console.warn("Drive:",driveData);
    console.warn("Drive Video:", driveVideoUrl);
    if (driveData) {
      const start_time = moment(driveData.start_time);
      return (
        <div>
          <Modal isOpen={activeDrive !== null} toggle={this.close} className={"drive-viewer"}>
            <ModalHeader toggle={this.close}>{driveData.start_geocode} to {driveData.end_geocode} on {driveData.start_time}</ModalHeader>
            <ModalBody>
              {activeDrive && driveVideoUrl &&
                <ReactPlayer 
                  url={driveVideoUrl} 
                  width='100%'
                  height='100%'
                  controls 
                  playsinline 
                  loop 
                  playing />
              }
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }
};

function mapStateToProps(state) {
  const { eonDetail } = state;
  const { activeDrive } = eonDetail;
  let activeDriveData;
  let driveVideoUrl;
  if (activeDrive) {
    activeDriveData = state.eonDetail.routes[activeDrive];
    driveVideoUrl = `${commaEndpoints.Video.Base}${commaEndpoints.Video.Endpoint.hls.replace(':segment_string',activeDriveData.sig_path)}`;
  }

  
  return {
    driveData: activeDriveData,
    activeDrive,
    driveVideoUrl
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriveViewer);