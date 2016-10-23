import React, {PropTypes} from 'react';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import createEagerElement from 'recompose/createEagerElement';
import createHelper from 'recompose/createHelper';

export default createHelper(providers => Component => {
  return class Provider extends React.Component {
    static contextTypes = {
      observables: PropTypes.object,
    };

    static childContextTypes = {
      observables: PropTypes.object.isRequired,
    };

    props$ = new BehaviorSubject(this.props);
    state = null;

    getChildContext() {
      return this.childContext;
    }

    componentWillMount() {
      const {observables} = this.context;
      const childObservables = (Array.isArray(providers) ? providers : [providers])
        .reduce((result, provider) => ({
          ...result,
          ...provider(result),
        }), {
          ...observables,
          props$: this.props$,
        });

      if (childObservables.props$) {
        this.state = {};
        this.subscription = childObservables.props$.subscribe({
          next: props => this.setState(props),
          error: error => {
            throw error;
          },
        });
        delete childObservables.props$;
      }

      this.childContext = {
        observables: {
          ...observables,
          ...childObservables,
        },
      };
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
      const props = this.state ? this.state : this.props;
      return createEagerElement(Component, props);
    }
  };
}, 'provide');
