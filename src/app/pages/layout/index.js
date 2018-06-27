import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from '@dx-groups/arthur/redux';
import { connect } from '@dx-groups/arthur';
import { Route } from '@dx-groups/arthur/router';
import { push, goBack } from '@dx-groups/arthur/routerRedux';
import { Layout, Icon, Spin, Dropdown, Menu } from 'antd';

import Module from 'Global/module';
import { arr2obj } from 'Utils/array';

import Ellipsis from 'Components/Ellipsis';
import Breadcrumb from './Breadcrumb';
import Sider from './Sider';
import styles from './index.less';

const { Content, Header } = Layout;

class MainLayout extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object),
    route: PropTypes.object,
  };

  static defaultProps = {
    routes: [],
    route: {},
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
    const { children, showSpin, routeActions, userInfo, route } = this.props;
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

          <Route
            render={props => <Breadcrumb {...props} route={route} routesObject={routesObject} />}
          />

          <Content className={styles.content}>
            {createElement(children, {
              routeActions,
              userInfo,
            })}
          </Content>
        </Layout>
        {showSpin && showSpin.bool ? (
          <div className={styles.cover}>
            <Spin tip={showSpin.content} style={{ marginTop: 160 }} />
          </div>
        ) : null}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  showSpin: state.showSpin,
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  routeActions: bindActionCreators(
    {
      push,
      goBack,
      // showLogin,
    },
    dispatch
  ),
});

export default connect(
  'common',
  mapStateToProps,
  mapDispatchToProps
)(MainLayout);
