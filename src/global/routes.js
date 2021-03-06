import demoRoutes from 'Modules/demo/routes';
import dashboardRoutes from 'Modules/dashboard/routes';
import * as urls from './urls';
import Home from '../app/pages/home/index';

function transformRoutes(routes, _parent = urls.HOME, _loader) {
  const tmpRoutes = [];
  routes &&
    routes.forEach(route => {
      const { children, parent = _parent, loader = _loader, ...rest } = route;
      tmpRoutes.push(
        {
          ...rest,
          parent,
          loader,
        },
        ...transformRoutes(children, rest.path, loader)
      );
    });
  return tmpRoutes;
}

const demos = transformRoutes(demoRoutes);
const dashboards = transformRoutes(dashboardRoutes);

const routes = [
  {
    name: '首页',
    path: urls.HOME,
    component: Home,
  },
  ...demos,
  ...dashboards,
];
export default routes;
