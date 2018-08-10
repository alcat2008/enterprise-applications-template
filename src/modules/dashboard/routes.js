import * as urls from 'Global/urls';

export default [
  {
    name: 'dashboard',
    path: urls.DASHBOARD,
    loader: () => import('./index'),
    // component: <component>,
    children: [
      {
        name: 'analysis',
        path: urls.DASHBOARD_ANALYSIS,
        hideBreadcrumb: true,
      },
      // {
      //   name: '',
      //   path: '',
      //   parent: '',
      //   hideBreadcrumb: false,
      //   hideInBreadcrumb: false,
      //   breadcrumbRender: (route, match) => match.params.id
      // },
    ],
  },
];
