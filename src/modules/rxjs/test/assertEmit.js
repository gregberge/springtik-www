import {subscribeAsync} from './subscribeAsync';

export function assertEmit(expectedEmissionsCount = 1, block) {
  const promise = subscribeAsync(this, expectedEmissionsCount);
  block && block();
  return promise;
}
