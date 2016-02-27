import React from 'react';
import shallowEqual from 'shallowequal';

export default class BaseComponent extends React.Component {
  static contextTypes = {
    insertCss: React.PropTypes.func
  };

  componentWillMount() {
    if (this.styles) {
      if (this.context.insertCss)
        this.removeCss = this.context.insertCss(this.styles);
      else
        this.removeCss = this.styles._insertCss();
    }
  }

  /**
   * Test if the component should be updated or not.
   * - Shallow compare props and state.
   */
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps)
      || !shallowEqual(this.state, nextState);
  }

  componentWillUnmount() {
    if (this.removeCss)
      setTimeout(this.removeCss, 0);
  }
}
