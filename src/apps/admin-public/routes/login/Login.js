import React, {PropTypes} from 'react';
import fetch from 'isomorphic-fetch';
import Rx from 'modules/rxjs';
import Rc from 'modules/recompose';
import Fp from 'modules/lodash-fp';
import Shield from 'modules/ui-components/Shield';
import TextBox from 'modules/ui-components/TextBox';
import Button from 'modules/ui-components/Button';
import FaUser from 'react-icons/lib/fa/user';
import FaLock from 'react-icons/lib/fa/lock';
import {INCORRECT_PASSWORD, USERNAME_NOT_FOUND} from 'modules/loginErrors';
import styles from './Login.scss';

const getErrorMessage = ({
  error,
  output: {
    message,
  } = {},
}) => {
  if (error) {
    return 'Désolé, une erreur est survenue.';
  }

  switch (message) {
    case USERNAME_NOT_FOUND:
      return 'Aucun compte ne correspond à votre email.';
    case INCORRECT_PASSWORD:
      return 'Mot de passe incorrect.';
  }

  return null;
};

const Login = ({
  result = {},
  onSubmit,
}) => {
  const errorMessage = getErrorMessage(result);
  return (
    <div className={styles.login}>
      <div className={styles.shield}>
        <Shield />
      </div>
      <div className={styles.panel}>
        <div className={styles.title}>
          Connexion à l'admin
        </div>
        {errorMessage ? (
          <div className={styles.error}>
            {errorMessage}
          </div>
        ) : null}
        <form onSubmit={onSubmit} className={styles.form}>
          <TextBox
            name="email"
            type="email"
            placeholder="Email"
            autoFocus
            required
            icon={<FaUser size={20} className={styles.icon} />}
            bordered
            block
            spaced
          />
          <TextBox
            name="password"
            type="password"
            placeholder="Mot de passe"
            required
            icon={<FaLock size={20} className={styles.icon} />}
            bordered
            block
            spaced
          />
          <Button
            type="submit"
            theme="admin"
            disabled={result.progress}
            block
          >
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  result: PropTypes.shape({
    progress: PropTypes.bool,
    error: PropTypes.bool,
    success: PropTypes.bool,
    output: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
};

export default Rc.compose(
  Rc.withStyles(styles),
  Rc.onlyClientSide,
  Rc.provide(() => {
    const submit$ = new Rx.Subject();
    const result$ = submit$
      .watchTask(model => {
        return fetch('/api/login', {
          body: JSON.stringify(model),
          credentials: 'same-origin',
          headers: {'Content-Type': 'application/json'},
          method: 'POST',
        })
        .then(response => response.json());
      })
      .shareReplay();

    const onSubmit = event => {
      event.preventDefault();
      const model = Array.from(event.target.elements)
        .reduce((data, element) => ({
          ...data,
          [element.name]: element.value,
        }), {});
      submit$.next(model);
    };

    return {
      props$: result$
        .startWith(undefined)
        .map(result => ({
          onSubmit,
          result,
        })),
      result$,
    };
  }),
  Rc.getContext({
    $window: PropTypes.shape({
      open: PropTypes.func.isRequired,
    }).isRequired,
  }),
  Rc.handle(({props$, result$}) => [
    result$
      .filter(({success, output}) => success && output && output.success)
      .switchMapTo(props$.pluck('$window'))
      .filter(Fp.identity)
      .subscribe($window => {
        $window.open('/', '_self');
      }),
  ]),
)(Login);
