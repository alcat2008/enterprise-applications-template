import * as urls from 'Global/urls'
// import { RouteHelper } from 'Utils/helper'
import BaseModule from 'bundle-loader?lazy!./'

// const genRoute = (path, breadcrumbName, parentPath = urls.HOME) =>
//   RouteHelper.genRoute(path, breadcrumbName, BaseModule, parentPath)

export default [
  {
    name: 'ARTHUR',
    path: urls.ARTHUR,
    baseModule: BaseModule,
    // component: <component>,
    // parent: '',
    children: [
      {
        name: 'PAGE',
        path: urls.ARTHUR_PAGE,
        hideBreadcrumb: true,
        hideInBreadcrumb: false,
        children: [
          {
            name: 'SUB',
            path: urls.ARTHUR_PAGE_SUB,
            breadcrumbRender: (route, match) => match.params.id
          }
        ]
      }
    ]
  }
]
