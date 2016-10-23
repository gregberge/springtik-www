import sinon from 'sinon';
import {assert} from 'chai';
import {scan} from 'rxjs/operator/scan';
import {_do as tap} from 'rxjs/operator/do';
import {delay} from 'rxjs/operator/delay';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {startWith} from 'rxjs/operator/startWith';

export const subscribeAsync = (observable, expectedEmissionsCount = 1) => {
  if (!Number.isInteger(expectedEmissionsCount))
    throw TypeError(`Invalid parameter expectedEmissionsCount: ${expectedEmissionsCount}`);

  return new Promise((resolve, reject) => {
    const spy = sinon.spy();

    const sub = observable
      ::tap(spy)
      ::startWith(null)
      ::scan(emissionsCount => emissionsCount + 1, -1)
      ::debounceTime(0)
      ::delay(0) // So that the observer always gets notified asynchronously.
      .subscribe(emissionsCount => {
        if (emissionsCount < expectedEmissionsCount) {
          return;
        }
        sub.unsubscribe();
        assert(
          expectedEmissionsCount === emissionsCount,
          `expected observable to emit ${expectedEmissionsCount} times, emitted ${emissionsCount} times instead`,
        );
        resolve(spy);
      }, reject);
  });
};

export default subscribeAsync;
