import {publishReplay} from 'rxjs/operator/publishReplay';

/**
 * Similar to share but using a ReplaySubject.
 *
 * @param {number} [count=1]
 * @returns {Observable.<*>}
 */
export function shareReplay(count = 1) {
  return this::publishReplay(count).refCount();
}
