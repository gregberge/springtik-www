import {Observable} from 'rxjs-es/Observable';
import 'rxjs-es/add/operator/delay';
import 'rxjs-es/add/observable/of';

export default () => {
  const foo$ = Observable.of('foo').delay(2000);
  return {foo$};
};
