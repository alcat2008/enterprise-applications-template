import React from 'react'
import { Link } from '@dx-groups/arthur/routerDom'
import { Icon, Breadcrumb } from 'antd'
import styles from './index.less'

export default function BreadcrumbLayout({ route, routesObject, match }) {
  if (route.hideBreadcrumb) return null

  const finalRoutes = [route]

  let tmpRoute = route
  let tmpParent = tmpRoute.parent
  while (tmpParent) {
    tmpRoute = routesObject[tmpParent]
    tmpParent = tmpRoute.parent
    finalRoutes.push(tmpRoute)
  }

  return (
    <Breadcrumb
      className={styles.breadcrumb}
      itemRender={(route, params, routes) => {
        if (route.breadcrumbRender) {
          return route.breadcrumbRender(route, match)
        }

        const index = routes.indexOf(route)
        if (index === 0) {
          return (
            <Link to={route.path}>
              <Icon type='home' style={{ fontSize: 14 }} /><span style={{ marginLeft: '6px' }}>{route.name}</span>
            </Link>
          )
        } else if (index === routes.length - 1) {
          return <span>{route.name}</span>
        } else {
          return <Link to={route.path}>{route.name}</Link>
        }
      }}
      routes={finalRoutes.filter(({ hideInBreadcrumb }) => !hideInBreadcrumb).reverse()}
    />
  )
}
