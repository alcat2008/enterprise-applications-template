# enterprise-applications-template

基于 react + redux + react-router + antd 的最佳实践，服务于企业级中后台项目的模板，特别适用于多模块的场景

[Demo](https://front-ender.cn/eat/) 是 [Ant Design Pro](https://preview.pro.ant.design/#/) 的实现，可以打开控制台，对比下代码的切分粒度。

## 开发工具

开发工具采用 [athena](https://github.com/dx-groups/athena)，是基于 webpack 的应用开发工具，大大提升了开发及运行效率，主要特性如下：

- 基于 webpack 4 进行改造，构建速度快
- 开发时默认分包，启用 dll
- 基于 react 的 HMR
- 支持代理
- 一键 lint/lint-fix，集成 eslint + stylelint
- PWA 支持，默认采用 [Workbox](https://developers.google.com/web/tools/workbox/)
- 环境变量
- 构建时，默认生成 vendor 包，更少的公共代码
- html 模板
- script 默认添加 preload，更少的白屏时间

## redux+

针对多模块场景及 redux 存在的一些问题，参考 dva，形成了好用的 [arthur](https://github.com/dx-groups/arthur)，力求达到：

> 更少的代码，更清晰的结构，更好的性能

同时，结合 athena，构建时，会 **将同一模块下的代码打包在同一个 js bundle 文件中**。

相比一个页面一个 bundle 文件的懒加载模式，这种方式与多模块的场景更为契合，能有效降低 http 的损耗。

## 路由

路由以模块为单位进行配置，默认在模块根目录的 `routes.js` 中指定

```JavaScript
export default [
  {
    name: 'demo',
    path: urls.DEMO,
    loader: () => import('./'),            # 懒加载必须提供统一的入口
    // component: <component>,
    children: [
      {
        name: 'page',
        path: urls.DEMO_PAGE,
      },
      {
        name: 'group',
        path: urls.DEMO_GROUP_REGEXP,
        // parent: '',                     # 父路由，顶级默认是 HOME，其他默认根据路由层级进行制定
        // hideBreadcrumb: false,          # 该路由页面是否不显示面包屑
        hideInBreadcrumb: false,           # 面包屑中是否显示这一层路由信息
        breadcrumbRender: (route, match) => `group ${match.params.id}`       # 自定义面包屑信息
      }
    ],
  },
]
```

## 菜单/导航

菜单同样以模块为单位进行配置，默认在模块根目录的 `menu.js` 中指定。菜单会默认匹配路由，高亮相关的子项

```JavaScript
export default {
  name: 'demo',
  icon: 'bulb',
  url: urls.DEMO,
  children: [
    {
      name: 'DEMO_PAGE',
      url: urls.DEMO_PAGE,
    },
    {
      name: 'DEMO_GROUP',
      url: urls.DEMO_GROUP,
      children: [
        {
          name: 'DEMO_GROUP/12',
          url: `${urls.DEMO_GROUP}/12`,
        },
        {
          name: 'DEMO_GROUP/34',
          url: `${urls.DEMO_GROUP}/34`,
        },
      ]
    }
  ]
}
```

## 其它

业务形态是多模块更存，通过约束，将模块的代码相互隔离。配置等内容都放在 `global` 目录下的相关文件中托管，便于开关。
