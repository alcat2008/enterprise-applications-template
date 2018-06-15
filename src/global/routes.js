import * as urls from './urls'
import Home from '../app/pages/home/index'

import arthurRoutes from 'Modules/Arthur/routes'

function transformRoutes (routes, _parent = urls.HOME, _baseModule) {
  const tmpRoutes = []
  routes && routes.forEach(route => {
    const { children, parent = _parent, baseModule = _baseModule, ...rest } = route
    tmpRoutes.push(
      {
        ...rest,
        parent,
        baseModule,
      },
      ...transformRoutes(children, rest.path, baseModule)
    )
  })
  return tmpRoutes
}

const arthurs = transformRoutes(arthurRoutes)

const routes = [
  {
    name: '首页',
    path: urls.HOME,
    component: Home,
  },
  ...arthurs,
]
export default routes
