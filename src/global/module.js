import { message } from 'antd'
import { createAction } from '@dx-groups/arthur'
import { replace } from '@dx-groups/arthur/routerRedux'
import { storage } from '@dx-groups/utils'
import fetchData from 'Utils/fetch'
import apis from './apis'
import * as urls from './urls'

// ===========================> Action Types <=========================== //
export const SHOW_SPIN = 'spa/common/SHOW_SPIN'
export const SHOW_BUTTON_SPIN = 'spa/common/SHOW_BUTTON_SPIN'
export const SHOW_LIST_SPIN = 'spa/common/SHOW_LIST_SPIN'
export const SET_USER_INFO = 'spa/common/SET_USER_INFO'

export default {
  namespace: 'common',

  state: {
    showSpin: { bool: false, content: '' },
    showButtonSpin: false,
    showListSpin: false,
    auths: {},
    userInfo: {},
  },

  actions: {
    showSpin: createAction(SHOW_SPIN),
    showBtnSpin: createAction(SHOW_BUTTON_SPIN),
    showListSpin: createAction(SHOW_LIST_SPIN),
    setUserInfo: createAction(SET_USER_INFO),

    userLogin (arg) {
      return dispatch =>
        fetchData(dispatch, SHOW_BUTTON_SPIN)(apis.login, arg)
          .then(res => {
            dispatch(this.showBtnSpin(false))
            if (res.code !== 0) {
              message.error(res.errmsg)
            } else {
              storage.set('userInfo', res.data)
              dispatch(this.setUserInfo(res.data))
              dispatch(replace(urls.HOME))
              // location.href = urls.HOME
            }
          })
    },
    userLogout (arg) {
      return dispatch => {
        storage.clear()
        // dispatch(setUserInfo({}))
        // dispatch(replace(urls.LOGIN))
        location.href = urls.LOGIN
      }
    }
  },

  reducers: {
    [SHOW_SPIN]: (state, { payload }) => ({
      ...state,
      showSpin: payload,
    }),
    [SHOW_BUTTON_SPIN]: (state, { payload }) => ({
      ...state,
      showButtonSpin: payload,
    }),
    [SHOW_LIST_SPIN]: (state, { payload }) => ({
      ...state,
      showListSpin: payload,
    }),

    [SET_USER_INFO]: (state, { payload }) => {
      storage.set('userInfo', payload)
      return {
        ...state,
        userInfo: payload,
      }
    },
  },

  children: []
}
