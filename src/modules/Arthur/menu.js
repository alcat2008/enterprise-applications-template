import * as urls from 'Global/urls'

export default {
  name: 'ARTHUR',
  icon: 'shop',
  url: urls.ARTHUR,
  children: [
    {
      name: 'ARTHUR_PAGE',
      url: urls.ARTHUR_PAGE,
      children: [
        {
          name: `${urls.ARTHUR_PAGE}/12`,
          url: `${urls.ARTHUR_PAGE}/12`,
        }
      ]
    },
    {
      name: `${urls.ARTHUR_PAGE}/34`,
      url: `${urls.ARTHUR_PAGE}/34`,
    }
  ]
}
