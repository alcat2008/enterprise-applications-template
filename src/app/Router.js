import React, { Component } from 'react';
import { connect } from '@dx-groups/arthur';
import { Route, Switch, Redirect } from '@dx-groups/arthur/routerDom';
import { ConnectedRouter } from '@dx-groups/arthur/routerRedux';
import { LocaleProvider } from 'antd';
import Loadable from 'react-loadable';
import { hot } from 'react-hot-loader';

import * as urls from 'Global/urls';
import { storage } from '@dx-groups/utils';
import { isEmpty } from '@dx-groups/utils/lang';
import routes from 'Global/routes';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Layout from './pages/layout';
import Login from './pages/login';

import NotFoundPage from './pages/notFoundPage';
import 'moment/locale/zh-cn';

class Router extends Component {
  verifyUser = (_match, _route, _routes) => {
    const userInfo = storage.get('userInfo');
    if (userInfo) {
      return (
        <Layout routes={_routes} route={_route}>
          {_route.component ||
            Loadable({
              loader: _route.loader,
              loading() {
                return <div>Loading...</div>;
              },
            })}
        </Layout>
      );
    }
    return <Redirect to={urls.LOGIN} />;
  };

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <ConnectedRouter history={this.props.history}>
          <Switch>
            {/* <Redirect exact from={urls.HOME} to={routes[0].path} /> */}
            <Route key="login" path={urls.LOGIN} component={Login} />
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact
                render={_match => this.verifyUser(_match, route, routes)}
              />
            ))}
            <Route key="404" path="/404" component={NotFoundPage} />
            {!isEmpty(routes) && <Redirect from="*" to="/404" />}
          </Switch>
        </ConnectedRouter>
      </LocaleProvider>
    );
  }
}

const mapStateToProps = ({ auths }) => ({ auths });

export default hot(module)(
  connect(
    'common',
    mapStateToProps
  )(Router)
);
