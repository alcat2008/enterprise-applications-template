const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

const webpackCommon = {
  resolve: {
    alias: {
      Utils: resolve('src/utils/'),
      Assets: resolve('src/assets/'),
      Global: resolve('src/global/'),
      Components: resolve('src/components'),
      Modules: resolve('src/modules'),
    },
  }
}

module.exports = {
  entry: 'src/app/index.js',
  // publicPath: '/eat/', // for deploy
  babel: {
    plugins: [
      ['import', { libraryName: 'antd', style: true }],
      'react-hot-loader/babel'
    ],
  },
  webpack: {
    dev: {
      ...webpackCommon
    },
    prod: {
      ...webpackCommon,
      externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'moment': 'moment',
        'moment/locale/zh-cn': 'moment.locale',
        // 'bizcharts': 'BizChart',
        // '@antv/data-set': 'DataSet',
      },
    },
    vendor: ['immutable', 'bizcharts', '@antv/data-set'],
    // vendor: ['immutable'],
    dll: [
      'antd',
      'axios',
      'classnames',
      'moment',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-dom',
      'react-router-redux',
      'redux',
      'redux-actions',
      'redux-promise',
      'redux-thunk'
    ]
  },
  serviceWorker: 'src/service-worker.js',
  // proxy: {
  //   "/api": {
  //     "target": "http://test-***.***.com",
  //     "changeOrigin": true
  //   }
  // }
}
