import React from 'react';
import { Link } from '@dx-groups/arthur/routerDom';
import { Icon, Breadcrumb } from 'antd';
import styles from './index.less';

export default function BreadcrumbLayout({ route, routesObject, match }) {
  if (route.hideBreadcrumb) return null;

  const finalRoutes = [route];

  let tmpRoute = route;
  let tmpParent = tmpRoute.parent;
  while (tmpParent) {
    tmpRoute = routesObject[tmpParent];
    tmpParent = tmpRoute.parent;
    finalRoutes.push(tmpRoute);
  }

  return (
    <Breadcrumb
      className={styles.breadcrumb}
      itemRender={(item, params, routes) => {
        if (item.breadcrumbRender) {
          return item.breadcrumbRender(item, match);
        }

        const index = routes.indexOf(item);
        if (index === 0) {
          return (
            <Link to={item.path}>
              <Icon type="home" style={{ fontSize: 14 }} />
              <span style={{ marginLeft: '6px' }}>{item.name}</span>
            </Link>
          );
        }
        if (index === routes.length - 1) {
          return <span>{item.name}</span>;
        }
        return <Link to={item.path}>{item.name}</Link>;
      }}
      routes={finalRoutes.filter(({ hideInBreadcrumb }) => !hideInBreadcrumb).reverse()}
    />
  );
}
