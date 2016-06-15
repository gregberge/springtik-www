import React, {PropTypes} from 'react';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {from} from 'rxjs/observable/from';
import {concatStatic} from 'rxjs/operator/concat';
import {skip} from 'rxjs/operator/skip';
import {switchMapTo} from 'rxjs/operator/switchMapTo';
import createElement from 'recompose/createElement';
import createHelper from 'recompose/createHelper';
import joinRoutesPath from './utils/joinRoutesPath';

export default createHelper((getObservables, options) => Component => {
  const {resolveOnServer} = options || {};

  return class ObservoProvide extends React.Component {
    static propTypes = {
      routes: PropTypes.arrayOf(PropTypes.object),
      route: PropTypes.object,
    };

    static contextTypes = {
      observo: PropTypes.object,
    };

    static childContextTypes = {
      observo: PropTypes.object.isRequired,
    };

    static getObservables = getObservables;
    static resolveOnServer = resolveOnServer;

    props$ = new ReplaySubject(1);

    getChildContext() {
      return this.childContext;
    }

    componentWillMount() {
      const {
        observo = {},
      } = this.context;

      const childObservables = getObservables({
        ...observo.observables,
        props$: this.props$,
      });

      const serverObservables = this.getServerObservables(childObservables);

      this.childContext = {
        observo: {
          ...observo,
          observables: {
            ...observo.observables,
            ...childObservables,
            ...serverObservables,
          },
        },
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
          server,
        } = {},
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
            [name]: concatStatic(
              from([state[name]]),
              this.props$
                ::skip(1)
                ::switchMapTo(childObservables[name]),
            ),
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
