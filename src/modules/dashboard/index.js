import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from '@dx-groups/arthur/routerDom';
import * as urls from 'Global/urls';

import Analysis from './analysis';
import Monitor from './monitor';

export default class Dashboard extends PureComponent {
  render() {
    return (
      <Switch>
        <Redirect exact from={urls.DASHBOARD} to={urls.DASHBOARD_ANALYSIS} />
        <Route exact path={urls.DASHBOARD_ANALYSIS} component={Analysis} />
        <Route exact path={urls.DASHBOARD_MONITOR} component={Monitor} />
      </Switch>
    );
  }
}
