import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import stateListItemTypes from '../../StateListItem/Types';
import { dasherize } from 'inflection';
import { Row, CardHeader,TabContent, Nav, NavItem, NavLink, TabPane, Col, Card, CardBody, CardText, CardTitle, CardSubtitle, ListGroup, ListGroupItem } from 'reactstrap';
const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};
class StateListGroup extends Component {
  components = stateListItemTypes
  name = "default"
  getClassNames = () => {
    return classnames(["state-card",this.name,dasherize(this.props.rootKey.toLowerCase())]);
  }

  renderChild = (child) => {
    const StateListTag = this.components[child.component];
    return (<StateListTag key={child.rootKey + "-" + child.key} label={child.key} value={child.value} />);
  }

  renderChildren = () => {
    const { rootKey, data } = this.props;
    const childKeys = data.keys;
    return (<ListGroup>
      {childKeys.map((childKey) => {
        const childValue = data[childKey];
        const childComponent = data.childKeyToComponent[childKey];
        return this.renderChild({
          rootKey,
          key: childKey,
          value: childValue,
          component: childComponent
        });
      })}
    </ListGroup>);
  }
  render() {
    const { rootKey, data } = this.props;
    const childElems = this.renderChildren(this.props);
    
    return (
      <Card className={this.getClassNames()}>
        <CardBody className={"state-card-body"}>
          <CardHeader className={"state-card-header"}>{rootKey}</CardHeader>
         {childElems}
        </CardBody>
      </Card>
    );
  }
}

export default StateListGroup;