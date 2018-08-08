import { getFakeChartData } from './chart';

export default {
  '/api/user/login': {
    "code": 0,
    "errmsg": "成功",
    "data": {
      "username": 'dx-groups',
      "fullName": 'eat-dx-groups',
      "ticket": "c14f93c59ea54255a2745cd21f8436fb",
    },
  },
  '/api/user/logout': {
    "code": 0,
      "errmsg": "成功",
      "data": {
      "username": "eat",
      "fullName": "enterprise-applications-template",
      "ticket": "c14f93c59ea54255a2745cd21f8436fb",
    },
  },
  '/api/fake_chart_data': {
    "code": 0,
    "errmsg": "成功",
    "data": getFakeChartData,
  },
}
