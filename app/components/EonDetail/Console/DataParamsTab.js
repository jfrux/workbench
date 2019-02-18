import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EonActions from '../../../actions/eon_detail_actions';
import LoadingOverlay from '../../LoadingOverlay';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const propTypes = {
  dataParamKeys: PropTypes.array,
  dataParams: PropTypes.object,
  loading: PropTypes.bool
};

class DataParamsTab extends React.Component {
  componentDidMount() {
    this.props.FETCH_DATA_PARAMS();
  }
  render() {
    const { dataParams, dataParamKeys, loading } = this.props;
    console.log(this.props);
    if (loading) return (<LoadingOverlay message={"Loading Params..."} />);
    const dataParamFields = dataParamKeys.map((dataKey) => {
      const dataParam = dataParams[dataKey];

      return (
        <FormGroup row key={dataKey}>
          <Label for={dataKey} sm={3}>{dataParam.label}</Label>
          <Col sm={9}>
            <Input type={"textarea"} name={dataKey} id={dataKey} defaultValue={dataParam.value} disabled />
          </Col>
        </FormGroup>
      );
    })
    return (
      <Form>
        {dataParamFields}
      </Form>
    );
  }
}

DataParamsTab.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

const mapStateToProps = ({ eonDetail }) => {
  const { dataParams, dataParamsLoading } = eonDetail;
  let dataParamKeys;

  if (!dataParams) return {};
  dataParamKeys = Object.keys(dataParams).sort();
  return {
    dataParams,
    dataParamKeys,
    loading: dataParamsLoading 
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataParamsTab);