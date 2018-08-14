import { createBrowserHistory } from '@dx-groups/arthur/history';
import arthur from '@dx-groups/arthur';
import storage from '@dx-groups/utils/storage';

import { initUserInfo } from 'Utils/fetch';
import * as urls from 'Global/urls';

import routerModule from './routerModule'; // eslint-disable-line
import commonModule from 'Global/module';
import demoModule from 'Modules/demo/module';
import dashboardModule from 'Modules/dashboard/module';

import Router from './Router';
import './index.less';

// add logger for redux
const __PROD__ = process.env.NODE_ENV === 'production';
let onAction = [];
if (!__PROD__) {
  const logger = require('redux-logger'); // eslint-disable-line
  onAction = [logger.default];
}

let currentUserInfo = {};

// 1. Initialize
const app = arthur({
  history: createBrowserHistory(),
  onAction,
  // extraReducers, // to compatiple with normal redux project
  onStateChange: state => {
    if (state.common.userInfo.ticket !== currentUserInfo.ticket) {
      currentUserInfo = state.common.userInfo;
      initUserInfo(currentUserInfo.ticket);
    }
  },
});

app.init(() => dispatch => {
  const userInfo = storage.get('userInfo');
  if (userInfo) {
    dispatch(commonModule.actions.setUserInfo(userInfo));
  } else if (location.pathname !== urls.LOGIN) {
    location.href = urls.LOGIN;
  }
});

// 2. Plugins
// app.use(createLoading());

// 3. Register global model
app.modules([routerModule, commonModule, demoModule, dashboardModule]);

// 4. Router
app.router(Router);

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line

/*  eslint-disable no-console */
// Rewrite console.log
if (__PROD__) {
  (function() {
    if (window.console && console.log) {
      const _log = console.log;
      const showLog = storage.get('log');

      window.console.log = function(...args) {
        // Array.prototype.unshift.call(args, 'Log start: ')
        showLog && _log.apply(this, args);
      };
    }
  })();
}

/**
 * @param {String}  errorMessage   错误信息
 * @param {String}  scriptURI      出错的文件
 * @param {Long}    lineNumber     出错代码的行号
 * @param {Long}    columnNumber   出错代码的列号
 * @param {Object}  errorObj       错误的详细信息，Anything
 */
window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
  console.group(`%c Uncaught error: ${errorMessage}`, 'color: red; font-weight: bold;');
  console.log('    scriptURI: ', scriptURI);
  console.log('   lineNumber: ', lineNumber);
  console.log(' columnNumber: ', columnNumber);
  console.error(errorObj);
  console.groupEnd();
};
