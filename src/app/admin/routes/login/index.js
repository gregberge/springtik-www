import React from 'react';
import BaseComponent from 'components/base';
import FormGroup from 'components/form-group';
import Input from 'components/input';
import Button from 'components/button';
import styles from './login.scss';

export default class Login extends BaseComponent {
  styles = styles;

  render() {
    return (
      <div className={styles.login}>
        <div className={styles.logo} />
        <div className={styles.panel}>
          <h3 className={styles.title}>Connexion à l’admin</h3>
          <form>
            <FormGroup>
              <Input
                autoFocus
                icon="user"
                id="email"
                name="email"
                placeholder="Adresse email"
                type="email"
              />
            </FormGroup>
            <FormGroup>
              <Input
                id="password"
                icon="lock"
                name="password"
                placeholder="Mot de passe"
                type="password"
              />
            </FormGroup>
            <Button block large>Se connecter</Button>
          </form>
        </div>
      </div>
    );
  }
}
