/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ConnectEonPage from './containers/ConnectEonPage';
import OpenpilotPage from './containers/OpenpilotPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.OPENPILOT} component={OpenpilotPage} />
      <Route path={routes.CONNECT_EON} component={ConnectEonPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
