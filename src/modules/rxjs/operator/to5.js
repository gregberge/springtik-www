import {Observable} from 'rxjs/Observable';

export function to5() {
  if (this instanceof Observable) {
    return this;
  }

  return new Observable(observer => {
    const subscription = this.subscribe(
      observer.next.bind(observer),
      observer.error.bind(observer),
      observer.complete.bind(observer),
    );

    return subscription.dispose.bind(subscription);
  });
}
