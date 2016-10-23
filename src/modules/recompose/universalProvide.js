import React, {PropTypes} from 'react';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {of} from 'rxjs/observable/of';
import {switchMap} from 'rxjs/operator/switchMap';
import createEagerElement from 'recompose/createEagerElement';
import createHelper from 'recompose/createHelper';
import joinRoutesPath from './utils/joinRoutesPath';

const filterInitialState = (initialState, {routes, route, params}) => {
  const index = routes.indexOf(route);
  const path = joinRoutesPath({
    routes: routes.slice(0, index + 1),
    params,
  });
  return initialState[path];
};

export default createHelper(getUniversalObservables => Component => {
  return class ObservoUniversalProvide extends React.Component {
    static propTypes = {
      routes: PropTypes.arrayOf(PropTypes.object),
      route: PropTypes.object,
      params: PropTypes.object,
    };

    static contextTypes = {
      observables: PropTypes.object,
      initialState: PropTypes.object,
    };

    static childContextTypes = {
      observables: PropTypes.object.isRequired,
    };

    static getUniversalObservables = getUniversalObservables;

    props$ = new BehaviorSubject(this.props);

    getChildContext() {
      return this.childContext;
    }

    componentWillMount() {
      const {observables = {}} = this.context;

      const childObservables = getUniversalObservables({props$: this.props$});
      const serverObservables = this.getServerObservables(childObservables);

      this.childContext = {
        observables: {
          ...observables,
          ...childObservables,
          ...serverObservables,
        },
      };
    }

    componentWillReceiveProps(nextProps) {
      this.props$.next(nextProps);
    }

    getServerObservables(observables) {
      const {initialState} = this.context;
      const state = filterInitialState(initialState, this.props);

      if (!state) {
        return {};
      }

      return Object.keys(state).reduce((serverObs, name) => ({
        ...serverObs,
        [name]: this.props$
          ::switchMap(props => {
            if (filterInitialState(initialState, props)) {
              return of(state[name]);
            }

            return observables[name];
          }),
      }), {});
    }

    render() {
      return createEagerElement(Component, this.props);
    }
  };
}, 'universalProvide');
