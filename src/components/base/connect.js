import BaseComponent from './base-component';
import createElement from 'recompose/createElement';

export default ({
  getObservables,
  obsTypes,
  styles,
  scripts,
  fetchResources
}, Component) => {
  return class extends BaseComponent {
    static displayName = Component.displayName;
    static obsTypes = obsTypes;
    static fetchResources = fetchResources;
    styles = styles;
    scripts = scripts;
    getObservables = getObservables;

    render() {
      return createElement(Component, {
        triggerAction: this.triggerAction,
        ...this.state,
        ...this.props
      });
    }
  };
};
