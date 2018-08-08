const { getFakeChartData } = require('./mock/chart')

function _makeSimulatedPause(duration = 400) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

module.exports = {
  '/api/user/login': async (req, res) => {
    const { password, username } = req.body;
    await _makeSimulatedPause(300);
    if (password === '888888') {
      return res.json({
        "code": 0,
        "errmsg": "成功",
        "data": {
          "username": username,
          "fullName": `eat-${username}`,
          "ticket": "c14f93c59ea54255a2745cd21f8436fb"
        }
      })
    } else {
      return res.json({
        "code": 2000,
        "errmsg": "密码错误",
      })
    }
  },
  '/api/user/logout': {
    "code": 0,
    "errmsg": "成功",
    "data": {
      "username": "eat",
      "fullName": "enterprise-applications-template",
      "ticket": "c14f93c59ea54255a2745cd21f8436fb"
    }
  },
  '/api/fake_chart_data': {
    "code": 0,
    "errmsg": "成功",
    "data": getFakeChartData,
  },
}
