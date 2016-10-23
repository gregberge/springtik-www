import React, {PropTypes} from 'react';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import createEagerElement from 'recompose/createEagerElement';
import createHelper from 'recompose/createHelper';

export default createHelper(getSubscriptions => Component => (
  class Handler extends React.Component {
    static contextTypes = {
      observables: PropTypes.object.isRequired,
    };

    props$ = new BehaviorSubject(this.props);

    componentWillMount() {
      const subscriptions = getSubscriptions({
        ...this.context.observables,
        props$: this.props$,
      });
      this.subscriptions = Array.isArray(subscriptions)
        ? subscriptions : [subscriptions];
    }

    componentWillReceiveProps(nextProps) {
      this.props$.next(nextProps);
    }

    componentWillUnmount() {
      this.subscriptions.forEach(subscription => subscription.dispose());
    }

    render() {
      return createEagerElement(Component, this.props);
    }
  }
), 'handle');
