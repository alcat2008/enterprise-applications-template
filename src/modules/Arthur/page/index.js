import React, { Component } from 'react'
import { connect } from '@dx-groups/arthur'
import Module from './module'
import BaseModule from '../module'

@connect(
  ['common.showListSpin', 'arthur.page'],
  state => {
    return {
      ...state['arthur.page']
    }
  }
)
export default class Page extends Component {
  _handleClick = () => {
    this.props.dispatch(Module.actions.getCheckList())
    this.props.dispatch(BaseModule.actions.getFirstList())
  }

  render() {
    return (
      <div onClick={this._handleClick}>{this.props.data.name}</div>
    )
  }
}
