import fetch from 'isomorphic-fetch';
import {Subject} from 'rxjs/Subject';
import {publishReplay} from 'rxjs/operator/publishReplay';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {watchTask} from '~/modules/observables/operator/watchTask';

export default () => () => {
  const model$ = new BehaviorSubject({
    email: '',
    password: '',
  });

  const submit$ = new Subject();

  const result$ = submit$
    ::watchTask(model =>
      fetch('/api/login', {
        body: JSON.stringify(model),
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
      })
      .then(response => response.json())
    )
    ::publishReplay(1).refCount();

  return {
    model$,
    submit$,
    result$,
  };
};
