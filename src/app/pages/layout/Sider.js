import React, { Component } from 'react';
import { Link } from '@dx-groups/arthur/routerDom';
import { Layout, Icon, Menu } from 'antd';
import classNames from 'classnames';

import { isEmpty } from '@dx-groups/utils/lang';
// import storage from '@dx-groups/utils/storage'
import menus from 'Global/menus';
import { arr2obj } from 'Utils/array';
import logo from 'Assets/images/logo.png';
import styles from './index.less';

const { Sider } = Layout;
const { Item, SubMenu } = Menu;
const menusObject = arr2obj(menus, 'url');
// const menusKeys = storage.get('menu') || {}

function _getSubKeys(_arr) {
  if (_arr && _arr.children) return _arr.children.filter(m => !isEmpty(m.children)).map(c => c.url);
  return [];
}

function _recursiveSearch(_arr, _url) {
  if (isEmpty(_arr)) return false;
  return _arr.filter(c => c.url === _url || _recursiveSearch(c.children, _url)).length > 0;
}

export default class SiderLayout extends Component {
  constructor(props) {
    super(props);
    const currentMenuUrl = location.pathname;
    let currentModule = {};
    menus.some(m => {
      if (_recursiveSearch(m.children, currentMenuUrl)) {
        currentModule = m;
        return true;
      }
      return false;
    });

    // initial state
    this.state = {
      collapsed: false,
      moduleSelectedKeys: [currentModule.url || '/'],
      moduleSelectedName: currentModule.name,
      moduleMenus: currentModule.children,
      menuOpenKeys: _getSubKeys(currentModule),
    };
  }

  _handleModuleClick = ({ item, key }) => {
    this.setState({
      moduleSelectedKeys: [key],
      moduleSelectedName: menusObject[key].name,
      menuOpenKeys: _getSubKeys(menusObject[key]),
      moduleMenus: menusObject[key].children,
    });
  };

  _getMenuItemClass = str => {
    const pathName = location.pathname;
    return classNames({
      'ant-menu-item-selected': pathName.indexOf(str) > -1,
    });
  };

  _renderMenuItems = (_menus, isModule = false) =>
    !isEmpty(_menus) &&
    _menus.map(menu => {
      if (isModule) {
        return (
          <Item key={menu.url} className={this._getMenuItemClass(menu.url)}>
            {menu.icon && <Icon type={menu.icon} />}
            <span>{menu.name}</span>
          </Item>
        );
      }
      if (isEmpty(menu.children)) {
        return (
          <Item key={menu.url} className={this._getMenuItemClass(menu.url)}>
            <Link to={menu.url}>
              {menu.icon && <Icon type={menu.icon} />}
              <span>{menu.name}</span>
            </Link>
          </Item>
        );
      }
      return (
        <SubMenu key={menu.url} title={menu.name}>
          {this._renderMenuItems(menu.children)}
        </SubMenu>
      );
    });

  render() {
    const {
      collapsed,
      moduleSelectedKeys,
      moduleSelectedName,
      moduleMenus,
      menuOpenKeys,
    } = this.state;

    return (
      <div className={styles.sider}>
        <Sider trigger={null} collapsed>
          <Link className={styles.logo} to="/">
            <img src={logo} alt="logo" />
          </Link>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={moduleSelectedKeys}
            onClick={this._handleModuleClick}
          >
            {this._renderMenuItems(menus, true)}
          </Menu>
        </Sider>
        {!isEmpty(moduleMenus) && (
          <Sider
            theme="light"
            breakpoint="lg"
            collapsed={collapsed}
            // onCollapse={collapsed => this.setState({ collapsed })}
            className={styles.subSider}
          >
            <h3 className={styles.subSider_title}>{moduleSelectedName}</h3>
            <Menu
              mode="inline"
              openKeys={menuOpenKeys}
              selectedKeys={[location.pathname]}
              onOpenChange={_keys => this.setState({ menuOpenKeys: _keys })}
            >
              {this._renderMenuItems(moduleMenus)}
            </Menu>
          </Sider>
        )}
      </div>
    );
  }
}
