import fetchData from 'Utils/fetch';
import apis from 'Modules/dashboard/apis';
import { message } from 'antd';
import { createAction } from '@dx-groups/arthur/index';
import { SHOW_LIST_SPIN } from 'Global/module';

// ===========================> Action Types <=========================== //

export const SET_TAGS_DATA = '/spa/dashboard/monitor/SET_TAGS_DATA';

export default {
  namespace: 'monitor',

  state: {
    tags: [],
  },

  actions: {
    getTags() {
      return dispatch => {
        fetchData(dispatch, SHOW_LIST_SPIN)(apis.tags).then(res => {
          if (res.code === 0) {
            dispatch(createAction(SET_TAGS_DATA)(res.data));
          } else {
            message.error(res.errmsg);
          }
        });
      };
    },
  },

  reducers: {
    // eslint-disable-next-line
    [SET_TAGS_DATA]: (state, { payload }) => {
      return {
        ...state,
        tags: payload.list,
      };
    },
  },

  children: [],
};
