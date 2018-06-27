import { createAction } from '@dx-groups/arthur';
import { storage } from '@dx-groups/utils';

// ===========================> Action Types <=========================== //
const INCREASE = 'eat/demo/page/increase';
const DECREASE = 'eat/demo/page/decrease';
const SET = 'eat/demo/page/set';

export default {
  namespace: 'page',

  state: {
    count: 0,
  },

  actions: {
    increase: () => dispatch => {
      dispatch(createAction(INCREASE)());
    },
    decrease: () => dispatch => {
      dispatch(createAction(DECREASE)());
    },
    set: arg => dispatch => {
      dispatch(createAction(SET)(arg));
    },
  },

  reducers: {
    [INCREASE]: state => {
      storage.set('count', state.count + 1);
      return {
        ...state,
        count: state.count + 1,
      };
    },
    [DECREASE]: state => {
      storage.set('count', state.count - 1);
      return {
        ...state,
        count: state.count - 1,
      };
    },
    [SET]: (state, { payload }) => ({
      ...state,
      count: payload,
    }),
  },

  children: [],
};
