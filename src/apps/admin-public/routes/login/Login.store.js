import httpClient from '~/apps/admin-public/httpClient';
import Rx from 'rxjs/Rx';
import '~/modules/rx-extended/watchTask';

export default () => {
  const submit$ = new Rx.Subject();
  const result$ = submit$
    .watchTask(body => httpClient.post('/api/login', {body}));

  return {submit$, result$};
};
