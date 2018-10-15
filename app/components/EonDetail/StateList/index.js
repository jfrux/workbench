import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import stateListGroupTypes from './StateListGroup/Types';
import { get } from 'dot-prop-immutable';
const propTypes = {
  type: PropTypes.string,
  items: PropTypes.array
};
class StateList extends Component {
  components = stateListGroupTypes
  render() {
    let { rootKeys, items, rootKeyToComponent } = this.props;
    // rootKeys = rootKeys.sort();
    let rootBlocks = rootKeys.map((key) => {
      if (!key) {
        console.warn("Received an empty key...");
        return;
      }

      const rootData = this.props[key];
      const rootComponentKey = rootKeyToComponent[key];
      
      if (rootComponentKey) {
        const StateListGroupTag = this.components[rootComponentKey];
        return (<StateListGroupTag key={key} rootKey={key} data={rootData} />);
      } else {
        console.warn(`No component could be found for rootKey ${key}`)
        return (<StateListGroup key={key} rootKey={key} data={rootData} />);
      }
      
    });
    return (<div>{rootBlocks}</div>);
  }
}

function mapStateToProps(state,ownProps) {
  const { items, type } = ownProps;
  let props = {
    rootKeys: [],
    rootKeyToComponent: {}
  };
  items.forEach((rootItem) => {
    const rootItemKey = rootItem[0];
    const rootItemChildren = rootItem[1];
    const rootItemComponent = rootItem[2];
    props.rootKeys.push(rootItemKey);
    props[rootItemKey] = {
      keys: [],
      childKeyToComponent: {}
    };
    props.rootKeyToComponent[rootItemKey] = rootItemComponent;
    rootItemChildren.forEach((itemChild) => {
      let itemChildKey = itemChild[0];
      let itemChildStatePath = itemChild[1].join(".");
      let itemChildComponent = itemChild[2];
      let itemChildState;
      try {
        itemChildState = get(state,itemChildStatePath, null);
        props[rootItemKey].childKeyToComponent[itemChildKey] = itemChildComponent;
        props[rootItemKey][itemChildKey] = itemChildState;
        props[rootItemKey]['keys'].push(itemChildKey);
      
      } catch (e) {
        console.warn(`Could not find key ${itemChildStatePath}`);
      }
    }); 
  });
  return props;
}

export default connect(
  mapStateToProps
)(StateList);