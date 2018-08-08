import { Component } from 'react';
import { storage } from '@dx-groups/utils';

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } authority
 * @param { 你的权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 */
const checkPermissions = (authority, target, noMatch) => {
  // 没有判定权限.默认查看所有
  // Retirement authority, return target;
  // if (!authority) {
  //   return target;
  // }

  const userInfo = storage.get('userInfo');
  if (userInfo) {
    return target;
  }

  return noMatch;
  // throw new Error('unsupported parameters');
};

class Authorized extends Component {
  render() {
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return checkPermissions(authority, childrenRender, noMatch);
  }
}

export default Authorized;
