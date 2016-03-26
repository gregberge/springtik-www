import React from 'react';
import Rx from 'rxjs/Rx';
import '~/modules/rx-extended/watchTask';
import connect from '~/modules/gravito/connect';
import Alert from '~/modules/components/Alert';
import httpClient from '~/apps/admin-public/httpClient';
import {USERNAME_NOT_FOUND, INCORRECT_PASSWORD} from '~/modules/loginErrors';
import styles from './login.scss';
import {Form, Input} from '~/modules/components/form-re';

export const store = () => () => {
  const submit$ = new Rx.Subject();
  const result$ = submit$
    .watchTask(body => httpClient.post('/api/login', {body}))
    .do(({success}) => {
      if (success)
        window.location = '/';
    });

  return {submit$, result$};
};

const getWordingFromMessage = message => {
  switch (message) {
    case USERNAME_NOT_FOUND:
      return 'Aucun compte ne correspond à votre email.';
    case INCORRECT_PASSWORD:
      return 'Mot de passe incorrect.';
  }

  return 'Désolé, une erreur est survenue.';
};

export default connect({styles, store: store()}, ({onSubmit, result}) => {
  return (
    <div className={styles.login}>
      <div className={styles.logo} />
      <div className={styles.panel}>
        <h3 className={styles.title}>Connexion à l’admin</h3>
        {result.error ? (
          <Alert uiStyle="danger">
            {getWordingFromMessage(result.error.response.bodyData.message)}
          </Alert>
        ) : null}
        <Form
          submitText="Se connecter"
          onSubmit={model => {
            onSubmit(model);
            return Promise.reject({});
          }}
          progress={result.progress}
        >
          <Input
            autoFocus
            icon="user"
            id="email"
            name="email"
            placeholder="Adresse email"
            type="email"
            is-email
            is-required
          />
          <Input
            id="password"
            icon="lock"
            name="password"
            placeholder="Mot de passe"
            type="password"
            is-required
          />
        </Form>
      </div>
    </div>
  );
});
