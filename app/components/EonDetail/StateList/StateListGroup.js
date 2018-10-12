import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../LoadingIndicator';
import classnames from 'classnames';
import stateInfo from '../../../constants/state_details.json';
import StateListItem from './StateListItem';
import Temperature from './StateListItem/Temperature';
import { Row, CardHeader,TabContent, Nav, NavItem, NavLink, TabPane, Col, Card, CardBody, CardText, CardTitle, CardSubtitle, ListGroup, ListGroupItem } from 'reactstrap';
const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};
class StateListGroup extends Component {
  components = {
    StateListItem
  }
  render() {
    const { rootKey, data } = this.props;
    let childKeys = data.keys;
    if (!childKeys) {
      return (<Card className={"state-card"}>
      <CardBody className={"state-card-body"}>
        <CardHeader className={"state-card-header"}>{rootKey}</CardHeader>
        Loading {rootKey}...
      </CardBody>
    </Card>);
    }
    const childElems = childKeys.map((childKey) => {
      const childValue = data[childKey];
      const childComponent = data.childKeyToComponent[childKey];
      // console.log(childValue,childComponent);
      const StateListTag = this.components[childComponent];
      if (!Array.isArray(childValue)) {
        return (<StateListTag key={rootKey + "-" + childKey} label={childKey} value={childValue} />);
      } else {
        return (<StateListTag key={rootKey + "-" + childKey} label={childKey} value={"Advanced Object"} />)
      }
    });
    return (<Card className={"state-card"}>
        <CardBody className={"state-card-body"}>
          <CardHeader className={"state-card-header"}>{rootKey}</CardHeader>
          {childElems}
        </CardBody>
      </Card>);
  }
}

export default StateListGroup;