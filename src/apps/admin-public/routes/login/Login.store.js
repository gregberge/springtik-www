import httpClient from '~/apps/admin-public/httpClient';
import Rx from 'rxjs/Rx';
import '~/modules/rx-extended/watchTask';
import {SUCCESS} from '~/modules/rx-extended/taskStates';

export default () => {
  const submit$ = new Rx.Subject();
  const result$ = submit$
    .watchTask(body => httpClient.post('/api/login', {body}))
    .do(({state}) => {
      if (state === SUCCESS)
        window.location = '/';
    });

  return {submit$, result$};
};
