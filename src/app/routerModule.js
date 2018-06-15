import { routerReducer } from 'react-router-redux'

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

export default {
  namespace: 'router',

  state: {
    pre: '',
    location: null
  },

  actions: {},

  reducers: {
    [LOCATION_CHANGE]: (state, action) => ({
      ...state,
      pre: state.location && state.location.pathname,
      location: routerReducer(action).payload,
    }),
  },

  children: []
}
