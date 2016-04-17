import React from 'react';
import createElement from 'recompose/createElement';
import createHelper from 'recompose/createHelper';

export default createHelper(styles => Component => (
  class ComponentWithStyles extends React.Component {
    static contextTypes = {
      insertCss: React.PropTypes.func.isRequired
    };

    componentWillMount() {
      this._removeCss = this.context.insertCss(styles._getCss());
    }

    componentWillUnmount() {
      setTimeout(this._removeCss);
    }

    render() {
      return createElement(Component, this.props);
    }
  }
), 'withStyles');
