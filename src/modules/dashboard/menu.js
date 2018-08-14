import * as urls from 'Global/urls';

export default {
  name: 'dashboard',
  icon: 'dashboard',
  url: urls.DASHBOARD,
  children: [
    {
      name: '分析页',
      url: urls.DASHBOARD_ANALYSIS,
    },
    {
      name: '监控页',
      url: urls.DASHBOARD_MONITOR,
    },
  ],
};
