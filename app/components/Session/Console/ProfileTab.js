import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EonActions from '../../../actions/eon_detail_actions';
import LoadingOverlay from '../../LoadingOverlay';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const propTypes = {
  profileKeys: PropTypes.array,
  profile: PropTypes.object,
  loading: PropTypes.bool
};

class DataParamsTab extends React.Component {
  componentDidMount() {
    this.props.FETCH_PROFILE();
  }
  render() {
    const { profile, profileKeys, loading } = this.props;
    // console.log(this.props);
    if (loading) return (<LoadingOverlay message={"Loading Profile..."} />);
    const profileFields = profileKeys.map((profileKey) => {
      const profileValue = profile[profileKey];

      return (
        <FormGroup row key={profileKey}>
          <Label for={profileKey} sm={3}>{profileKey}</Label>
          <Col sm={9}>
            <Input type={"text"} name={profileKey} id={profileKey} defaultValue={profileValue} disabled />
          </Col>
        </FormGroup>
      );
    })
    return (
      <Form>
        {profileFields}
      </Form>
    );
  }
}

DataParamsTab.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EonActions, dispatch);
}

const mapStateToProps = ({ eonDetail }) => {
  const { profile, profileLoading } = eonDetail;
  let profileKeys;

  if (!profile) return { loading: true };
  profileKeys = Object.keys(profile).sort();
  return {
    profile,
    profileKeys,
    loading: profileLoading
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataParamsTab);