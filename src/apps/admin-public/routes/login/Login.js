import React, {PropTypes} from 'react';
import Rx from 'rxjs/Rx';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import compose from 'recompose/compose';
import provide from '~/modules/observo/provide';
import connect from '~/modules/observo/connect';
import subscribe from '~/modules/observo/subscribe';
import '~/modules/rx-extended/watchTask';
import httpClient from '~/apps/admin-public/httpClient';
import {USERNAME_NOT_FOUND, INCORRECT_PASSWORD} from '~/modules/loginErrors';
import styles from './login.scss';
import Alert from '~/modules/components/Alert';
import Button from '~/modules/components/Button';
import FormGroup from '~/modules/components/FormGroup';
import Form, {Input} from '~/modules/components/Form';

export const getWordingFromMessage = message => {
  switch (message) {
    case USERNAME_NOT_FOUND:
      return 'Aucun compte ne correspond à votre email.';
    case INCORRECT_PASSWORD:
      return 'Mot de passe incorrect.';
  }

  return 'Désolé, une erreur est survenue.';
};

export const getObservables = () => {
  const model$ = new Rx.BehaviorSubject({
    email: '',
    password: '',
  });
  const submit$ = new Rx.Subject();
  const result$ = submit$
    .watchTask(body =>
      httpClient.post('/api/login', {body})
        .then(({bodyData}) => bodyData)
    )
    .publishReplay(1)
    .refCount();

  return {model$, submit$, result$};
};

export const Login = ({
  model,
  result: {
    error,
    progress,
    output: {
      message,
    } = {},
  },
  onSubmit,
  onModelChange,
}) => (
  <div className={styles.login}>
    <div className={styles.logo} />
    <div className={styles.panel}>
      <h3 className={styles.title}>Connexion à l’admin</h3>
      {error || message ? (
        <Alert uiStyle="danger">
          {getWordingFromMessage(message)}
        </Alert>
      ) : null}
      <Form
        className={styles.form}
        {...{
          model,
          onModelChange,
          onSubmit,
        }}
      >
        <FormGroup>
          <Input
            autoFocus
            icon="user"
            id="email"
            name="email"
            placeholder="Adresse email"
            type="email"
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            id="password"
            icon="lock"
            name="password"
            placeholder="Mot de passe"
            type="password"
            required
          />
        </FormGroup>
        <Button disabled={progress} block large>
          Se connecter
        </Button>
      </Form>
    </div>
  </div>
);

Login.propTypes = {
  model: PropTypes.object.isRequired,
  result: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onModelChange: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles),
  provide(getObservables),
  subscribe({
    observo: PropTypes.object.isRequired,
    $window: PropTypes.object,
  }, ({
    observo: {
      observables: {
        result$,
      },
    },
    $window,
  }) => [
    result$
      .filter(({output: {success} = {}}) => success)
      .subscribe(() => {
        $window.location = '/';
      }),
  ]),
  connect(({
    submit$,
    result$,
    model$,
  }) => ({
    'onSubmit': submit$,
    'onModelChange': model$,
    'model': model$,
    'result': result$,
  }))
)(Login);
