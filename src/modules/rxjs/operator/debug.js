/* eslint-disable no-console */
import {_do} from 'rxjs/operator/do';

/**
 * Log the flow of the observable.
 *
 * @param {...args} Additional arguments to log
 * @returns {Observable.<*>}
 */
export function debug(...args) {
  return this::_do(value => {
    console.log(...args, value);
  });
}
