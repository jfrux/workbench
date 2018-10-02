import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const app = require('electron').remote.app;
import Textarea from 'react-textarea-autosize';
import { Redirect } from 'react-router';
import routes from '../../constants/routes.json';
import styles from './Styles.scss';
import PropTypes from 'prop-types';
import vehicleConnectionStatuses from '../../constants/vehicle_connection_statuses.json';
import Layout from '../Layout';
import LoadingIndicator from '../LoadingIndicator';
// import ConnectedTime from './ConnectedTime';
import { LineChart, PieChart } from 'react-chartkick';
import Battery from './Widgets/Battery';
import commands from '../../constants/commands.json';
import StateList from './StateList';
import LoadingOverlay from '../LoadingOverlay';
import TaskDialog from '../TaskDialog';
import { Row, CardHeader, Col, Card, CardBody, CardText, CardTitle, CardSubtitle, ListGroup, ListGroupItem } from 'reactstrap';
// import io from 'socket.io-client';
const propTypes = {
  install: PropTypes.func,
  eon: PropTypes.object,
  sshConnectionError: PropTypes.object,
  sshConnectionStatus: PropTypes.string,
  vehicleStarted: PropTypes.string,
  vehicleStartedAt: PropTypes.string,
  vehicleConnection: PropTypes.string,
  healthState: PropTypes.object,
  thermal: PropTypes.object,
  gpsLocation: PropTypes.object,
  network: PropTypes.string,
  tmuxError: PropTypes.any,
  sshStatus: PropTypes.any,
  fingerprint: PropTypes.any,
  currentStateKeys: PropTypes.array,
  fingerprintString: PropTypes.string
};

class EonDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processesAndThermalsHeight: 0
    };
  }
  createTimeout = () => {
    this.pollTimeout = setTimeout(() => {
      this.props.fetchEonState(this.props.eon);
    },2000);
  }
  componentDidMount() {
    const { eon, install } = this.props;
    // console.log("eon:",this.props.eon);
    // if (this.props.eon && this.props.pipeState) {
    //   this.props.pipeState();
    // }
    if (eon && this.props.install) {
      this.props.install(eon);

      this.createTimeout();
    }
    // if (eon) {
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
    this.props.STOP_POLLING();
    // this.props.uninstall();
  }

  // handleInstall = () => {
  //   // console.warn(this);
  //   this.props.install();
  // }
  
  render() {
    const { network, fingerprint, tmuxError, fingerprintString, currentStateKeys, tmuxStartedAt, thermal, serviceState, eon, selectedEon, healthState, sshConnectionError, sshStatus, sshConnectionStatus, gpsState, vehicleConnection, tmuxAttached } = this.props;
    const vehicleConnectionInfo = vehicleConnectionStatuses[vehicleConnection];
    // const { usbOnline } = thermal;
    console.warn("sshConnectionError:",sshConnectionError);
    if (network === 'disconnected' || eon == null) {
      return (<Redirect to={routes.EON_LIST} />);
    }
    if (fingerprint) {
      currentStateKeys.push('fingerprint');
    }
    // if (!tmuxAttached) {
    //   return <LoadingIndicator className={styles.loading_overlay} />;
    // }
    let stateBlocks;
    if (!currentStateKeys.length) {
      stateBlocks = <LoadingOverlay />;
    } else {
      stateBlocks = currentStateKeys.map((key) => {
        const items = this.props[key];
        return (<Card key={key} className={styles.state_card}>
          <CardBody className={styles.state_card_body}>
            <CardHeader className={styles.state_card_header}>{key}</CardHeader>
            <StateList items={items} />
          </CardBody>
        </Card>);
      });
    }
    
    return (
      <Layout title={this.props.eon.ip} hideLogo={true}>
        {fingerprintString && 
          <Card className={styles.state_card}>
            <CardBody className={styles.state_card_body}>
              <CardHeader className={styles.state_card_header}>Fingerprint</CardHeader>
              <Textarea autoFocus className={styles.fingerprint_input + " form-control text-light"} rows="4" defaultValue={fingerprintString} />
            </CardBody>
          </Card>
          }
        {stateBlocks}
      </Layout>
    );
  }
}

EonDetail.propTypes = propTypes;

export default EonDetail;