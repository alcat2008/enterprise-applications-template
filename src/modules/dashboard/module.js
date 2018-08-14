import analysis from './analysis/module';
import monitor from './monitor/module';

export default {
  namespace: 'dashboard',

  state: {},

  actions: {},

  reducers: {},

  children: [analysis, monitor],
};
