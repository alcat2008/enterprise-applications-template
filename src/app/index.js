
import { createBrowserHistory } from 'history'
import arthur from '@dx-groups/arthur'
import storage from '@dx-groups/utils/storage'

import Router from './Router'
import { initUserInfo } from 'Utils/fetch'
import * as urls from 'Global/urls'
import './index.less'

import routerModule from './routerModule'
import commonModule from 'Global/module'
import arthurModule from 'Modules/Arthur/module'

let currentUserInfo = {}

// 1. Initialize
const app = arthur({
  history: createBrowserHistory(),
  // extraReducers, // to compatiple with normal redux project
  onStateChange: (state) => {
    if (state.common.userInfo.ticket !== currentUserInfo.ticket) {
      currentUserInfo = state.common.userInfo
      initUserInfo(currentUserInfo.ticket)
    }
  },
})

app.init(() => dispatch => {
  const userInfo = storage.get('userInfo')
  if (userInfo) {
    dispatch(commonModule.actions.setUserInfo(userInfo))
  } else {
    if (location.pathname !== urls.LOGIN) {
      location.href = urls.LOGIN
    }
  }
})

// 2. Plugins
// app.use(createLoading());

// 3. Register global model
app.modules([
  routerModule,
  commonModule,
  arthurModule,
])

// 4. Router
app.router(Router)

// 5. Start
app.start('#root')

export default app._store;  // eslint-disable-line

// Rewrite console.log
if (process.env.NODE_ENV === 'production') {
  ;(function () {
    if (window.console && console.log) {
      const _log = console.log
      const showLog = storage.get('log')

      window.console.log = function () {
        // Array.prototype.unshift.call(arguments, 'Log start: ')
        showLog && _log.apply(this, arguments)
      }
    }
  })()
}

/**
 * @param {String}  errorMessage   错误信息
 * @param {String}  scriptURI      出错的文件
 * @param {Long}    lineNumber     出错代码的行号
 * @param {Long}    columnNumber   出错代码的列号
 * @param {Object}  errorObj       错误的详细信息，Anything
 */
window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
  console.log('*** errorMessage:', errorMessage)
  console.log('*** scriptURI:', scriptURI)
  console.log('*** lineNumber:', lineNumber)
  console.log('*** columnNumber:', columnNumber)
  console.log('*** errorObj:', errorObj)
}

window.addEventListener('error', function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
  console.log('*** errorMessage:', errorMessage)
  console.log('*** scriptURI:', scriptURI)
  console.log('*** lineNumber:', lineNumber)
  console.log('*** columnNumber:', columnNumber)
  console.log('*** errorObj:', errorObj)
})
