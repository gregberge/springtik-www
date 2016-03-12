import Rx from 'rxjs/Rx';
import shallowEqual from 'shallowequal';
import objectToPropSequence from '../utils/objectToPropSequence';
import getCompleteRoutePath from '../utils/getCompleteRoutePath';

export default {
  initialize() {
    this.state = {};
    this._componentHasMounted = false;
    this._receiveOwnerProps$ = new Rx.Subject();
    this._ownerProps$ = this._receiveOwnerProps$.startWith(this.props);

    if (this.constructor.routeStore) {
      const index = this.props.routes.indexOf(this.props.route);
      const path = getCompleteRoutePath(this.props.routes.slice(0, index + 1));

      let routeStores;

      if (this.context.serverHooks && this.context.serverHooks.routeStores)
        routeStores = this.context.serverHooks.routeStores;
      else if (typeof window !== 'undefined' && window.__ROUTE_STORES__)
        routeStores = window.__ROUTE_STORES__;
      else
        routeStores = {};

      const initialRouteStoreData = routeStores[path];

      if (initialRouteStoreData)
        this._routeStore$ = Rx.Observable.from([initialRouteStoreData]);
      else
        this._routeStore$ = objectToPropSequence(this.constructor.routeStore(this._ownerProps$));

      this._ownerProps$ = this._ownerProps$
        .combineLatest(this._routeStore$, (props, routeStoreData) => ({...props, routeStoreData}));
    }

    this._childProps$ = objectToPropSequence(this._options.store(this._ownerProps$), {startWithUndefined: true});
  },

  componentWillMount() {
    this._subscription = this._childProps$.subscribe({
      next: childProps => {
        if (this._componentHasMounted)
          this.setState({childProps});
        else
          this.state = {childProps};
      }
    });

    if (typeof window === 'undefined')
      this._subscription.unsubscribe();
  },

  componentDidMount() {
    this._componentHasMounted = true;
  },

  componentWillReceiveProps(nextProps) {
    this._receiveOwnerProps$.next(nextProps);
  },

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps)
      || !shallowEqual(this.state, nextState);
  },

  componentWillUnmount() {
    this._subscription.unsubscribe();
  }
};
