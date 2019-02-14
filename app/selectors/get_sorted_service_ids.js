import { createSelector } from 'reselect'
import services from '../constants/service_list.yaml';

const getSortedServiceIds = createSelector(
  [  ],
  (servicesList) => {
    return Object.keys(services).sort();
  }
)

export default getSortedServiceIds;