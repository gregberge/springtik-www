import Rx from 'rxjs/Rx';
import joinRoutesPath from '../utils/joinRoutesPath';

export default (props, callback) => {
  const {routes} = props;
  const props$ = Rx.Observable.from([props]);
  const initialStates = routes.reduce(
    (
      initialStates,
      {
        component: {
          getObservables,
          resolveOnServer
        }
      },
      index
    ) => {
      if (!resolveOnServer)
        return initialStates;

      const path = joinRoutesPath(routes.slice(0, index + 1));
      const observables = getObservables({props$});
      const serverObservables = resolveOnServer
        .map(name =>
          observables[name]
            .map(data => ({[name]: data}))
        );

      const initialState$ = Rx.Observable
        .combineLatest(serverObservables, (...chunks) =>
          chunks.reduce((data, chunk) => ({...data, ...chunk}), {})
        );

      initialStates.push(initialState$.map(res => ({[path]: res})));
      return initialStates;
    }
    , []
  );

  let lastValue;

  Rx.Observable
    .combineLatest(initialStates, (...chunks) =>
      chunks.reduce((data, chunk) => ({...data, ...chunk}), {})
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
