import {scan} from 'rxjs/operator/scan';

/**
 * If a function is returned, update previous state.
 *
 * @param {*} initial Default initial value
 * @returns {Observable.<*>}
 */
export function store(initial) {
  return this::scan((state, fn) => typeof fn === 'function' ? fn(state) : fn, initial);
}
