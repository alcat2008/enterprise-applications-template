import React, { Component } from 'react';
import { connect } from '@dx-groups/arthur';
import Module from './module';
import styles from './page.less';

@connect(
  ['demo.page'],
  state => state['demo.page']
)
export default class Page extends Component {
  state = {
    count: 2,
  };

  static getDerivedStateFromProps(props, state) {
    return {
      count: props.count === 2 ? 'TWO' : props.count,
    };
  }

  _handleAction = (e, _action) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(Module.actions[_action]());
  };

  render() {
    const { count } = this.state;
    return (
      <div className={styles.page}>
        <p>{count}</p>

        <button type="button" onClick={e => this._handleAction(e, 'increase')}>
          increase
        </button>
        <button type="button" onClick={e => this._handleAction(e, 'decrease')}>
          decrease
        </button>
      </div>
    );
  }
}
