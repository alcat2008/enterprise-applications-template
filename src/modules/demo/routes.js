// router configuration for module

import * as urls from 'Global/urls'

export default [
  {
    name: 'demo',
    path: urls.DEMO,
    loader: () => import('./'),
    // component: <component>,
    children: [
      {
        name: 'page',
        path: urls.DEMO_PAGE,
      },
      {
        name: 'group',
        path: urls.DEMO_GROUP_REGEXP,
        // parent: '',
        // hideBreadcrumb: false,
        hideInBreadcrumb: false,
        breadcrumbRender: (route, match) => `group ${match.params.id}`
      }
    ],
  },
]
