import Rx from 'rxjs/Rx';
import objectToPropSequence from '../utils/objectToPropSequence';
import getCompleteRoutePath from '../utils/getCompleteRoutePath';

export default (props, callback) => {
  const {routes} = props;
  const props$ = Rx.Observable.from([props]);
  const stores$ = routes.reduce((stores, {component: {routeStore}}, index) => {
    if (!routeStore)
      return stores;

    const path = getCompleteRoutePath(routes.slice(0, index + 1));
    const store$ = objectToPropSequence(routeStore(props$));
    return store$.map(res => ({[path]: res}));
  }, []);

  let lastValue;

  Rx.Observable
    .combineLatest(stores$, (...chunks) =>
      chunks.reduce((data, chunk) => ({...data, ...chunk}))
    )
    .subscribe({
      next(value) {
        lastValue = value;
      },
      error(error) {
        callback(error);
      },
      complete() {
        callback(null, lastValue);
      }
    });
};
