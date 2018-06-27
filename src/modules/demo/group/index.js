import React, { Component } from 'react';
import { connect } from '@dx-groups/arthur';
import { get } from '@dx-groups/utils/lang';
import { Link } from '@dx-groups/arthur/routerDom';
import * as urls from 'Global/urls';
// import Module from './module'

@connect(
  ['demo.group'],
  state => state['demo.group']
)
export default class Group extends Component {
  render() {
    const id = get(this.props, 'match.params.id');
    return (
      <div>
        <p>This is group {id}</p>
        {id && id === '12' && <Link to={`${urls.DEMO_GROUP}/34`}>Go to DEMO_GROUP/34</Link>}
        {id && id === '34' && <Link to={`${urls.DEMO_GROUP}/12`}>Go to DEMO_GROUP/12</Link>}
      </div>
    );
  }
}
