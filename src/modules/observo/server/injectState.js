import React from 'react';
import createEagerElement from 'recompose/createEagerElement';
import createHelper from 'recompose/createHelper';

export default createHelper(initialState => Component => (
  class ObservoServerStateInjector extends React.Component {
    static childContextTypes = {
      observo: React.PropTypes.object.isRequired,
    };

    getChildContext() {
      return {
        observo: {
          initialState,
          server: true,
        },
      };
    }

    render() {
      return createEagerElement(Component, this.props);
    }
  }
), 'observoServerInjectState');
