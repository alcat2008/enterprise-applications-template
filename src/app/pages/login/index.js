import React, { Component } from 'react';
import { connect } from '@dx-groups/arthur';
import { Link } from '@dx-groups/arthur/routerDom';
import { Checkbox } from 'antd';
import commonModule from 'Global/module';
import Login from './Login';
import styles from './index.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(
  'common',
  ({ showButtonSpin }) => ({ loading: showButtonSpin })
)
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    if (!err) {
      this.props.dispatch(commonModule.actions.userLogin(values));
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  render() {
    const { loading } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="账户密码登录">
            <UserName name="username" placeholder="admin" />
            <Password name="password" placeholder="888888" />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            <Mobile name="mobile" />
            <Captcha name="captcha" />
          </Tab>
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a style={{ float: 'right' }} href="/">
              忘记密码
            </a>
          </div>
          <Submit loading={loading}>登录</Submit>
          <div className={styles.other}>
            <Link className={styles.register} to="/user/register">
              注册账户
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}
