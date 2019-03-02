import { createSelector } from 'reselect'

const getItems = (state, ownProps) => {
  const { items, type } = ownProps;
  let props = {
    rootKeys: [],
    rootKeyToComponent: {}
  };
  items.forEach((rootItem) => {
    try {
      // console.warn("rootItem:",rootItem);


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
