import {Component, createElement, PropTypes} from 'react';
import RouterContext from 'react-router/lib/RouterContext';

export default ({css, initialResources}) =>
  class extends Component {
    static childContextTypes = {
      insertCss: PropTypes.func,
      initialResources: PropTypes.object
    };

    getChildContext() {
      return {
        insertCss: css ? styles => css.push(styles._getCss()) : undefined,
        initialResources
      };
    }

    render() {
      return createElement(RouterContext, this.props);
    }
  };
