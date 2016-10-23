/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
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
    } = {},
  ) => Component => (
    class Connector extends React.Component {
      static contextTypes = {
        observables: React.PropTypes.object.isRequired,
      };

      mounted = false;

      state = {};

      componentWillMount() {
        const {
          observables,
        } = this.context;

        const obsMap = mapObservables(observables);
        this.subscriptions = [];

        Object.keys(obsMap)
          .forEach(prop => {
            if (!obsMap[prop]) {
              throw new Error(
                `ObservoConnectError: Impossible to find obs \`${prop}\` in \`${this.constructor.displayName}\``,
              );
            }

            if (prop.match(/^on[A-Z]/)) {
              this.state[prop] = (obsMap[prop].onNext || obsMap[prop].next)
                .bind(obsMap[prop]);
            } else {
              this.subscriptions.push(obsMap[prop].subscribe(
                value => {
                  if (this.mounted)
                    this.setState({[prop]: value});
                  else
                    this.state[prop] = value;
                },
                handleError,
              ));
            }
          });
      }

      componentDidMount() {
        this.mounted = true;
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      unsubscribe() {
        this.subscriptions.forEach(subscription => {
          (subscription.dispose || subscription.unsubscribe).call(subscription);
        });
      }

      render() {
        return createEagerElement(Component, {
          ...this.props,
          ...this.state,
        });
      }
    }
  )
, 'connect');
