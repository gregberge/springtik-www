import {PropTypes} from 'react';
import shallowEqual from 'shallowequal';
import ObservableComponent from './observable-component';

export default class BaseComponent extends ObservableComponent {
  static contextTypes = {
    ...ObservableComponent.contextTypes,
    insertCss: PropTypes.func,
    insertJs: PropTypes.func
  };

  /**
   * Called before the mount of the component.
   * - Call insertCss if available in context else insert CSS.
   */
  componentWillMount() {
    if (super.componentWillMount)
      super.componentWillMount();

    if (this.styles) {
      if (this.context.insertCss)
        this.removeCss = this.context.insertCss(this.styles);
      else
        this.removeCss = this.styles._insertCss();
    }

    if (this.scripts && this.context.insertJs)
      this.context.insertJs(this.scripts);
  }

  /**
   * Test if the component should be updated or not.
   * - Shallow compare props and state.
   */
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps)
      || !shallowEqual(this.state, nextState);
  }

  /**
   * Called before the unmount of the component.
   * - Call removeCss if setted.
   */
  componentWillUnmount() {
    if (super.componentWillUnmount)
      super.componentWillUnmount();

    if (this.removeCss)
      setTimeout(this.removeCss);
  }
}
