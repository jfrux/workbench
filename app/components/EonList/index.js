// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import routes from '../../constants/routes.json';
import Layout from '../Layout';
import classnames from 'classnames';
import NoConnection from './NoConnection';
import EonListItem from './EonListItem';
import LoadingIndicator from '../LoadingIndicator';
import { ListGroup, UncontrolledTooltip, Collapse, Card, CardBody, NavItem, NavLink, Form, Button, FormGroup, Input} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  foundCount: PropTypes.number,
  addingEon: PropTypes.bool,
  error: PropTypes.string,
  scanNetwork: PropTypes.func,
  scanResults: PropTypes.object,
  scanError: PropTypes.string,
  scanning: PropTypes.bool,
  status: PropTypes.string,
  selectedEon: PropTypes.any,
  network: PropTypes.string,
  networkIp: PropTypes.string,
  progress: PropTypes.any,
  progressPercString: PropTypes.string,
  eonIds: PropTypes.array,
  unresolvedEonIds: PropTypes.array
};

function ValidateIPaddress(ipaddress) 
{
 if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
  {
    return (true);
  }
  return (false);
}

class EonList extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      manualError: '',
      showAddForm: false,
      scanningStarted: false
    };
  }
  componentDidMount() {
    this.props.APP_READY();
    this.props.resetScanNetwork();
  }
  handleScanNetwork = () => {
    this.setState({showAddForm: false});
    this.props.BEGIN_scanNetwork();
  }
  toggleAddForm = () => {
    this.setState({showAddForm: !this.state.showAddForm});
  }
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }
  addEon = (eon) => {
    this.props.ADD_EON(eon);
  }
  handleSubmit = (event) => {
    const { value } = this.state;
    if (ValidateIPaddress(value)) {
      this.setState({
        manualError: ''
      });
      // this.props.ADDED_EON({
      //   ip: value
      // });
      this.addEon({
        ip: value,
        mac: null
      });
      this.setState({value: ''});
    } else {
      this.setState({manualError: "Invalid IP Address"});
    }
    event.preventDefault();
  }
  handleSelectEon = (index) => {
    this.props.selectEon(index);
    // this.props.history.push(routes.EON_DETAIL);
  }
  render() {
    const {
      sshConnectionError,
      sshConnectionStatus,
      scanResults,
      scanning,
      status,
      foundCount,
      addingEon,
      eonToAdd,
      error,
      network,
      eonIds,
      unresolvedEonIds,
      networkIp,
      selectedEon,
      progress
    } = this.props;
    const progressPercString = Math.round(progress*100) + "%";
    const { manualError, showAddForm } = this.state;
    // const scanResultsList = Object.keys(scanResults)
    const eonList = eonIds;
    // console.log("scanResults:",scanResults);
    // console.log("scanResultsList:",scanResultsList);
    // console.log("eons:",eons);
    // console.log("eonList:",eonList);
    // if (selectedEon !== null) {
    //   // console.warn("SSH CONNECTION ERROR!",sshConnectionError);
    //   return (<Redirect to={routes.EON_DETAIL} />); 
    // }
    if (network === 'disconnected') {
      return <NoConnection />;
    }

    const contextActions = [
      <NavItem key={1} className={"nav_item"}>
        <NavLink className={classnames({ nav_link: true, disabled: scanning })} onClick={this.toggleAddForm} id={"Add-Manually"}>
          {showAddForm && <FontAwesomeIcon icon="times" />}
          {!showAddForm && <FontAwesomeIcon icon="plus" />}
        </NavLink>
        <UncontrolledTooltip placement={'right'} target={"Add-Manually"}>
          Add EON Manually
        </UncontrolledTooltip>
      </NavItem>,
      <NavItem key={2} className={"nav_item"}>
        <NavLink className={classnames({ nav_link: true, disabled: scanning })} onClick={this.handleScanNetwork} id={"Tooltip-Refresh"}>
          <FontAwesomeIcon icon="sync" className={classnames({
            "fa-spin": scanning
          })} />
        </NavLink>
        <UncontrolledTooltip placement={'right'} target={"Tooltip-Refresh"}>
          Scan for EON
        </UncontrolledTooltip>
      </NavItem>
    ];
    return (
      <Layout title="Workbench" contextActions={contextActions}>
        <div className={"eon-list-top"}>
          <Collapse className={"add_form_area"} isOpen={!scanning && showAddForm}>
            <Form inline onSubmit={this.handleSubmit} className={"p-0 m-0"}>
              <FormGroup className={"col col-10 p-0 h-100"}>
                <Input placeholder="___.___.___.___" disabled={addingEon} className={"add_field d-block w-100"} value={this.state.value} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup className={"col col-2 p-0 h-100"}>
                <Button className={"add_ip_button"} type="submit" disabled={addingEon}>
                  {addingEon && <LoadingIndicator />}
                  {!addingEon && <FontAwesomeIcon icon="check" />}
                </Button>
              </FormGroup>
            </Form>
          </Collapse>

          <Collapse className={"message"} isOpen={scanning}>
            <Card body inverse color="primary" className={"scanning-message"}>
              <CardBody className={"scanning-message-body"}>
                Scanning for EON...
              </CardBody>
            </Card>
          </Collapse>
          
          <Collapse className={"message"} isOpen={error && error.length > 0}>
            <Card body inverse color="danger" className={"error_message"}>
              <CardBody className={"error_message_body"}>
                {error}
              </CardBody>
            </Card>
          </Collapse>
        </div>
        <div className={"eons-list"}>
          <ListGroup>
            {eonIds.map((id) => {
              return (<EonListItem id={id} type="resolved" key={id} action={() => { this.handleSelectEon(id);}} />);
            })}
          </ListGroup>
          <ListGroup>
            {unresolvedEonIds.map((id) => {
              return (<EonListItem id={id} type="unresolved" key={id} action={() => { this.handleSelectEon(id);}} />);
            })}
          </ListGroup>
        </div>
        {!eonList.length &&
          <p style={{padding:'15px'}}><strong>You haven't added any EON</strong><br />Start by scanning your network by clicking the refresh icon to the left.</p>
        }
      </Layout>
    );
  }
}

EonList.propTypes = propTypes;

export default EonList;