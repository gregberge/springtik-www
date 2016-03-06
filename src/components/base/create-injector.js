import {Component, createElement, PropTypes} from 'react';
import RouterContext from 'react-router/lib/RouterContext';

export default ({css, js}) =>
  class extends Component {
    static childContextTypes = {
      insertCss: PropTypes.func.isRequired,
      insertJs: PropTypes.func.isRequired
    };

    getChildContext() {
      return {
        insertCss: styles => css.push(styles._getCss()),
        insertJs: scripts => js.push(scripts)
      };
    }

    render() {
      return createElement(RouterContext, this.props);
    }
  };
