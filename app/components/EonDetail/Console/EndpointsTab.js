import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EonActions from '../../../actions/eon_detail_actions';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import path from 'path';
const propTypes = {
  endpoints: PropTypes.object,
  endpointKeys: PropTypes.array
};

class EndpointsTab extends React.Component {
  componentDidMount() {
    this.props.FETCH_DATA_PARAMS();
  }
  render() {
    const { endpoints, endpointKeys } = this.props;
    // console.log(this.props);
    if (!endpointKeys) return (<div></div>);
    
    const endpointFields = endpointKeys.map((endpointKey) => {
      const endpoint = endpoints[endpointKey];

      return (
        <FormGroup row key={endpointKey}>
          <Label for={endpointKey} sm={2}>{endpointKey}</Label>
          <Col sm={10}>
            <Input type={"textarea"} name={endpointKey} id={endpointKey} defaultValue={endpoint} disabled />
          </Col>
        </FormGroup>
      );
    })
    return (
      <Form>
        {endpointFields}
      </Form>
    );
  }
}

EndpointsTab.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

const mapStateToProps = (state) => {
  const { endpoints } = state.eonDetail;
  let endpointKeys, flatEndpoints = {};

  if (!endpoints) return {};
  return {
    endpoints,
    endpointKeys: Object.keys(endpoints).sort()
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EndpointsTab);