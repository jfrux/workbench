import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const app = require('electron').remote.app
import { Redirect } from 'react-router';
import routes from '../../constants/routes.json';
import styles from './Styles.scss';
import PropTypes from 'prop-types';
import vehicleConnectionStatuses from '../../constants/vehicle_connection_statuses.json';
import Layout from '../Layout';
import LoadingIndicator from '../LoadingIndicator';
// import ConnectedTime from './ConnectedTime';
import { LineChart, PieChart } from 'react-chartkick'
import Battery from './Widgets/Battery';
import commands from '../../constants/commands.json';
import StateList from './StateList';
import TaskDialog from '../TaskDialog';
import { Row, Col, Card, CardBody, CardText, CardTitle, CardSubtitle } from 'reactstrap';
// import io from 'socket.io-client';
const propTypes = {
  install: PropTypes.func,
  eon: PropTypes.object,
  pid: PropTypes.string,
  fetchingPid: PropTypes.bool,
  sshConnectionError: PropTypes.object,
  sshConnectionStatus: PropTypes.string,
  tmuxError: PropTypes.string,
  tmuxAttached: PropTypes.bool,
  tmuxLog: PropTypes.array,
  tmuxStartedAt: PropTypes.any,
  vehicleStarted: PropTypes.string,
  vehicleStartedAt: PropTypes.string,
  vehicleConnection: PropTypes.string,
  healthState: PropTypes.object,
  thermalState: PropTypes.object,
  serviceState: PropTypes.object,
  gpsState: PropTypes.object,
  network: PropTypes.string
};

class EonDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processesAndThermalsHeight: 0
    }
  }
  componentDidMount() {
    console.log("eon:",this.props.eon);
    // if (this.props.eon && this.props.pipeState) {
    //   this.props.pipeState();
    // }
    if (this.props.eon && this.props.install) {
      this.props.install();
    }
    // if (this.props.eon) {
    //   const { eon } = this.props;
    //   const socketIoPath = `http://${eon.ip}:4000`;
    //   console.warn("Attempting to connect to: " + socketIoPath);
    //   const socket = io(socketIoPath);
    //   socket.on('connect', function(){
    //     console.log("Connected to EON Socket");
    //   });
    //   socket.on('event', function(data){
    //     console.log("Event:",data);
    //   });
    //   socket.on('disconnect', function(){
    //     console.log("Disconnected from EON");
    //   });
    // }
    
    // this.tmuxTimeout = setTimeout(() => {
    //   if (!this.props.tmuxAttached) {
    //     console.warn("Could not connect to tmux...");
    //     this.props.history.push(routes.EON_LIST);
    //   }
    // }, 3000);
  }
  componentWillUnmount() {
    // this.props.closeTmux();
  }

  // handleInstall = () => {
  //   // console.warn(this);
  //   this.props.install();
  // }
  
  render() {
    const { network, tmuxStartedAt, thermalState, serviceState, eon, selectedEon, healthState, sshConnectionError, sshConnectionStatus, gpsState, vehicleConnection, tmuxAttached } = this.props;
    const vehicleConnectionInfo = vehicleConnectionStatuses[vehicleConnection];
    if (network === 'disconnected' || eon == null) {
      console.warn("SSH CONNECTION ERROR!",sshConnectionError);
      return (<Redirect to={routes.EON_LIST} />)
    }
    console.log(eon);
    // if (!tmuxAttached) {
    //   return <LoadingIndicator className={styles.loading_overlay} />;
    // }
    
    return (
      <Layout hideLogo={true}>
        <div className={styles.container + " container-fluid"}>
          {eon && 
            <Row>
              <Col>
                <div className={styles.eon_bar}>
                  <h3 className={styles.title + " no-select"}>
                    Connected to EON
                  </h3>
                  <h5 className={styles.subtext + " no-select"}>
                    {this.props.eon.ip}
                  </h5>
                  <div className={styles.subsubtext + " no-select"}>
                    {this.props.eon.mac}
                  </div>
                  {vehicleConnectionInfo &&
                    <div className={styles.connection}>
                      <span className={styles.connection_message}>{vehicleConnectionInfo.label}</span>
                    </div>
                  }
                  {!vehicleConnectionInfo && !(thermalState.usbOnline === "true") && 
                    <div className={styles.connection}>
                      <span className={styles.connection_message}>Vehicle not connected.</span>
                    </div>
                  }
                  {thermalState.usbOnline === "true" && 
                    <div className={styles.connection_connected}>
                      <span className={styles.connection_message}>Vehicle Connected</span>
                    </div>
                  }
                  <Link className={styles.disconnect_button + " btn btn-outline-danger"} to={routes.EON_LIST}>
                    Disconnect
                  </Link>
                </div>
              </Col>
            </Row>
          }
          
          <Card>
            <CardBody>
              <CardTitle>Thermal</CardTitle>
              <CardSubtitle></CardSubtitle>
              <CardText>
                <StateList items={thermalState} />
              </CardText>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CardTitle>Health</CardTitle>
              <CardSubtitle></CardSubtitle>
              <CardText>
                <StateList items={healthState} />
              </CardText>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CardTitle>GPS</CardTitle>
              <CardSubtitle></CardSubtitle>
              <CardText>
                <StateList items={gpsState} />
              </CardText>
            </CardBody>
          </Card>
        </div>
      </Layout>
    );
  }
}

EonDetail.propTypes = propTypes;

export default EonDetail;