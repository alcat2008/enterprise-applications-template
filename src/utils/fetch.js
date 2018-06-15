
import axios from 'axios'
import { message } from 'antd'
import storage from '@dx-groups/utils/storage'
import { baseUrl } from '../config'
import * as urls from 'Global/urls'
import Module, { SHOW_BUTTON_SPIN, SHOW_LIST_SPIN } from 'Global/module'

let _userTicket = null

export function initUserInfo(ticket) {
  _userTicket = ticket
}

function getUserTicket() {
  if (!_userTicket) {
    const userInfo = storage.get('userInfo')
    _userTicket = userInfo && userInfo.ticket
  }
  return _userTicket
}

function fetcherCreator(url, userInfo) {
  const fetcher = axios.create({
    method: 'post',
    baseURL: url,
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
  })

  fetcher.interceptors.request.use(function (config) {
    config.headers = {
      ...config.headers,
      'ticket': getUserTicket()
    }
    if (!config.data) { // 解决不传参时，Content-Type 不生效，服务器返回 415 的问题
      config.data = {}
    }
    return config
  }, function (error) {
    message.error(error)
    return Promise.reject(error)
  })

  fetcher.interceptors.response.use(function (response) {
    if (response.data.code === 2 || response.data.code === 3) {
      storage.clear()
      initUserInfo(null)
      location.href = urls.LOGIN
      return
    }
    return response.data
  }, function (error) {
    message.error(error)
    return Promise.reject(error)
  })

  return fetcher
}

// 根据类型获取loading action
const getLoadingFn = (spinType) => {
  const { showSpin, showListSpin, showBtnSpin } = Module.actions
  let loadingFn = showSpin
  if (spinType === SHOW_LIST_SPIN) {
    loadingFn = showListSpin
  } else if (spinType === SHOW_BUTTON_SPIN) {
    loadingFn = showBtnSpin
  }
  return loadingFn
}

// 包装fetch
const fetchGenerator = poster => (dispatch, spinType) => {
// 如果dispatch不为函数，则说明不需要loading效果，直接发送请求
  if (typeof dispatch === 'function') {
    const loadingFn = getLoadingFn(spinType)
    return (api, arg, mes = '正在加载数据...', errMes = '请求异常') =>
      new Promise((resolve, reject) => {
        dispatch(loadingFn({ bool: true, content: mes }))
        return poster(api, arg)
          .then(res => {
            dispatch(loadingFn({ bool: false, content: '' }))
            resolve(res)
          }).catch(error => {
            console.error('*** fetch error ***', error)
            dispatch(loadingFn({ bool: false, content: '' }))
            message.error(errMes)
            reject(error)
          })
      })
  } else {
    const api = dispatch
    const arg = spinType
    return new Promise((resolve, reject) => {
      return poster(api, arg)
        .then(res => {
          resolve(res)
        }).catch(error => {
          console.error('*** fetch error ***', error)
          message.error('请求异常')
          reject(error)
        })
    })
  }
}

const defaultFetcher = fetcherCreator(baseUrl)

export default fetchGenerator(defaultFetcher.post)
