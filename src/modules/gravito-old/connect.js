import {PropTypes, Component} from 'react';
import createElement from 'recompose/createElement';
import mixin from './utils/mixin';
import stylesBehavior from './mixins/styles';
import observablesBehavior from './mixins/observables';
import shallowEqual from 'shallowequal';

export default (options = {}, WrappedComponent) => {
  const mixins = [];

  if (options.store)
    mixins.push(observablesBehavior);

  if (options.styles)
    mixins.push(stylesBehavior);

  const CustomComponent = mixin(class extends Component {
    static contextTypes = {
      serverHooks: PropTypes.object
    };

    state = {};

    _options = options;

    shouldComponentUpdate(nextProps, nextState) {
      return !shallowEqual(this.props, nextProps)
        || !shallowEqual(this.state, nextState);
    }

    render() {
      return createElement(WrappedComponent, {...this.props, ...this.state.childProps});
    }
  }, mixins);

  return CustomComponent;
};
