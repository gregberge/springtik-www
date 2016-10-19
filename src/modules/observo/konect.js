/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import createEagerElement from 'recompose/createEagerElement';
import createHelper from 'recompose/createHelper';

const defaultHandleError = error => {
  setTimeout(() => {
    throw error;
  });
};

export default createHelper(
  (
    mapObservables, {
      handleError = defaultHandleError,
    } = {}
  ) => Component => (
    class Konector extends React.Component {
      static contextTypes = {
        observo: React.PropTypes.object,
      };

      static childContextTypes = {
        observo: React.PropTypes.object.isRequired,
      };

      state = {};

      props$ = new BehaviorSubject(this.props);

      getChildContext() {
        return this.childContext;
      }

      componentWillMount() {
        const {observo = {}} = this.context;

        const {props$, ...childObservables} = mapObservables({
          ...observo.observables,
          props$: this.props$,
        });

        this.childContext = {
          observo: {
            ...observo,
            observables: {
              ...observo.observables,
              ...childObservables,
            },
          },
        };

        this.subscription = props$.subscribe({
          next: props => {
            this.setState(props);
          },
          error: handleError,
        });

        if (observo.server) {
          this.subscription.unsubscribe();
        }
      }

      componentWillReceiveProps(nextProps) {
        this.props$.next(nextProps);
      }

      componentWillUnmount() {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
      }

      render() {
        return createEagerElement(Component, this.state);
      }
    }
  )
, 'konect');
