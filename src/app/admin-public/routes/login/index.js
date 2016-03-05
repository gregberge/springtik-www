import React, {PropTypes} from 'react';
import BaseComponent from 'components/base';
import Alert from 'components/alert';
import styles from './login.scss';
import getObservables from './login.obs';
import {taskStates} from '@doctolib/rx';
import {Form, Input} from '../../form';
import {USERNAME_NOT_FOUND, INCORRECT_PASSWORD} from 'server/utils/login-errors';

export default class Login extends BaseComponent {
  getObservables = getObservables;

  styles = styles;

  static obsTypes = {
    loginResult: PropTypes.object
  };

  getError() {
    switch (this.state.loginResult.error.response.bodyData.message) {
      case USERNAME_NOT_FOUND:
        return 'Aucun compte ne correspond à votre email.';
      case INCORRECT_PASSWORD:
        return 'Mot de passe incorrect.';
    }

    return 'Désolé, une erreur est survenue.';
  }

  onSubmit = model => {
    this.triggerAction('login.submitted', model);
    return Promise.reject(new Error());
  };

  componentDidUpdate() {
    if (super.componentDidUpdate)
      super.componentDidUpdate();

    if (this.state.loginResult.state === taskStates.SUCCESS)
      this.context.observables.redirect('/');
  }

  render() {
    const {loginResult} = this.state;

    return (
      <div className={styles.login}>
        <div className={styles.logo} />
        <div className={styles.panel}>
          <h3 className={styles.title}>Connexion à l’admin</h3>
          {loginResult.state === taskStates.ERROR ? (
            <Alert uiStyle="danger">
              {this.getError()}
            </Alert>
          ) : null}
          <Form
            onSubmit={this.onSubmit}
            progress={loginResult.state === taskStates.PROGRESS}
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
  }
}
