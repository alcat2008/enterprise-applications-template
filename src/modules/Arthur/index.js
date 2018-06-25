import React, { Component } from 'react'
import { Route, Switch, Redirect } from '@dx-groups/arthur/routerDom'
import * as urls from 'Global/urls'

import Page from './page'
import Sub from './page/sub'

export default class Arthur extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from={urls.ARTHUR} to={urls.ARTHUR_PAGE} />
        <Route exact path={urls.ARTHUR_PAGE} component={Page} />
        <Route exact path={urls.ARTHUR_PAGE_SUB} component={Sub} />
      </Switch>
    )
  }
}
