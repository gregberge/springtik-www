import React from 'react';
import shallowEqual from 'shallowequal';

export default class Component extends React.Component {
  /**
   * Test if the component should be updated or not.
   * - Shallow compare props and state.
   */
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps)
      || !shallowEqual(this.state, nextState);
  }
}
