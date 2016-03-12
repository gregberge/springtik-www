import React from 'react';
import connect from '~/modules/gravito/connect';
import Alert from '~/modules/components/Alert';
import {ERROR, PROGRESS} from '~/modules/rx-extended/taskStates';
import styles from './login.scss';
import store from './Login.store';
import {Form, Input} from '../../form';
import {USERNAME_NOT_FOUND, INCORRECT_PASSWORD} from '~/modules/loginErrors';

const getWordingFromMessage = message => {
  switch (message) {
    case USERNAME_NOT_FOUND:
      return 'Aucun compte ne correspond à votre email.';
    case INCORRECT_PASSWORD:
      return 'Mot de passe incorrect.';
  }

  return 'Désolé, une erreur est survenue.';
};

export default connect({styles, store}, ({onSubmit, result}) => {
  return (
    <div className={styles.login}>
      <div className={styles.logo} />
      <div className={styles.panel}>
        <h3 className={styles.title}>Connexion à l’admin</h3>
        {result.state === ERROR ? (
          <Alert uiStyle="danger">
            {getWordingFromMessage(result.error.response.bodyData.message)}
          </Alert>
        ) : null}
        <Form
          onSubmit={onSubmit}
          progress={result.state === PROGRESS}
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
