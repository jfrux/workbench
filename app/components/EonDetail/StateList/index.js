import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoadingIndicator from '../../LoadingIndicator';
import StateListGroup from './StateListGroup';
import styles from '../Styles.scss';
import stateInfo from '../../../constants/state_details.json';
import { Row, CardHeader,TabContent, Nav, NavItem, NavLink, TabPane, Col, Card, CardBody, CardText, CardTitle, CardSubtitle, ListGroup, ListGroupItem } from 'reactstrap';
import { get } from 'dot-prop-immutable';
const propTypes = {
  type: PropTypes.string,
  items: PropTypes.array
};
class StateList extends Component {
  components = {
    StateListGroup
  }
  render() {
    let { rootKeys, items, rootKeyToComponent } = this.props;

    rootKeys = rootKeys.sort();
    let rootBlocks = rootKeys.map((key) => {
      // console.warn("rootKey:",key);
      const rootData = this.props[key];
      const rootComponentKey = rootKeyToComponent[key];
      // console.warn("rootComponentKey",rootComponentKey)
      const StateListGroupTag = this.components[rootComponentKey];
      // let stateDetails, stateImg, stateIcon, stateStatus;
      // // console.log(this.props[key]);
      return (<StateListGroupTag key={key} rootKey={key} data={rootData} />);
    });
    return (<ListGroup className={"state-card-list-group"}>{rootBlocks}</ListGroup>);
  }
}

function mapStateToProps(state,ownProps) {
  const { items, type } = ownProps;
  let props = {
    rootKeys: [],
    rootKeyToComponent: {}
  };
  // console.log("items",items);
  items.forEach((rootItem) => {
    // console.log(rootItem);
    const rootItemKey = rootItem[0];
    const rootItemChildren = rootItem[1];
    const rootItemComponent = rootItem[2];
    // console.warn("rootComponent:",rootItemComponent);
    props.rootKeys.push(rootItemKey);
    // console.log("rootItemKey",rootItemKey);
    props[rootItemKey] = {
      keys: [],
      childKeyToComponent: {}
    };
    props.rootKeyToComponent[rootItemKey] = rootItemComponent;
    // console.log("rootItemChildren",rootItemChildren);
    rootItemChildren.forEach((itemChild) => {
      const itemChildKey = itemChild[0];
      props[rootItemKey]['keys'].push(itemChildKey);
      const itemChildStatePath = itemChild[1].join(".");
      const itemChildComponent = itemChild[2];
      const itemChildState = get(state,itemChildStatePath, null);
      // console.log("itemChildKey",itemChildKey);
      // if (typeof itemChildState === 'Array') {
      //   itemChildState.forEach((itemChildStateItem) => {

      //   })
      // }
      props[rootItemKey].childKeyToComponent[itemChildKey] = itemChildComponent;
      props[rootItemKey][itemChildKey] = itemChildState;
      // console.log("itemChild",itemChild);
      // console.log("itemChildStatePath",itemChildStatePath);
      // console.log("itemChildState",itemChildState);
    }); 
  });
  return props;
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(EonActions, dispatch);
// }

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(StateList);