import {range} from 'rxjs/observable/range';
import {timer} from 'rxjs/observable/timer';
import {retryWhen} from 'rxjs/operator/retryWhen';
import {zipProto} from 'rxjs/operator/zip';
import {mergeMap} from 'rxjs/operator/mergeMap';

/**
 * Backoff retry.
 *
 * @param {number} [maxRetry=3]
 * @param {number} [initialDelay=100]
 * @returns {Rx.Observable.<*>}
 */
export function backoffRetry(maxRetry = 3, initialDelay = 100) {
  return this
    ::retryWhen(attempts => {
      return attempts
        ::zipProto(range(0, maxRetry + 1))
        ::mergeMap(([err, i]) => {
          if (i >= maxRetry) {
            throw err;
          }

          return timer(Math.pow(2, i) * initialDelay);
        });
    });
}
