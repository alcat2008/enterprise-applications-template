// import React from 'react';
import React, { Component } from 'react';
import { Route, Switch, Redirect } from '@dx-groups/arthur/routerDom';
import { ConnectedRouter } from '@dx-groups/arthur/routerRedux';
import { LocaleProvider } from 'antd';
import { hot } from 'react-hot-loader';

import * as urls from 'Global/urls';
import routes from 'Global/routes';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Authorized from './Authorized';
import Layout from './pages/layout';
import Login from './pages/login';

import NotFoundPage from './pages/notFoundPage';
import 'moment/locale/zh-cn';

// export default function router({ history }) {
//   return (
//     <LocaleProvider locale={zhCN}>
//       <ConnectedRouter history={history}>
//         <Switch>
//           {/* <Redirect exact from={urls.HOME} to={routes[0].path} /> */}
//           <Route key="login" path={urls.LOGIN} component={Login} />
//           <Authorized
//             key={urls.HOME}
//             noMatch={<Route render={() => <Redirect to={{ pathname: urls.NOT_FOUND }} />} />}
//           >
//             <Route path={urls.HOME} render={props => <Layout {...props} routes={routes} />} />
//           </Authorized>
//           <Route key={urls.NOT_FOUND} path={urls.NOT_FOUND} component={NotFoundPage} />
//         </Switch>
//       </ConnectedRouter>
//     </LocaleProvider>
//   );
// }

class Router extends Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <ConnectedRouter history={this.props.history}>
          <Switch>
            {/* <Redirect exact from={urls.HOME} to={routes[0].path} /> */}
            <Route key="login" path={urls.LOGIN} component={Login} />
            <Authorized
              key={urls.HOME}
              noMatch={<Route render={() => <Redirect to={{ pathname: urls.NOT_FOUND }} />} />}
            >
              <Route path={urls.HOME} render={props => <Layout {...props} routes={routes} />} />
            </Authorized>
            <Route key={urls.NOT_FOUND} path={urls.NOT_FOUND} component={NotFoundPage} />
          </Switch>
        </ConnectedRouter>
      </LocaleProvider>
    );
  }
}

export default hot(module)(Router);
