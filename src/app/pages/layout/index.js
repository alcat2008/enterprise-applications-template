import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { push, goBack } from 'react-router-redux'
import { Layout, Icon, Spin, Dropdown, Menu } from 'antd'

import Module from 'Global/module'
import { arr2obj } from 'Utils/array'
import logo from 'Assets/images/logo.png'

import Ellipsis from 'Components/Ellipsis'
import Breadcrumb from './Breadcrumb'
import styles from './index.less'

const { Content, Sider, Header } = Layout

class MainLayout extends Component {
  static propTypes = {
    routes: PropTypes.array,
    route: PropTypes.object,
  }

  constructor(props) {
    super(props)

    const routesObject = arr2obj(this.props.routes, 'path')
    this.state = {
      collapsed: false,
      routesObject,
      selectedKeys: ['mams_home']
    }
  }

  componentDidMount() {
    // to init something for whole project
  }

  _logout = () => {
    this.props.dispatch(Module.actions.userLogout())
  }

  _onHeaderMenuClick = ({ key }) => {
    if (key === 'logout') {
      this._logout()
    } else if (key === 'modifyPassword') {
      // this._modifyPassword()
    }
  }

  render() {
    const { children, showSpin, routeActions, userInfo, route } = this.props
    const { collapsed, routesObject } = this.state

    return (
      <Layout className={styles.layout}>
        <Sider
          trigger={null}
          collapsed={true}
        >
          <Link className={styles.logo} to='/'>
            <img src={logo} alt='logo' />
          </Link>
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1'>
              <Icon type='user' />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key='2'>
              <Icon type='video-camera' />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key='3'>
              <Icon type='upload' />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Sider
          theme='light'
          breakpoint='lg'
          collapsed={collapsed}
          // onCollapse={collapsed => this.setState({ collapsed })}
          className={styles.subSider}
        >
          <h3 className={styles.subSider_title}>模块名称</h3>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            {/* <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} /> */}
            <div className={styles.detail}>
              <Dropdown
                overlay={
                  (
                    <Menu
                      selectedKeys={[]}
                      onClick={this._onHeaderMenuClick}
                    >
                      <Menu.Item key='modifyPassword'><Icon type='user' />修改密码</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key='logout'><Icon type='logout' />退出登录</Menu.Item>
                    </Menu>
                  )
                }
              >
                <span className={styles.dropdown}>
                  <Icon type='user' style={{ fontSize: 30 }} />
                  <Ellipsis length={100} tooltip>{userInfo && userInfo.userName}</Ellipsis>
                </span>
              </Dropdown>
            </div>
          </Header>

          <Route
            render={props => (
              <Breadcrumb
                {...props}
                route={route}
                routesObject={routesObject}
              />
            )}
          />

          <Content className={styles.content}>
            {
              createElement(children,
                {
                  routeActions,
                  userInfo,
                }
              )
            }
          </Content>
        </Layout>
        {
          showSpin && showSpin.bool ? (
            <div className={styles.cover}>
              <Spin
                tip={showSpin.content}
                style={{ marginTop: 160 }}
              />
            </div>
          ) : null
        }
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showSpin: state.common.showSpin,
    userInfo: state.common.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  routeActions: bindActionCreators({
    push,
    goBack,
    // showLogin,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)

