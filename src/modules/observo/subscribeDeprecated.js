import React from 'react';
import createEagerElement from 'recompose/createEagerElement';
import createHelper from 'recompose/createHelper';

export default createHelper((contextTypes, subscribe) => Component => {
  return class ObservoSubscribe extends React.Component {
    static contextTypes = contextTypes;

    componentWillMount() {
      this.subscriptions = subscribe(this.context);
    }

    componentWillUnmount() {
      if (this.subscriptions.unsubscribe) {
        this.subscriptions.unsubscribe();
        return;
      }

      this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
      });
    }

    render() {
      return createEagerElement(Component, this.props);
    }
  };
}, 'observoSubscribeHoc');
