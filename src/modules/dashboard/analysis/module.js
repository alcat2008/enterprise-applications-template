import { message } from 'antd';
import { createAction } from '@dx-groups/arthur';
import fetchData from 'Utils/fetch';
import { SHOW_LIST_SPIN } from 'Global/module';
import apis from '../apis';

// ===========================> Action Types <=========================== //

export const SET_CHART_DATA = '/spa/dashboard/analysis/SET_CHART_DATA';

export default {
  namespace: 'analysis',

  state: {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
  },

  actions: {
    getChartData() {
      return dispatch => {
        fetchData(dispatch, SHOW_LIST_SPIN)(apis.chart).then(res => {
          if (res.code === 0) {
            dispatch(createAction(SET_CHART_DATA)(res.data));
          } else {
            message.error(res.errmsg);
          }
        });
      };
    },
    getSalesData() {
      return dispatch => {
        fetchData(dispatch, SHOW_LIST_SPIN)(apis.chart).then(res => {
          if (res.code === 0) {
            dispatch(createAction(SET_CHART_DATA)(res.data.salesData));
          } else {
            message.error(res.errmsg);
          }
        });
      };
    },
  },

  reducers: {
    // eslint-disable-next-line
    [SET_CHART_DATA]: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },

  children: [],
};
