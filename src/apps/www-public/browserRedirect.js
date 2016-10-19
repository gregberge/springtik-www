import 'modules/bootstrap';
import React, {PropTypes} from 'react';
import createHelper from 'recompose/createHelper';
import createEagerElement from 'recompose/createEagerElement';

export default createHelper(Component => (
  class BrowserRedirect extends React.Component {
    static contextTypes = {
      redirect: PropTypes.func,
      router: PropTypes.shape({
        replace: PropTypes.func.isRequired,
      }).isRequired,
    };

    static childContextTypes = {
      redirect: PropTypes.func.isRequired,
    };

    getChildContext() {
      return {
        redirect: this.context.redirect || ((status, url) => {
          this.context.router.replace(url);
        }),
      };
    }

    render() {
      return createEagerElement(Component, this.props);
    }
  }
), 'redirectWrapper', true, true);
