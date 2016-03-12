import Rx from '@doctolib/rx';

['Observer', 'Subject', 'AsyncSubject', 'BehaviorSubject', 'ReplaySubject']
  .forEach(name => {
    Rx[name].prototype.next = Rx[name].prototype.onNext;
    Rx[name].prototype.error = Rx[name].prototype.onError;
    Rx[name].prototype.complete = Rx[name].prototype.onComplete;
  });

const noop = () => {};
const originalSubscribe = Rx.Observable.prototype.subscribe;
Rx.Observable.prototype.subscribe = function subscribe(o) {
  if (o && o.constructor && o.constructor === Object
      && (o.next || o.error || o.complete)) {
    const result = originalSubscribe.call(this,
      o.next || noop,
      o.error || noop,
      o.complete || noop
    );
    result.unsubscribe = result.dispose.bind(result);
    return result;
  }

  return originalSubscribe.apply(this, arguments);
};
