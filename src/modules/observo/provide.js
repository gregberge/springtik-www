import React, {PropTypes} from 'react';
import Rx from 'rxjs/Rx';
import createElement from 'recompose/createElement';
import createHelper from 'recompose/createHelper';
import joinRoutesPath from './utils/joinRoutesPath';

export default createHelper((getObservables, options) => Component => {
  const {resolveOnServer} = options || {};

  return class ObservoProvide extends React.Component {
    static propTypes = {
      routes: PropTypes.arrayOf(PropTypes.object),
      route: PropTypes.object
    };

    static contextTypes = {
      observo: PropTypes.object
    };

    static childContextTypes = {
      observo: PropTypes.object.isRequired
    };

    static getObservables = getObservables;
    static resolveOnServer = resolveOnServer;

    props$ = new Rx.ReplaySubject(1);

    getChildContext() {
      return this.childContext;
    }

    componentWillMount() {
      const {
        observo = {}
      } = this.context;

      const childObservables = getObservables({
        ...observo.observables,
        props$: this.props$
      });

      const serverObservables = this.getServerObservables(childObservables);

      this.childContext = {
        observo: {
          ...observo,
          observables: {
            ...observo.observables,
            ...childObservables,
            ...serverObservables
          }
        }
      };

      this.props$.next(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.props$.next(nextProps);
    }

    getServerObservables(childObservables) {
      const {
        observo: {
          initialState: stateFromContext,
          server
        } = {}
      } = this.context;

      if (resolveOnServer) {
        const index = this.props.routes.indexOf(this.props.route);
        const path = joinRoutesPath(this.props.routes.slice(0, index + 1));
        const initialState = server ? stateFromContext : window.__OBSERVO_STATE__;
        const state = initialState[path];

        if (state) {
          if (!server)
            delete initialState[path];

          return resolveOnServer.reduce((serverObs, name) => ({
            ...serverObs,
            [name]: Rx.Observable.concat(
              Rx.Observable.from([state[name]]),
              childObservables[name]
            )
          }), {});
        }
      }

      return {};
    }

    render() {
      return createElement(Component, this.props);
    }
  };
}, 'observoProvide');
