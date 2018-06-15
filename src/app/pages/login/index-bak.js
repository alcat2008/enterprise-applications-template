import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './index.less'
import { Input, Button } from 'antd'
import logo from 'Assets/images/login/logo.png'
import Module from 'Global/module'
// import * as urls from 'Global/urls'

class Login extends Component {
  static defaultProps = {
    userInfo: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      userPwd: ''
    }
  }

  // componentDidMount() {
  //   // const userInfo = storage.get('userInfo')
  //   const { userInfo, dispatch } = this.props
  //   if (userInfo && userInfo.ticket) {
  //     dispatch(replace(urls.HOME))
  //   }
  // }

  _handleEmpty = (key) => {
    this[`${key}Ref`].focus()
    this.setState({ [key]: '' })
  }

  _login() {
    const { userName, userPwd } = this.state

    let userInfoFormData = new FormData()
    userInfoFormData.append('userName', userName)
    userInfoFormData.append('userPwd', userPwd)
    this.props.dispatch(Module.actions.userLogin(userInfoFormData))
  }

  render() {
    const { showButtonSpin } = this.props
    const { userName, userPwd } = this.state

    return (
      <div className={styles.container}>
        <div className={styles['layout-right']}>
          <div className={styles['login-title']}>
            <img src={logo} />
          </div>
          <h2>enterprise-applications-template</h2>
          <div
            className={styles['box-input']}
          >
            <Input
              placeholder='Enter your username'
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={userName ? <Icon type='close-circle' onClick={() => this._handleEmpty('userName')} /> : null}
              value={userName}
              onChange={({ target }) => this.setState({ userName: target.value })}
              ref={_ref => { this.userNameRef = _ref }}
            />
          </div>
          <div className={styles['box-input']}>
            <Input
              type='password'
              placeholder='Enter your password'
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={userPwd ? <Icon type='close-circle' onClick={() => this._handleEmpty('userPwd')} /> : null}
              value={userPwd}
              onChange={({ target }) => this.setState({ userPwd: target.value })}
              ref={_ref => { this.userPwdRef = _ref }}
              onPressEnter={this._login}
            />
          </div>
          <Button
            className={styles['box-button']}
            loading={showButtonSpin}
            disabled={!userName || !userPwd || showButtonSpin}
            onClick={this._login}
          >登录</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.common.userInfo,
    showButtonSpin: state.common.showButtonSpin
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
