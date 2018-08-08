import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { message } from 'antd';
import storage from '@dx-groups/utils/storage';
import * as urls from 'Global/urls';
import Module, { SHOW_BUTTON_SPIN, SHOW_LIST_SPIN } from 'Global/module';
import { baseUrl } from '../config';
import fakeData from './fake';

let _userTicket = null;

export function initUserInfo(ticket) {
  _userTicket = ticket;
}

function getUserTicket() {
  if (!_userTicket) {
    const userInfo = storage.get('userInfo');
    _userTicket = userInfo && userInfo.ticket;
  }
  return _userTicket;
}

function fetcherCreator(url) {
  const fetcher = axios.create({
    method: 'post',
    baseURL: url,
    withCredentials: true,
  });

  fetcher.interceptors.request.use(
    config => {
      config.headers = {
        ...config.headers,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        ticket: getUserTicket(),
      };
      if (!config.data) {
        // 解决不传参时，Content-Type 不生效，服务器返回 415 的问题
        config.data = {};
      }
      return config;
    },
    error => {
      message.error(error);
      return Promise.reject(error);
    }
  );

  fetcher.interceptors.response.use(
    response => {
      // 用户 token 过期的情形
      if (response.data.code === 2 || response.data.code === 3) {
        storage.clear();
        initUserInfo(null);
        location.href = urls.LOGIN;
        return Promise.reject(response.data);
      }
      return response.data;
    },
    error => {
      message.error(error);
      return Promise.reject(error);
    }
  );

  return fetcher;
}

// 根据类型获取loading action
const getLoadingFn = spinType => {
  const { showSpin, showListSpin, showBtnSpin } = Module.actions;
  let loadingFn = showSpin;
  if (spinType === SHOW_LIST_SPIN) {
    loadingFn = showListSpin;
  } else if (spinType === SHOW_BUTTON_SPIN) {
    loadingFn = showBtnSpin;
  }
  return loadingFn;
};

// 包装fetch
const fetchGenerator = poster => (dispatch, spinType) => {
  // 如果dispatch不为函数，则说明不需要loading效果，直接发送请求
  if (typeof dispatch === 'function') {
    const loadingFn = getLoadingFn(spinType);
    return (api, arg, tip = '数据加载中，请稍后...', errMes = '请求异常') =>
      new Promise((resolve, reject) => {
        dispatch(loadingFn({ spin: true, tip }));
        return poster(api, arg)
          .then(res => {
            dispatch(loadingFn({ spin: false, tip }));
            resolve(res);
          })
          .catch(error => {
            console.error('*** fetch error ***', error); // eslint-disable-line no-console
            dispatch(loadingFn({ spin: false, tip }));
            message.error(errMes);
            reject(error);
          });
      });
  }
  const api = dispatch;
  const arg = spinType;
  return new Promise((resolve, reject) =>
    poster(api, arg)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        console.error('*** fetch error ***', error); // eslint-disable-line no-console
        message.error('请求异常');
        reject(error);
      })
  );
};

const defaultFetcher = fetcherCreator(baseUrl);

export default fetchGenerator(defaultFetcher.post);

const mockAdapter = new MockAdapter(defaultFetcher, { delayResponse: 618 })

Object.keys(fakeData).forEach(api => {
  mockAdapter.onPost(api).reply(config => { // eslint-disable-line
    return [200, fakeData[api]]
  })
})
