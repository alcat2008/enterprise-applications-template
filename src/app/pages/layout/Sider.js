import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Icon, Menu } from 'antd'

import { isEmpty } from '@dx-groups/utils/lang'
import menus from 'Global/menus'
import { arr2obj } from 'Utils/array'
import logo from 'Assets/images/logo.png'
import styles from './index.less'

const { Sider } = Layout
const { Item, SubMenu } = Menu
const menusObject = arr2obj(menus, 'url')

export default class SiderLayout extends Component {
  state = {
    collapsed: false,
    moduleSelectedKeys: [menus[0].url],
    moduleSelectedName: menus[0].name,
    moduleMenus: menus[0].children,
    menuSelectedKeys: [location.pathname],
  }

  _handleModuleClick = ({ item, key, keyPath }) => {
    this.setState({
      moduleSelectedKeys: [key],
      moduleSelectedName: menusObject[key].name,
      moduleMenus: menusObject[key].children
    })
  }

  _handleMenuClick = ({ item, key, keyPath }) => {
    this.setState({
      menuSelectedKeys: [key]
    })
  }

  _renderMenuItems = (menus, isModule = false) =>
    menus.map(menu => {
      if (isModule) {
        return (
          <Item key={menu.url}>
            { menu.icon && <Icon type={menu.icon} />}
            <span>{menu.name}</span>
          </Item>
        )
      } else if (isEmpty(menu.children)) {
        return (
          <Item key={menu.url}>
            <Link to={menu.url}>
              { menu.icon && <Icon type={menu.icon} />}
              <span>{menu.name}</span>
            </Link>
          </Item>
        )
      } else {
        return (
          <SubMenu
            key={menu.url}
            title={menu.name}
          >
            {
              this._renderMenuItems(menu.children)
            }
          </SubMenu>
        )
      }
    })

  render() {
    const { collapsed, moduleSelectedKeys, moduleSelectedName, moduleMenus, menuSelectedKeys } = this.state

    return (
      <div className={styles.sider}>
        <Sider
          trigger={null}
          collapsed={true}
        >
          <Link className={styles.logo} to='/'>
            <img src={logo} alt='logo' />
          </Link>
          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={moduleSelectedKeys}
            onClick={this._handleModuleClick}
          >
            {
              this._renderMenuItems(menus, true)
            }
          </Menu>
        </Sider>
        <Sider
          theme='light'
          breakpoint='lg'
          collapsed={collapsed}
          // onCollapse={collapsed => this.setState({ collapsed })}
          className={styles.subSider}
        >
          <h3 className={styles.subSider_title}>{moduleSelectedName}</h3>
          <Menu
            mode='inline'
            // inlineCollapsed={false}
            selectedKeys={menuSelectedKeys}
            onClick={this._handleMenuClick}
          >
            {
              this._renderMenuItems(moduleMenus)
            }
          </Menu>
        </Sider>
      </div>
    )
  }
}

