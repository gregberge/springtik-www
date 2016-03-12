import {Component, PropTypes} from 'react';
import createElement from 'recompose/createElement';

export default (serverHooks, WrappedComponent) =>
  class extends Component {
    static childContextTypes = {
      serverHooks: PropTypes.object
    };

    getChildContext() {
      return {serverHooks};
    }

    render() {
      return createElement(WrappedComponent, this.props);
    }
  };
