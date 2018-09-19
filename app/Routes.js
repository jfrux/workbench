/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, IndexRoute, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import EonListPage from './containers/EonListPage';
import EonDetailPage from './containers/EonDetailPage';

export default () => (
  <App path="/" component={ App }>
    <Switch>
      <Route path={routes.EON_DETAIL} component={EonDetailPage} />
      <Route path={routes.EON_LIST} component={EonListPage} />
    </Switch>
  </App>
);
