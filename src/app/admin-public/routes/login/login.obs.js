import httpClient from 'app/admin-public/http-client';

export default ({actions}) => {
  const loginResult$ = actions.get('login.submitted')
    .watchTask(body => httpClient.post('/api/login', {body}));

  return {loginResult$};
};
