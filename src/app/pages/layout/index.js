import React, { Component, createElement, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from '@dx-groups/arthur/redux';
import { connect } from '@dx-groups/arthur';
import { Route, Redirect } from '@dx-groups/arthur/router';
import { push, goBack } from '@dx-groups/arthur/routerRedux';
import { Layout, Icon, Spin, Dropdown, Menu } from 'antd';
import Loadable from 'react-loadable';
import * as urls from 'Global/urls';

import Module from 'Global/module';
import { arr2obj } from 'Utils/array';

import Ellipsis from 'Components/Ellipsis';
import Breadcrumb from './Breadcrumb';
import Sider from './Sider';
import Authorized from '../../Authorized';
import styles from './index.less';

const { Content, Header } = Layout;

@connect(
  'common',
  ({ showSpin, spinTip, userInfo }) => ({ showSpin, spinTip, userInfo }),
  dispatch => ({
    dispatch,
    routeActions: bindActionCreators(
      {
        push,
        goBack,
        // showLogin,
      },
      dispatch
    ),
  })
)
export default class MainLayout extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    routes: [],
  };

  constructor(props) {
    super(props);

    const routesObject = arr2obj(props.routes, 'path');
    this.state = {
      // collapsed: false,
      routesObject,
    };
  }

  componentDidMount() {
    // to init something for whole project
  }

  _logout = () => {
    const { dispatch } = this.props;
    dispatch(Module.actions.userLogout());
  };

  _onHeaderMenuClick = ({ key }) => {
    if (key === 'logout') {
      this._logout();
    } else if (key === 'modifyPassword') {
      // this._modifyPassword()
    }
  };

  render() {
    const { showSpin, spinTip, routeActions, userInfo, routes } = this.props;
    const { routesObject } = this.state;

    return (
      <Layout className={styles.layout}>
        <Sider />
        <Layout>
          <Header className={styles.header}>
            {/* <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} /> */}
            <div className={styles.detail}>
              <Dropdown
                overlay={
                  <Menu
                    // selectedKeys={[]}
                    onClick={this._onHeaderMenuClick}
                  >
                    <Menu.Item key="modifyPassword">
                      <Icon type="user" />
                      修改密码
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="logout">
                      <Icon type="logout" />
                      退出登录
                    </Menu.Item>
                  </Menu>
                }
              >
                <span className={styles.dropdown}>
                  <Icon type="user" style={{ fontSize: 30 }} />
                  <Ellipsis length={100} tooltip>
                    {userInfo && userInfo.username}
                  </Ellipsis>
                </span>
              </Dropdown>
            </div>
          </Header>

          <Content className={styles.content}>
            {routes.map(_route => (
              <Authorized
                key={_route.path}
                noMatch={<Route render={() => <Redirect to={{ pathname: urls.LOGIN }} />} />}
              >
                <Route
                  exact
                  path={_route.path}
                  render={props => (
                    <Fragment>
                      <Breadcrumb match={props.match} routesObject={routesObject} />
                      <Spin spinning={showSpin} delay={500} tip={spinTip}>
                        {createElement(
                          _route.component ||
                            Loadable({
                              loader: _route.loader,
                              loading() {
                                return <Spin size="large" className="global-spin" />;
                              },
                            }),
                          {
                            routeActions,
                            userInfo,
                          }
                        )}
                      </Spin>
                    </Fragment>
                  )}
                />
              </Authorized>
            ))}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
