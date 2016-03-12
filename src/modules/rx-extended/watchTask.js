import Rx from 'rxjs/Rx';
import {PROGRESS, SUCCESS, ERROR, IDLE} from './taskStates';

/**
 * @typedef {Object} TaskPayload
 * @property {Symbol} state (IDLE|PROGRESS|SUCCESS|ERROR)
 * @property {*=} input
 * @property {*=} output
 * @property {Error=} error
 */

/**
 * Async task watcher.
 *
 * @param {Function|Promise} selectorOrPromise
 * @returns {Rx.Observable.<TaskPayload>}
 */
Rx.Observable.prototype.watchTask = function (selectorOrPromise) {
  return this
    .switchMap(input => {
      const source$ = typeof selectorOrPromise === 'function'
          ? selectorOrPromise(input) : selectorOrPromise;
      const task$ = (typeof source$.then === 'function'
          ? Rx.Observable.fromPromise(source$)
          : source$)
        .map(output => ({state: SUCCESS, input, output}))
        .catch(error => (Rx.Observable.from([{state: ERROR, input, error}])));

      return Rx.Observable
        .from([{state: PROGRESS, input}])
        .concat(task$);
    })
    .startWith({state: IDLE});
};
