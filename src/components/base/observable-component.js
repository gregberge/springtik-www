/* eslint no-empty: 0, no-console: 0, no-process-env: 0 */
import {Component as ReactComponent, PropTypes} from 'react';
import shallowEqual from 'shallowequal';
import ActionLocator from './action-locator';
import Rx from '@doctolib/rx';

export default class ObservableComponent extends ReactComponent {
  /**
   * Child context types.
   * We put observables inside to be able to forward
   * observables to children.
   *
   * @type {object}
   */
  static childContextTypes = {
    observables: PropTypes.object
  };

  /**
   * Context types.
   * We always take observables from parent.
   *
   * @type {object}
   */
  static contextTypes = {
    observables: PropTypes.object
  };

  /**
   * Create a new component.
   * - Default state
   * - Cache obsTypes entries
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    // Initialize state.
    this.state = this.state || {};

    this._obsSubscriptions = [];

    // Cache obsTypes entries for obsTypes checking
    // in other environments than production
    if (process.env.NODE_ENV !== 'production')
      this._obsTypesEntries = Object.keys(this.constructor.obsTypes || {})
        .map(name => [name, this.constructor.obsTypes[name]]);
  }

  /**
   * Return the cached child context.
   */
  getChildContext() {
    return this._cachedChildContext;
  }

  /**
   * Called before the mount of the component.
   * - Cache observables
   * - Cache childContext
   */
  componentWillMount() {
    if (this.constructor.fetchResources) {
      if (this.constructor.resources$)
        this.resources$ = this.constructor.resources$;
      else
        this.resources$ = Rx.Observable.defer(() => this.constructor.fetchResources());
    }

    this._cachedObservables = this.getObservables
      ? this.getObservables(this.context.observables, {props$: this.props$, resources$: this.resources$}) : null;
    this._cachedChildContext = this._createChildContext();

    this._subscribeToObservables(
      this._getTypedObservables(this.props)
    );

    if (this.props$)
      this.props$.next(this.props);

    if (typeof window === 'undefined')
      this._cleanup();
  }

  /**
   * Called when new props are injected in the component.
   *
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (shallowEqual(nextProps, this.props))
      return;

    this._subscribeToObservables(
      this._getTypedObservables(nextProps)
    );

    if (this.props$)
      this.props$.next(nextProps);
  }

  /**
   * Called when the component will unmount.
   * - Unsubscribe from observables
   */
  componentWillUnmount() {
    this._cleanup();
  }

  /**
   * Trigger an action using action locator found under context.actions.
   *
   * @param {string} name
   * @param {*} value
   */
  triggerAction = (name, value) => {
    const actions = this._cachedObservables && this._cachedObservables.actions
      ? this._cachedObservables.actions
      : this.context.observables.actions;

    if (!(actions instanceof ActionLocator))
      throw new Error('Unable to find context.actions (ActionLocator)');

    actions.trigger(name, value);
  }

  /**
   * Default implementation when we receive an error.
   *
   * @param {Error} error
   */
  componentWillReceiveErrorFromObservables(error) {
    setTimeout(() => {
      throw error;
    });
  }

  /**
   * Create child context.
   *
   * @returns {object}
   */
  _createChildContext() {
    let context = null;

    // Add observables
    if (this._cachedObservables) {
      const {dispose, ...cachedObservables} = this._cachedObservables;
      context = {
        ...context,
        observables: {
          ...this.context.observables,
          ...cachedObservables
        }
      };
    }

    return context;
  }

  /**
   * Subscribe to observables.
   *
   * @param {object} observables
   */
  _subscribeToObservables(observables) {
    const obsKeys = Object.keys(observables);

    if (!obsKeys.length)
      return;

    if (this._subscribedObservables
      && shallowEqual(this._subscribedObservables, observables))
      return;

    this._unsubscribeFromObservables();

    this._subscribedObservables = observables;

    this._obsSubscriptions = obsKeys.map(key =>
      observables[key]
        .subscribe(
          value =>
            this._observablesSubscribeNext({[key]: value}),
          error => this._observablesSubscribeError(error)
        )
    );

    this._checkObsTypes(this._lastOnNextResult || {});
  }

  /**
   * Unsubscribe from observables.
   */
  _unsubscribeFromObservables() {
    this._obsSubscriptions.forEach(sub => sub.dispose());

    this._obsSubscriptions = [];
    this._subscribedObservables = null;
    this._lastOnNextResult = null;
  }

  /**
   * Clean up everything.
   */
  _cleanup() {
    this._unsubscribeFromObservables();
    if (this._cachedObservables && this._cachedObservables.dispose)
      this._cachedObservables.dispose();
  }

  /**
   * Called when a onError subscribe occurs.
   * - Call componentWillReceiveErrorFromObservables
   *
   * @param {Error} error
   */
  _observablesSubscribeError(error) {
    this.componentWillReceiveErrorFromObservables(error);
  }

  /**
   * Called when a onNext subscribe occurs.
   * - Call componentWillReceiveStateFromObservables
   * - Set state of component
   *
   * @param {object} nextState
   */
  _observablesSubscribeNext(nextState) {
    this._lastOnNextResult = {...this._lastOnNextResult, ...nextState};

    this._checkObsTypes(nextState, Object.keys(nextState));

    if (this.componentWillReceiveStateFromObservables)
      this.componentWillReceiveStateFromObservables(nextState);

    this.setState(nextState);
  }

  /**
   * Check obsTypes.
   *
   * @param {object} nextState
   * @param {string[]} toCheck
   */
  _checkObsTypes(nextState, toCheck = null) {
    if (process.env.NODE_ENV === 'production')
      return;

    this._obsTypesEntries
      .forEach(([name, check]) => {
        if (toCheck && !toCheck.includes(name))
          return;

        if (!check) {
          console.error('Warning: Invalid PropType for the "%s" obsType', name);
          return;
        }

        const error = check(nextState, name, this.constructor.name, 'prop');
        if (!error)
          return;

        console.error(`Warning: Failed obsType: \
  ${error.message.replace(/ prop /g, ' obs ')}`);

        // Create stack to help debugging
        try {
          throw error;
        } catch (e) {}
      });
  }

  /**
   * Get observables referenced in obsTypes.
   *
   * @param {object} props
   */
  _getTypedObservables(props) {
    const {observables: contextObservables = {}} = this.context;
    const observables = {
      ...contextObservables,
      ...this._cachedObservables,
      ...props
    };

    return Object.keys(this.constructor.obsTypes || {})
      .reduce((filteredObs, type) => {
        const obs$ = observables[`${type}$`];

        if (!obs$)
          throw new Error(`Missing observable ${type}$ in ${this.constructor.name}`);

        if (typeof obs$.subscribe !== 'function')
          throw new Error(`${type}$ is not a valid observable in ${this.constructor.name}`);

        return {...filteredObs, [type]: obs$};
      }, {});
  }
}
