import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JSONPretty from 'react-json-pretty';
import stateListGroupTypes from './StateListGroup/Types';
import { getItemsState } from '../../../selectors/state_list_selectors';
const propTypes = {
  type: PropTypes.string,
  items: PropTypes.array
};
class StateList extends Component {
  components = stateListGroupTypes
  render() {
    let { rootKeys, items, rootKeyToComponent } = this.props;
    // rootKeys = rootKeys.sort();
    
    // let rootBlocks = rootKeys.map((key) => {
    //   if (!key) {
    //     console.warn("Received an empty key...");
    //     return;
    //   }

    //   const rootData = this.props[key];
    //   const rootComponentKey = rootKeyToComponent[key];
      
    //   if (rootComponentKey) {
    //     const StateListGroupTag = this.components[rootComponentKey];
    //     return (<StateListGroupTag key={key} rootKey={key} data={rootData} />);
    //   } else {
    //     console.warn(`No component could be found for rootKey ${key}`)
    //     return (<StateListGroup key={key} rootKey={key} data={rootData} />);
    //   }
    // });
    return (<div><JSONPretty id="json-pretty" json={this.props.data}></JSONPretty></div>);
  }
}

function mapStateToProps(state,ownProps) {
  const itemsState = state.eonDetail[ownProps.type];
  return {
    data: itemsState
  };
}

export default connect(
  mapStateToProps
)(StateList);