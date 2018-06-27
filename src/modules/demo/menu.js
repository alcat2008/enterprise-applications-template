import * as urls from 'Global/urls'

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
      url: urls.DEMO_GROUP_REGEXP,
      children: [
        {
          name: 'DEMO_GROUP/12',
          url: `${urls.DEMO_GROUP}/12`,
        },
        {
          name: 'DEMO_GROUP/34',
          url: `${urls.DEMO_GROUP}/34`,
        },
        {
          name: 'DEMO_PAGE',
          url: urls.DEMO_PAGE,
        },
      ]
    }
  ]
}
