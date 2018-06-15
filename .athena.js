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
  babel: {
    plugins: [
      // ['import', [{ libraryName: 'antd', style: 'css' }]],
      ['import', { libraryName: 'antd', style: true }],
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
      },
    },
    vendor: ['immutable']
  },
  proxy: {
    "/api": {
      "target": "http://test-***.***.com",
      "changeOrigin": true
    }
  }
}
