import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from '@dx-groups/arthur/routerDom';
import * as urls from 'Global/urls';

import Page from './page';
import Group from './group';

export default class Demo extends PureComponent {
  render() {
    return (
      <Switch>
        <Redirect exact from={urls.DEMO} to={urls.DEMO_PAGE} />
        <Route exact path={urls.DEMO_PAGE} component={Page} />
        <Route exact path={urls.DEMO_GROUP_REGEXP} component={Group} />
      </Switch>
    );
  }
}
