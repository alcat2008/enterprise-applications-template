import * as urls from 'Global/urls'

export default [
  {
    name: 'ARTHUR',
    path: urls.ARTHUR,
    loader: () => import('./'),
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
