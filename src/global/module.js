import { message } from 'antd';
import { createAction } from '@dx-groups/arthur';
import { replace } from '@dx-groups/arthur/routerRedux';
import { storage } from '@dx-groups/utils';
import fetchData from 'Utils/fetch';
import apis from './apis';
import * as urls from './urls';

// ===========================> Action Types <=========================== //
export const SHOW_SPIN = 'spa/common/SHOW_SPIN';
export const SHOW_BUTTON_SPIN = 'spa/common/SHOW_BUTTON_SPIN';
export const SHOW_LIST_SPIN = 'spa/common/SHOW_LIST_SPIN';
export const SET_USER_INFO = 'spa/common/SET_USER_INFO';

export default {
  namespace: 'common',

  state: {
    showSpin: false,
    showButtonSpin: false,
    showListSpin: false,
    spinTip: 'loading...',
    auths: {},
    userInfo: {},
  },

  actions: {
    showSpin: createAction(SHOW_SPIN),
    showBtnSpin: createAction(SHOW_BUTTON_SPIN),
    showListSpin: createAction(SHOW_LIST_SPIN),
    setUserInfo: createAction(SET_USER_INFO),

    userLogin(arg) {
      return dispatch =>
        fetchData(dispatch, SHOW_BUTTON_SPIN)(apis.login, arg).then(res => {
          if (res.code !== 0) {
            message.error(res.errmsg);
          } else {
            storage.set('userInfo', res.data);
            dispatch(this.setUserInfo(res.data));
            dispatch(replace(urls.HOME));
            // location.href = urls.HOME
          }
        });
    },
    userLogout() {
      return dispatch => {
        // eslint-disable-line no-unused-vars
        storage.clear();
        // dispatch(setUserInfo({}))
        // dispatch(replace(urls.LOGIN))
        location.href = urls.LOGIN;
      };
    },
  },

  reducers: {
    [SHOW_SPIN]: (state, { payload }) => ({
      ...state,
      showSpin: payload.spin,
      spinTip: payload.tip,
    }),
    [SHOW_BUTTON_SPIN]: (state, { payload }) => ({
      ...state,
      showButtonSpin: payload.spin,
      spinTip: payload.tip,
    }),
    [SHOW_LIST_SPIN]: (state, { payload }) => ({
      ...state,
      showListSpin: payload.spin,
      spinTip: payload.tip,
    }),

    [SET_USER_INFO]: (state, { payload }) => {
      storage.set('userInfo', payload);
      return {
        ...state,
        userInfo: payload,
      };
    },
  },

  children: [],
};
