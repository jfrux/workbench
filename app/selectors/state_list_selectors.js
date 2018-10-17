import { createSelector } from 'reselect'
import { get } from 'dot-prop-immutable';

const getItems = (state, ownProps) => {
  const { items, type } = ownProps;
  let props = {
    rootKeys: [],
    rootKeyToComponent: {}
  };
  items.forEach((rootItem) => {
    try {
      // console.warn("rootItem:",rootItem);
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
          itemChildState = get(state,itemChildStatePath, null);
          props[rootItemKey].childKeyToComponent[itemChildKey] = itemChildComponent;
          props[rootItemKey][itemChildKey] = itemChildState;
          props[rootItemKey]['keys'].push(itemChildKey);
      });
    } catch (e) {
      console.warn(`Error mapping keys to props...`,e);
    }
  });

  return props;
};

//reselect
export const getItemsState = createSelector(
  [ getItems ],
  (items) => items
);